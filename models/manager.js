const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
    userName: String,
    email: String
});

module.exports = mongoose.model('Manager', managerSchema);