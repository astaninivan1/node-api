const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const jwtOptions = require('../shared/passport-settings').jwtOptions

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).json('Пользователь с таким именем не существует');
        }

        if (user.password !== req.body.password) {
            res.status(401).json('Неверный пароль');
        }

        const payload = {id: user.id};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    } catch (err) {
        res.status(400).json(err.message);
        console.error(err);
    }
};

exports.signUp = async (req, res) => {
    try {
        const isExists = await User.exists({username: req.body.username});
        if (isExists) {
            throw new Error('Пользователь с таким именем существует');
        }
        const user = new User({username: req.body.username, password: req.body.password});
        res.json(await user.save());
    } catch (err) {
        res.status(400).json(err.message);
        console.error(err);
    }
}
