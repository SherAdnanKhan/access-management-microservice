const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require("../util/errorResponse");
const ActionLog = require('../models').ActionLog;
const User = require('../models').User;
const { getPagingData, getPagination } = require('../util/pagination');

/**
 * @desc   get the Logs
 * @route  get /api/v1/logs/
 * @access Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getLogs = asyncHandler(async (req, res, next) => {
    title = '';
    const { pagination, sortField, sortOrder } = req.query;
    const { current, pageSize } = pagination;

    let sort = sortField ? [
        [sortField, sortOrder === 'descend' ? 'DESC' : 'ASC']
    ]
        : [['id', 'DESC']];

    let condition = title ? {
        [Op.or]: [
            { employee_id: { [Op.like]: `%${title}%` } },
            { employee_name: { [Op.like]: `%${title}%` } },
            { app_name: { [Op.like]: `%${title}%` } }
        ]
    } : null;

    const { limit, offset } = await getPagination(current - 1, pageSize);
    await ActionLog.findAndCountAll({
        include: [{
            model: User,
            as: 'user',
            attributes: ['name']
        }],
        where: condition, limit, offset, order: sort
    })
        .then(data => {
            const response = getPagingData(data, current - 1, limit);

            res.status(200).json({ "success": true, data: response });
        })
        .catch(err => {
            return next(new ErrorResponse(err, 500));
        });
});

