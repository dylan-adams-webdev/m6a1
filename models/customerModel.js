const mongoose = require('mongoose');

const NameSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		trim: true,
		minlength: [2, 'First name should have at least 2 characters'],
		maxlength: [50, 'First name should not exceed 50 characters'],
		match: [/^[a-zA-Z]+$/, 'First name should only contain letters'],
	},
	middleName: {
		type: String,
		required: [true, 'Middle name is required'],
		trim: true,
		minlength: [2, 'Middle name should have at least 2 characters'],
		maxlength: [50, 'Middle name should not exceed 50 characters'],
		match: [/^[a-zA-Z]+$/, 'Middle name should only contain letters'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		trim: true,
		minlength: [2, 'Last name should have at least 2 characters'],
		maxlength: [50, 'Last name should not exceed 50 characters'],
		match: [/^[a-zA-Z]+$/, 'Last name should only contain letters'],
	},
});

const CustomerSchema = new mongoose.Schema(
	{
		name: {
			type: NameSchema,
			required: [true, 'Customer name is required'],
		},
		email: {
			type: String,
			required: [true, 'Email address is required'],
			unique: true,
			match: [
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Invalid email address',
			],
		},
		dateOfBirth: {
			type: Date,
			required: true,
			min: [new Date('1900-01-01'), 'Invalid date of birth'],
			max: [new Date(), 'Invalid date of birth'],
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);


const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
