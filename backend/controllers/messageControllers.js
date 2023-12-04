const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/messageModel");
// const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = catchAsyncErrors(async (req, res) => {

  const { sender, content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    // sender: req.user._id,   // this will be considered after user authentication part
    sender: sender,
    content: content,
    chat: chatId,
  };

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
    const messages = await Message.find({ chat: req.params.id });
    if (!messages) {
      console.log("Enter a valid chat_id");
      return res.sendStatus(400);
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allChatMessages };
