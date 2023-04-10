const LoanLedger = require('../models/loanLedgerModel');
const APIFeatures = require('../dbManager/loanDbContext');

const list = async (req, res, next) => {
	try {
		const features = new APIFeatures(LoanLedger.find({isDeleted: false}), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const loanItems = await features.query;
		res.json({
			status: 'success',
			results: loanItems.length,
			data: {
				loanItems,
			},
		});
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const read = async (req, res, next) => {
	try {
		const loanItem = await LoanLedger.findOne({ _id: req.params.id });
		if (!loanItem)
			return next({ status: 404, message: 'This loan item does not exist' });
		res.json({
			status: 'success',
			data: { loanItem },
		});
	} catch (err) {
		console.log(err);
		next({ status: 404, message: err.message });
	}
};

const create = async (req, res, next) => {
	try {
		const loanItem = await LoanLedger.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { loanItem },
		});
	} catch (err) {
		next({ status: 400, message: err.message });
	}
};

const update = async (req, res, next) => {
	try {
		const loanItem = await LoanLedger.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.json({ status: 'success', data: { loanItem } });
	} catch (err) {
		next({ status: 404, message: err.message });
	}
};

const destroy = async (req, res, next) => {
	try {
		await LoanLedger.findByIdAndUpdate(req.params.id, {isDeleted: true});
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
