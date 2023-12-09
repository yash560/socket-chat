const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Task = require("../models/taskModel");

const createTask = catchAsyncErrors(async (req, res) => {

    // req.body.createdBy = req.user.id; for the Creater No need from fetch by body

    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create task",
            error: error.message
        });
    }
});

const getallTasks = catchAsyncErrors(async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found"
            });
        }
        res.json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

module.exports = { createTask, getallTasks };
