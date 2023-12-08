const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const socketIO = require('socket.io');
const messageRoutes = require('./Routes/messageRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const userRoutes=require('./Routes/userRoutes');
const cors = require('cors');

const app = express();

// cors for allowing fetching from frontend
// app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",  // Adjust this to your frontend URL
}));

dotenv.config({ path: "config/.env" });
connectDB();


const server = http.createServer(app);

// Include the Socket.IO configuration with CORS options
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

// Body parsing middleware
app.use(express.json());


app.get("/api/chats", (req, res) => {
  res.send(chats)
})
app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
})
app.use('/api/message', messageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
// Socket.IO configuration
io.on('connection', (socket) => {
  console.log(`User ${socket.id} has connected`);

  socket.on('user-connect', (user) => {
    socket.join(user?._id);
    console.log(`User ${user?._id} has joined the chat`);
  });

  socket.on('user-message', (message) => {
    console.log('Received user-message:', message);
    io.to(message?.receiver?._id).emit('new-message', message);
    console.log('Broadcasted new-message to room:', message?.receiver?._id);
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
