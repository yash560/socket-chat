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


module.exports = { createChat, createGroupChat };
