const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    try {
        res.send(await User.find({}));
    } catch (err) {
        res.status(400).json(err.message);
        console.error(err);
    }
}

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

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('Пользователь с таким идентификатором не найден');
        }
        res.json('Пользователь успешно удален');
    } catch (err) {
        res.status(400).json(err.message);
        console.error(err);
    }
}
