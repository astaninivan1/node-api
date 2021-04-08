const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: String,
    age: Number
}, {versionKey: false});
module.exports = mongoose.model('User', userScheme);
