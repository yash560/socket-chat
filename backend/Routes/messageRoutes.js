const express = require("express");
const {sendMessage, allChatMessages} = require("../controllers/messageControllers");
const router = express.Router();

router.route("/send").post(sendMessage);
router.route("/:id").get(allChatMessages);

module.exports = router;
