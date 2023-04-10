const Loan = require('../models/loanModel');
const APIFeatures = require('../dbManager/loanDbContext');

const list = async (req, res, next) => {
	try {
		const features = new APIFeatures(Loan.find({isDeleted: false}), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const loans = await features.query;
		res.json({
			status: 'success',
			results: loans.length,
			data: {
				loans,
			},
		});
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const read = async (req, res, next) => {
	try {
		const loan = await Loan.findOne({ _id: req.params.id });
		if (!loan)
			return next({ status: 404, message: 'This loan does not exist' });
		res.json({
			status: 'success',
			data: { loan },
		});
	} catch (err) {
		console.log(err);
		next({ status: 404, message: err.message });
	}
};

const create = async (req, res, next) => {
	try {
		const loan = await Loan.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { loan },
		});
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

const update = async (req, res, next) => {
	try {
		const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({ status: 'success', data: { loan } });
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const destroy = async (req, res, next) => {
	try {
        await Loan.findByIdAndUpdate(req.params.id, { isDeleted: true });
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
