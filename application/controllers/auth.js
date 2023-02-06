const User = require('../models').User;
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../util/errorResponse');

/**
 * @desc   login the user
 * @route  Get /api/v1/auth/login
 * @access Public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.login = asyncHandler(async (req, res, next) => {
    console.log('here');
    const { email, password } = req.body;

    if (!password || !email) {
        return next(new ErrorResponse(`Email or Password is missing`, 400));
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 404));
    }

    // Check if password matches
    // Match user entered password to hashed password in database

    const isMatch = await user.matchPassword(password);


    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 404));
    }

    sendTokenResponse(user, 200, res);
});

/**
 * @desc   Get the current login user
 * @route  GET /api/v1/auth/me
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    // Create a user
    const user = await User.findByPk(req.user.id);

    res.status(200).json({ "success": true, data: user });
});

/**
 * @desc   Logout the user
 * @route  GET /api/v1/auth/logout
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.logout = asyncHandler(async (req, res, next) => {
    // Logout a user
    const user = await User.findByPk(req.user);

    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ "success": true, msg: 'Logout successfully' });
});

/**
 * @desc   Update user details
 * @route  GET /api/v1/auth/updatedetails
 * @access private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
    // Update the details of user
    console.log(req.body)
    const fieldsToUpdate = {
        name: req.body.user.name,
        email: req.body.user.email,
    };
    if (req.body.user.password) {
        fieldsToUpdate.password = req.body.user.password
    }

    const userExist = await User.findByPk(req.user.id);
    if (!userExist) {
        return next(new ErrorResponse(`User not found`, 404));
    }
    if (req.body.user.password) {
        const checkCurrentPassword = await userExist.matchPassword(req.body.user.currentPassword);
        if (!checkCurrentPassword) {
            return next(new ErrorResponse(`Current password does not match`, 404));
        }
    }
    const user = await userExist.update(fieldsToUpdate);
    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
        }
    });
};