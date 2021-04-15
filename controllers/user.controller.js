const User = require('../models/user.model');

exports.getAll = (req, res) => {
    User.find({}, (err, users) => {
        if(err) return console.log(err);
        res.send(users);
    });
}

exports.signUp = (req, res) => {
    const user = new User({username: req.body.username, password: req.body.password});
    user.save((err => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json(user);
    }));
}
