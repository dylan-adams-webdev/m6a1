const router = require('express').Router();
const methodNotAllowed = require('../error/methodNotAllowed');
const controller = require('../controllers/protected.controller');

router.route('/').get(controller.protected).all(methodNotAllowed);

module.exports = router;