const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');

router.get('/', controller.getAll);
router.post('/signUp', controller.signUp);

module.exports = router;
