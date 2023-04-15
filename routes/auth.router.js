const router = require('express').Router();
const methodNotAllowed = require('../error/methodNotAllowed');
const controller = require('../controllers/auth.controller');

router.route('/register').post(controller.register).all(methodNotAllowed);
router.route('/login').post(controller.login).all(methodNotAllowed);

module.exports = router;