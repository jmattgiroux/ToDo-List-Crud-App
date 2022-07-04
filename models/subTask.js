const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
    title: String,
    completed: Number,
    taskID: String
});

module.exports = mongoose.model('SubTask', subTaskSchema);