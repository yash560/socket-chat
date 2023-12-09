const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Message = require("../models/messageModel");


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
    const messageId = req.params.id;
    const message = await Message.findById(messageId);

    // Check if the message exists
    if (!message) {
      console.log("Message not found");
      return res.sendStatus(404);
    }

    const activeUserId = req.user._id;

    if (message.sender.toString() !== activeUserId.toString() && req.user.role !== "member") {
      console.log("Unauthorized to delete this message");
      return res.status(403).json({ error: "Unauthorized to delete this message" });
    }

    // Update the message's isDeleted property to true
    message.isDeleted = true;
    // Save the updated message
    await message.save();

    res.json({ message: "Message deleted successfully", deletedMessage: message });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


module.exports = { sendMessage, allChatMessages, deleteMessage  };
