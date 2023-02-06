const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require('../middlewares/async');
const ActionLog = require('../models').ActionLog;
const { applications } = require("../util/helper");
const { getActivateStatus, updateActivateStatus, createActivateUser } = require('../mysql/queries/activateQuery');
const { getAnnouncementStatus, updateAnnouncementStatus, createAnnouncementUser } = require("../mysql/queries/announcementQuery");
const { getAvayaLogoutStatus, updateAvayaLogoutStatus, createAvayaLogoutUser } = require("../mysql/queries/avayalogoutQuery");
const { getHelpDeskStatus, updateHelpDeskStatus, createHelpDeskUser } = require("../mysql/queries/helpdeskQuery");
const { getSdotpStatus, updateSdotpStatus, createSdotpUser } = require("../mysql/queries/sdotpQuery");
const { getWifiGuestStatus, updateWifiGuestStatus, createWifiGuestUser } = require("../mysql/queries/wifiguestQuery");
const { getLocations } = require("../mysql/queries/bpoQuery");

/**
 * @desc   get the Applications
 * @route  get /api/v1/applications/
 * @access Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getApplications = asyncHandler(async (req, res, next) => {
    res.status(200).json({ "success": true, data: applications });
});

/**
 * @desc   get the Roles by application
 * @route  get /api/v1/applications/:id/roles
 * @access Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getRoles = asyncHandler(async (req, res, next) => {
    let roles = [];
    if (req.params.id === 'announcement') {
        roles = await getLocations();
    }
    else {
        const applcationRoles = applications.filter((app) => (
            app.name === req.params.id
        ));
        if (applcationRoles && applcationRoles[0].roles) {
            roles = applcationRoles[0].roles;
        }
    }
    res.status(200).json({ "success": true, data: roles });
});



/**
 * @desc   get the Application status
 * @route  get /api/v1/application/application-status
 * @access Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.getApplicationStatus = asyncHandler(async (req, res, next) => {
    const application = req.body.payload && req.body.payload.application;
    const id = req.body.payload && req.body.payload.ibexUser && req.body.payload.ibexUser.ntlogin;
    const role = req.body.payload && req.body.payload.role;

    if (!application || !id) {
        return next(new ErrorResponse(`Please fill all the required fields`, 404));
    }

    const applicationStatus = await getStatus(id, application, role);

    res.status(200).json({ "success": true, data: applicationStatus });
});


/**
 * @desc    Create a ibex application user
 * @route   Put /api/v1/applcation/user
 * @access  Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.createUser = asyncHandler(async (req, res, next) => {
    const app_name = req.body.payload && req.body.payload.application;
    const app_status = true;
    const app_permission = req.body.payload && req.body.payload.permission;
    const ibexUser = req.body.payload && req.body.payload.ibexUser;

    if (!app_name || app_permission === undefined || !ibexUser) {
        return next(new ErrorResponse(`Please fill all the required fields`, 404));
    }

    const createData = {
        employee_id: ibexUser.employee_id,
        employee_email: ibexUser.email,
        employee_name: ibexUser.name,
        ip_address: '0.0.0.0',
        app_name: app_name,
        app_role: JSON.stringify(app_permission),
        action: app_status,
        user_id: req.user.id
    };

    const actionLog = await ActionLog.create(createData);

    if (actionLog) {
        const userStatus = await createUser(ibexUser, app_name, app_permission);

        const updateData = {
            data_request: JSON.stringify(actionLog),
            data_response: JSON.stringify(userStatus),
            request_status: app_status,
            request_message: `Create and enable access for ${app_name}`
        }

        const actionLogUpdate = await ActionLog.findByPk(actionLog.id);

        if (!actionLogUpdate) {
            return next(new ErrorResponse(`Action logs cannot be updated`, 404));
        }

        actionLogUpdate.update(updateData);

        if (!userStatus) {
            return next(new ErrorResponse(`Application user already exist!`, 404));
        }
    }
    else {
        return next(new ErrorResponse(`Cannot create to user status`, 404));
    }

    res.status(201).json({ "success": true, msg: 'User Created successfully' });
});


/**
 * @desc    Enable/Disable a ibex application
 * @route   Put /api/v1/applcation/
 * @access  Private
 * @param  {req} req
 * @param  {res} res
 * @param  {next} next
 */
