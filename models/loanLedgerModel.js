const mongoose = require('mongoose');

const loanLedgerSchema = new mongoose.Schema(
	{
		loan: {
			type: mongoose.ObjectId,
			ref: 'Loan',
			required: [true, 'A loan id number must be provided'],
		},
		paymentAmount: {
			type: Number,
			required: [true, 'A payment amount is required'],
			min: [1, 'Payment amount must be at least 1'],
		},
		interest: {
			type: Number,
			required: [true, 'Interest amount is required'],
			min: [0, 'Interest amount cannot be negative'],
			validate: {
				validator: function (value) {
					return value <= this.paymentAmount - this.principle;
				},
				message:
					'Interest amount cannot be less than payment minus principle',
			},
		},
		principle: {
			type: Number,
			required: [true, 'Principle amount is required'],
			min: [0, 'Principle amount cannot be negative'],
			validate: {
				validator: function (value) {
					return value <= this.paymentAmount - this.interest;
				},
				message:
					'Principle amount cannot exceed the payment amount minus interest',
			},
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const LoanLedger = mongoose.model('LoanLedger', loanLedgerSchema);

module.exports = LoanLedger;
