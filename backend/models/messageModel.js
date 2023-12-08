const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: Object, ref: "User" },
    receiver: { type: Object, ref: "User" },
    content: { type: String, trim: true },
    image: {type: String},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isRead: [],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
