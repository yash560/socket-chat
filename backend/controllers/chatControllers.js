const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Chat = require("../models/chatModel");

// Create or fetch One to One Chat
const createChat = catchAsyncErrors(async (req, res) => {
    const { senderId, recieverId } = req.body;
    // senderId: req.user._id,   // this will be considered after user authentication part
    if (!senderId || !recieverId) {
        console.log("User's Id not valid with this request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: senderId } } },
            { users: { $elemMatch: { $eq: recieverId } } },
        ],
    }).populate("users", "-password");

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [senderId, recieverId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

// Add user to Group
const addToGroup = catchAsyncErrors(async (req, res) => {
    const { chatId, userId } = req.body;

    const isRequesterAdmin = req.user.isAdmin; // Adjust this based on your actual logic

    if (!isRequesterAdmin) {
        res.status(403); 
        throw new Error("You don't have permission to add users to the group");
    }

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

// Create or fetch Group Chat
const createGroupChat = catchAsyncErrors(async (req, res) => {
    if (!req.body.users || !req.body.name || !req.body.adminId) {
        return res.status(400).send({ message: "Provide all the fields for the group chat" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.body.adminId);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.body.name,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("users", "-password").populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const removeFromGroup = catchAsyncErrors(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // Check if the requester is the admin of the group
    const requesterId = req.user._id; // Assuming user information is available in req.user
  
    const chat = await Chat.findById(chatId).populate("groupAdmin", "_id");
  
    if (!chat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }
  
    // Ensure that the requester is the admin
    if (chat.groupAdmin._id.toString() !== requesterId.toString()) {
      res.status(403);
      throw new Error("Unauthorized: Only the admin can remove members from the group");
    }
  
    // Remove the user from the group
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });
  
module.exports = { createChat, createGroupChat,addToGroup,removeFromGroup };
