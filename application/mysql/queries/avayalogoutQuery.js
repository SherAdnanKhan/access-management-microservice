const asyncHandler = require('../../middlewares/async');
var avayalogoutConnection = require('../connections/avayalogoutDb');

// Get the status of the avayalogout application
exports.getAvayaLogoutStatus = asyncHandler(async (id) => {
  const [rows] = await avayalogoutConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [id]);
  return rows;
});

// Update the status of the avayalogout application
exports.updateAvayaLogoutStatus = asyncHandler(async (status, id) => {
  const [rows] = await avayalogoutConnection.query('UPDATE `users` SET `active`= ? where `ntlogin` = ? LIMIT 1', [status, id]);
  return rows;
});

// Create avayalogout application user
exports.createAvayaLogoutUser = asyncHandler(async (status, user, permission) => {
  const [rows] = await avayalogoutConnection.query('select `active` from `users` where `ntlogin` = ? LIMIT 1', [user.ntlogin]);
  if (rows[0]) {
    return false;
  }
  else {
    const [rows] = await avayalogoutConnection.query(`INSERT INTO users(employee_id, title, email, domain, ntlogin, role, client_id, active) VALUES (?,?,?,?,?,?,?,?)`,
      [user.employee_id, user.name, user.email, user.domain || 'corp', user.ntlogin, permission, user.client_id, status]);
    return true;
  }
});