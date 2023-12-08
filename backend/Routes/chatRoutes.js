const express = require("express");
const { createChat, createGroupChat, addToGroup, removeFromGroup } = require("../controllers/chatControllers");
const router = express.Router();

router.route("/create").post(createChat);
router.route("/create/group").post(createGroupChat);
router.route("/add/group").put(addToGroup);
router.route("/remove/group").put(removeFromGroup);

module.exports = router;
