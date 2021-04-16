const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await User.find({}));
    } catch (err) {
        res.status(400).json(err.message);
        console.error(err);
    }
}

exports.info = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        res.json(user)
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
