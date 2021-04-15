const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: String,
    password: String
}, {versionKey: false});
module.exports = mongoose.model('User', userScheme);
