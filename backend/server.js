const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const socketIO = require('socket.io');
const messageRoutes = require('./Routes/messageRoutes');
const chatRoutes = require('./Routes/chatRoutes');
// const { chats } = require("./data/data");

const app = express();
dotenv.config({ path: "backend/config/.env" });
connectDB();
const server = http.createServer(app);
const io = socketIO(server);

// Body parsing middleware
app.use(express.json());

// app.use(express.static(path.resolve('./public')));

// app.get("/",(req,res)=>{
//     // Use path.join to create an absolute path
//     return res.sendFile(path.join(__dirname, '/public/index.html'));
// });

app.get("/api/chats", (req, res) => {
  res.send(chats)
})
app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
})
app.use('/api/message',messageRoutes);
app.use('/api/chat',chatRoutes);
// Socket.IO configuration
io.on('connection', (socket) => {
  console.log('A new user has connected');

  socket.on('messageRead', async (messageId, userId) => {
    // Update the read status in the database
    const message = await Message.findById(messageId);
    if (message) {
      await message.markAsReadByUser(userId);
      io.emit('messageRead', { messageId, userId });
    }
  });

  socket.on("user-message", (message) => {
    io.emit("message", message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
