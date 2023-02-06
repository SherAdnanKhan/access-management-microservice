const asyncHandler = require('../../middlewares/async');
var sdotpConnection = require('../connections/sdotpDb');

// Get the status of the sdotp application
exports.getSdotpStatus = asyncHandler(async (id) => {
  const [rows] = await sdotpConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [id]);
  return rows;
});

// Update the status of the sdotp application
exports.updateSdotpStatus = asyncHandler(async (status, id) => {
  const [rows] = await sdotpConnection.query('UPDATE `users` SET `active`= ? where `ntlogin` = ? LIMIT 1', [status, id]);
  return rows;
});

// Create sdotp application user
exports.createSdotpUser = asyncHandler(async (status, user, permission) => {
  const [rows] = await sdotpConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [user.ntlogin]);

  if (rows[0]) {
    return false;
  }
  else {
    const [rows] = await sdotpConnection.query(`INSERT INTO users(domain, ntlogin, name, employee_id,role, active) VALUES (?,?,?,?,?,?)`,
      [user.domain || 'corp', user.ntlogin, user.name, user.employee_id, permission, status]);

    return true;
  }
});