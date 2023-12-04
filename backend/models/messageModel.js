const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: { type: Object, default: {} },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Custom method to mark a message as read by a specific user
messageSchema.methods.markAsReadByUser = async function (userId) {
  if (!this.readBy[userId]) {
    this.readBy[userId] = true;
    await this.save();
  }
};

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;