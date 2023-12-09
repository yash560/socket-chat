const express = require("express");
const {sendMessage, allChatMessages, deleteMessage} = require("../controllers/messageControllers");
const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/:id").get(allChatMessages);
router.route("/:messageId").put(deleteMessage);
module.exports = router;
