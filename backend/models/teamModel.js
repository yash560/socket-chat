import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required,
  },
  users: [
    {
      type: Object,
      ref: "User",
    },
  ],
  avatar: {
    type: String,
  },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
