const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');

const mongoose = require('mongoose');

const MONGO_DATABASE = process.env.DB.replace(
	'<password>',
	process.env.DBPWD
);

mongoose
	.connect(MONGO_DATABASE, {
		useNewUrlParser: true,
	})
	.then((con) => {
		console.log(`Database connection was successful`);
	});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
