const asyncHandler = require('../../middlewares/async');
var activateConnection = require('../connections/activateDb');

// Get the status of the activate application
exports.getActivateStatus = asyncHandler(async (id) => {
    const [rows] = await activateConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [id]);
    return rows;
});

// Update the status of the activate application
exports.updateActivateStatus = asyncHandler(async (status, id) => {
    console.log('11');
    console.log(id);

    const [rows] = await activateConnection.query('UPDATE `users` SET `active`= ? where `ntlogin` = ? LIMIT 1', [status, id]);
    return rows;
});

// Create activate application user
exports.createActivateUser = asyncHandler(async (status, user, permission) => {
    const [rows] = await activateConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [user.ntlogin]);

    if (rows[0]) {
        return false;
    }
    else {
        const [rows] = await activateConnection.query(`INSERT INTO users(employee_id, title, email, domain, ntlogin,user_type_id,
            location_oid, client_oid, country, active, can_enable, can_disable, is_admin,view_report ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [user.employee_id, user.name, user.email, user.domain || 'corp', user.ntlogin, '1', user.location_oid, user.client_id, user.country, status,
            '1', '1', permission === 'admin' ? '1' : '0', permission === 'admin' ? '1' : '0']);

        console.log(rows);
        return true;
    }
});