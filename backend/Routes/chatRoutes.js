const express = require("express");
const { createChat, createGroupChat } = require("../controllers/chatControllers");
const router = express.Router();

router.route("/create").post(createChat);
router.route("/create/group").post(createGroupChat);

module.exports = router;
