const router = require('express').Router();
const passport = require('passport');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');

router.use('/user', passport.authenticate('jwt', {session: false}), userRouter)
router.use('/auth', authRouter)

module.exports = router;
