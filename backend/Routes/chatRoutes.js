const express = require("express");
const { createChat, createGroupChat, addToGroup } = require("../controllers/chatControllers");
const router = express.Router();

router.route("/create").post(createChat);
router.route("/create/group").post(createGroupChat);
router.route("/add/group").put(addToGroup);

module.exports = router;
