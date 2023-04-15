const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = new User({ email, password });
		await user.save();
		res.json({ success: true, message: 'User registered successfully' });
	} catch (err) {
		console.error(err);
		next({ status: 500, message: 'An error occurred' });
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next({ status: 400, message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next({ status: 400, message: 'Invalid email or password' });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWTSECRET,
			{
				expiresIn: '10d',
			}
		);

		const cookieOptions = {
			expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};

		res.cookie('jwt', token, cookieOptions);

		res.json({
			success: true,
			token,
		});
	} catch (err) {
		console.error(err);
		next({ status: 500, message: 'An error occurred' });
	}
};

module.exports = {
	register,
	login,
};
