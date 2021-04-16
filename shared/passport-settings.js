const passport = require('passport');
const passportJwt = require('passport-jwt');

const User = require('../models/user.model');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'AstaninSecretIvanJwt'
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

module.exports = {
    passport,
    jwtOptions
};
