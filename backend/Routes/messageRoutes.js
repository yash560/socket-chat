const express = require("express");
const {sendMessage, allChatMessages, deleteMessage} = require("../controllers/messageControllers");
const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/:senderId/:receiverId").get(allChatMessages);
router.route("/:messageId/:userId").put(deleteMessage);

module.exports = router;
