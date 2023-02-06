const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require('../middlewares/async');
const { getUser } = require("../mysql/queries/bpoQuery");


const User = require("../models").User;

/**
 * @desc   Get Ibex User
 * @route  Get /api/v1/dashboard/:id
 * @access Public
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getIbexUser = asyncHandler(async (req, res, next) => {
    const userData = await getUser(req.body.payload);
    if (!userData || userData.length < 1) {
        return next(new ErrorResponse(`User not found with id of ${req.body.payload}`, 404));
    }

    res.status(200).json({ "success": true, data: userData[0] });

});
