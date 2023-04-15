const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());

// AUTH ROUTER
app.use('/', require('./routes/auth.router'));

// PROTECTED ROUTE
app.use('/protected', require('./routes/protected.router'));

// NOT FOUND
app.use(require('./error/notFound.js'));

// ERROR HANDLER
app.use(require('./error/errorHandler'));

module.exports = app;
