const asyncHandler = require('../../middlewares/async');
var announcementConnection = require('../connections/announcementDb');

// Get the status of the announcement application
exports.getAnnouncementStatus = asyncHandler(async (id) => {
  const [rows] = await announcementConnection.query('select `active` from `users` where `user_id` = ? LIMIT 1', [id]);
  return rows;
});

// Update the status of the announcement application
exports.updateAnnouncementStatus = asyncHandler(async (status, id) => {
  const [rows] = await announcementConnection.query('UPDATE `users` SET `active`= ? where `user_id` = ? LIMIT 1', [status, id]);
  return rows;
});

// Create activate application user
exports.createActivateUser = asyncHandler(async (status, user, permission) => {
  const [rows] = await announcementConnection.query('select `active` from `users` where `user_id` = ? LIMIT 1', [user.ntlogin]);

  if (rows[0]) {
    return false;
  }
  else {
    const [rows] = await activateConnection.query(`INSERT INTO permissions(user_id, premission_name, permission_value) VALUES (?,?,?)`,
      [user.employee_id, 'admin-notifications', JSON.stringify(permission)]);
    return true;
  }
});