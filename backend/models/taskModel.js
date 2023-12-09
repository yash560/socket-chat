const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the task title"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    assignee: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please assign the task to someone"],
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    projectId: {
        type: String,
        trim: true,
    },
    reporter: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    endDate: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const regex = /^\d{2}-\d{2}-\d{4}$/;
                return regex.test(value);
            },
            message: 'End date must be in the dd-mm-yyyy format.',
        },
    },
    ticketNumber: {
        type: Number,
        default: 1,
    },
    history: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            changes: {
                field: {
                    type: String,
                    trim: true,
                },
                from: {
                    type: String,
                    trim: true,
                },
                to: {
                    type: String,
                    trim: true,
                },
            },
        },
    ],
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
