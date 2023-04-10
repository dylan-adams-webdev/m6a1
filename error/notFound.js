const notFound = (req, res, next) => {
    next({ status: 404, message: 'Nothing at this endpoint' });
}

module.exports = notFound;