const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAll);

module.exports = router;
