const User = require('../models/user.model');

exports.getAll = (req, res) => {
    User.find({}, (err, users) => {
        if(err) return console.log(err);
        res.send(users);
    });
}
