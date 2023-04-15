const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return next({ status: 401, message: 'Not authorized' });
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error(err);
        next({ status: 401, message: 'Invalid token' });
    }
}

const authorize = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;
        
        if (roles.includes(role)) {
            return next({status: 403, message: 'Not authorized'})
        }
        next();
    }
}

module.exports = { authenticate, authorize };