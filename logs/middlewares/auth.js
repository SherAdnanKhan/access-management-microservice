const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../util/errorResponse');
const User = require('../models').User;


exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists

    if (!token) {
        return next(new ErrorResponse('Not authorize to the access route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorize to the access route', 401));
    }
});

// Grant access to sepecfic roles

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} not authorize to the access route`, 403));
        }
        next();
    };
}