exports.updateApplcation = asyncHandler(async (req, res, next) => {
    const app_name = req.body.payload && req.body.payload.application;
    const app_status = req.body.payload && req.body.payload.applicationStatus;
    const app_role = req.body.payload && req.body.payload.role;
    const ibexUser = req.body.payload && req.body.payload.ibexUser;
    
    if (!app_name || app_status === undefined || !ibexUser) {
        return next(new ErrorResponse(`Please fill all the required fields`, 404));
    }

    const createData = {
        employee_id: ibexUser.employee_id,
        employee_email: ibexUser.email,
        employee_name: ibexUser.name,
        ip_address: '0.0.0.0',
        app_name: app_name,
        app_role: app_role,
        action: app_status,
        user_id: req.user.id
    };

    const actionLog = await ActionLog.create(createData);

    if (actionLog) {
        const applicationStatus = await updateStatus(app_status, ibexUser.ntlogin, app_name, app_role,);

        const updateData = {
            data_request: JSON.stringify(actionLog),
            data_response: JSON.stringify(applicationStatus),
            request_status: app_status,
            request_message: app_status ? `Enable access for ${app_name}` : `Disable access for ${app_name}`
        }

        const actionLogUpdate = await ActionLog.findByPk(actionLog.id);

        if (!actionLogUpdate) {
            return next(new ErrorResponse(`Action logs cannot be updated`, 404));
        }

        actionLogUpdate.update(updateData);
    }
    else {
        return next(new ErrorResponse(`Cannot update to application status`, 404));
    }

    res.status(201).json({ "success": true, msg: 'Application updated successfully' });
});

const getStatus = asyncHandler(async (id, application, role) => {
    // Get status by application and role
    let applicationStatus = null;

    if (application === 'activate') {
        result = await getActivateStatus(id);

        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].active ? true : false;
    }
    else if (application === 'announcement') {
        result = await getAnnouncementStatus(id);
        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].active ? true : false;
    }
    else if (application === 'avayalogout') {
        result = await getAvayaLogoutStatus(id);
        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].active ? true : false;
    }
    else if (application === 'helpdesk') {
        result = await getHelpDeskStatus(id);
        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].Status ? true : false;
    }
    else if (application === 'sdotp') {
        result = await getSdotpStatus(id);
        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].active ? true : false;
    }
    else if (application === 'wifiguest') {
        result = await getWifiGuestStatus(id);
        if (!result || result.length < 1) {
            throw new ErrorResponse(`User Doesn't exist!`, 404);
        }
        applicationStatus = result[0].active ? true : false;
    }
    else {
        throw new ErrorResponse(`Application not found`, 404);
    }
    return applicationStatus;
});

const updateStatus = asyncHandler(async (status, id, application) => {
    // Update status by application
    let applicationStatus = null;

    if (application === 'activate') {
        applicationStatus = await updateActivateStatus(status, id);
    }
    else if (application === 'announcement') {
        applicationStatus = await updateAnnouncementStatus(status, id);
    }
    else if (application === 'avayalogout') {
        applicationStatus = await updateAvayaLogoutStatus(status, id);
    }
    else if (application === 'helpdesk') {
        applicationStatus = await updateHelpDeskStatus(status, id);
    }
    else if (application === 'sdotp') {
        applicationStatus = await updateSdotpStatus(status, id);
    }
    else if (application === 'wifiguest') {
        applicationStatus = await updateWifiGuestStatus(status, id);
    }
    else {
        throw new ErrorResponse(`Application not found`, 404);
    }
    return applicationStatus;
});

const createUser = asyncHandler(async (user, application, permission) => {
    // Update status by application and role
    let userStatus = null;

    if (application === 'activate') {
        userStatus = await createActivateUser(true, user, permission);
    }
    else if (application === 'announcement') {
        userStatus = await createAnnouncementUser(true, user, permission);
    }
    else if (application === 'avayalogout') {
        userStatus = await createAvayaLogoutUser(true, user, permission);
    }
    else if (application === 'helpdesk') {
        userStatus = await createHelpDeskUser(true, user, permission);
    }
    else if (application === 'sdotp') {
        userStatus = await createSdotpUser(true, user, permission);
    }
    else if (application === 'wifiguest') {
        userStatus = await createWifiGuestUser(true, user, permission);
    }
    else {
        throw new ErrorResponse(`Application not found`, 404);
    }
    return userStatus;
});