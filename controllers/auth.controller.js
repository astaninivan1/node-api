const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tasmanianDevil'
}

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    try {
        const user = await User.findById(jwt_payload.id);
        next(null, !!user);
    } catch (err) {
        console.error(err);
        next(null, false);
    }
});
passport.use('jwt', strategy);

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
        res.status(400).json(400);
        console.error(err);
    }
};
