const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

const loanRouter = require('./routes/loans.router.js');
const customerRouter = require('./routes/customers.router');
const loanLedgerRouter = require('./routes/loanLedger.router');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());

app.use('/api/v1/loans', loanRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/ledger', loanLedgerRouter);
app.use(require('./error/notFound.js'));
const errorHandler = require('./error/errorHandler');
app.use(errorHandler);

module.exports = app;
