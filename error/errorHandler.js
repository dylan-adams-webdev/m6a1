const errorHandler = (err, req, res, next) => {
    const { status = 500, message = 'A server error has occurred' } = err;
    res.status(status).json({ status: 'fail', error: { message } });
}

module.exports = errorHandler;