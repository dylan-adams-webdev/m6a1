const router = require('express').Router();
const controller = require('../controllers/customers.controller');
const methodNotAllowed = require('../error/methodNotAllowed');

router
	.route('/:id')
	.get(controller.read)
	.patch(controller.update)
	.put(controller.update) // for compat with rubric, should be PATCH for partial update
	.delete(controller.destroy)
	.all(methodNotAllowed);
router
	.route('/')
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

module.exports = router;
