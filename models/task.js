const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    description: String,
    completed: Number,
    creationDate: String,
    dueDate: String,
    reminderDate: String,
    priority: Number,
    userID: String
});

module.exports = mongoose.model('Task', taskSchema);