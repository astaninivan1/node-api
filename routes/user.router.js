const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getAll);
router.post('/signUp', controller.signUp);
router.delete('/:id', controller.delete);

module.exports = router;
