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

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findById(jwt_payload.id, (err, user) => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    })
});

passport.use('jwt', strategy);

exports.login = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (!user) {
            res.status(404).json('user not found');
        }

        if (user.password !== req.body.password) {
            res.status(401).json('Incorrect password');
        }

        const payload = {id: 1};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    });
};
