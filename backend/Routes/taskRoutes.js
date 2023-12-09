const express = require("express");
const {createTask,getallTasks} = require("../controllers/taskControllers");
const router = express.Router();

router.route("/create").post(createTask);
router.route("/all").get(getallTasks);

module.exports = router;
