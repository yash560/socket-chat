const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/messageModel");
// const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = catchAsyncErrors(async (req, res) => {

  const { sender, receiver, content, image} = req.body;

  if (!content && !image) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var newMessage = {
    sender: sender,
    image: image,
    content: content,
    receiver: receiver,
  };
  console.log('new message', newMessage);
  try {
    var message = await Message.create(newMessage);
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// get all the messages of a single chat
const allChatMessages = catchAsyncErrors(async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    const messages = await Message.find({
      $or: [
        { 'sender._id': senderId, 'receiver._id': receiverId },
        { 'sender._id': receiverId, 'receiver._id': senderId },
      ],
    }).sort({createdAt: 1})
    if (!messages) {
      console.log("No messages found");
      return res.sendStatus(400);
    }

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = catchAsyncErrors(async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const activeUserId=req.params.userId;
    console.log('messageId', messageId);
    console.log('activeUserId', activeUserId);
    const message = await Message.findById(messageId);

    // Check if the message exists
    if (!message) {
      console.log("Message not found");
      return res.sendStatus(404);
    }
    if(!activeUserId){
      console.log('Active user id not found');
    }
    if (message.sender._id.toString() !== activeUserId.toString()) {
      console.log("Unauthorized to delete this message");
      return res.status(403).json({ error: "Unauthorized to delete this message" });
    }
    
    message.isDeleted = true;
    // Save the updated message
    await message.save();
    res.json({ message: "Message deleted successfully", updatedMsg: message });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


module.exports = { sendMessage, allChatMessages, deleteMessage };
