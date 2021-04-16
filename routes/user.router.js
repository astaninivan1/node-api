const router = require('express').Router();

const controller = require('../controllers/user.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.info);
router.delete('/:id', controller.delete);

module.exports = router;
