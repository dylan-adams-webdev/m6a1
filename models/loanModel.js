const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
	{
		loanType: {
			type: String,
			enum: ['home', 'auto', 'boat', 'life'],
			required: [true, 'Loan type is required'],
			unique: false,
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer',
			required: [true, 'Customer id is required'],
		},
		amount: {
			type: Number,
			required: [true, 'An amount is required'],
			min: [0, 'Amount should be greater than or equal to 0'],
		},
		interestRate: {
			type: Number,
			required: [true, 'Interest rate is required'],
			min: [0, 'Interest rate should be greater than or equal to 0'],
			max: [1, 'Interest rate should be less than or equal to 1'],
		},
		loanTerm: {
			type: Number,
			required: [true, 'Loan term is required'],
			min: [1, 'Loan term must be greater than or equal to 1'],
			max: [120, 'Loan term should not exceed 120 months (10 years)'],
		},
		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (value) {
					return value.getTime() >= Date.now();
				},
				message: () => 'Start date cannot be in the past',
			},
		},
		endDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (value) {
					return value.getTime() > this.startDate.getTime();
				},
				message: () => 'End date must be after start date',
			},
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
