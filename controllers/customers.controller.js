const Customer = require('../models/customerModel');
const APIFeatures = require('../dbManager/loanDbContext');

const list = async (req, res, next) => {
	try {
		const features = new APIFeatures(Customer.find({isDeleted: false}), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const customers = await features.query;
		res.json({
			status: 'success',
			results: customers.length,
			data: {
				customers,
			},
		});
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const read = async (req, res, next) => {
	try {
		const customer = await Customer.findOne({ _id: req.params.id });
		if (!customer)
			return next({ status: 404, message: 'This customer does not exist' });
		res.json({
			status: 'success',
			data: { customer },
		});
	} catch (err) {
		console.log(err);
		next({ status: 404, message: err.message });
	}
};

const create = async (req, res, next) => {
	try {
		const customer = await Customer.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { customer },
		});
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

const update = async (req, res, next) => {
	try {
		const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({ status: 'success', data: { customer } });
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const destroy = async (req, res, next) => {
	try {
		await Customer.findByIdAndUpdate(req.params.id, {isDeleted: true});
		res.status(204).send(); // HTTP 204 does not send a body at all
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

module.exports = {
	list,
	read,
	create,
	update,
	destroy,
};
