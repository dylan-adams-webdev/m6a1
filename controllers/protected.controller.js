const { authenticate, authorize } = require('../middlware/auth.middleware');

const protected = (req, res) => {
	res.json({
		success: true,
		message: 'You have accessed a protected resource!',
	});
};

module.exports = {
	protected: [authenticate, authorize(['admin'])],
};
