const asyncHandler = require('../../middlewares/async');
var wifiguestConnection = require('../connections/wifiguestDb');

// Get the status of the wifiguest application
exports.getWifiGuestStatus = asyncHandler(async (id) => {
  const [rows] = await wifiguestConnection.query('select `active` from `login` where `username` = ? LIMIT 1', [id]);
  return rows;
});

// Update the status of the wifiguest application
exports.updateWifiGuestStatus = asyncHandler(async (status, id) => {
  const [rows] = await wifiguestConnection.query('UPDATE `login` SET `active`= ? where `username` = ? LIMIT 1', [status, id]);
  return rows;
});

// Create helpdesk application user
exports.createWifiGuestUser = asyncHandler(async (status, user, permission) => {
  const [rows] = await wifiguestConnection.query('select `active` from `login` where `username` = ? LIMIT 1', [user.ntlogin]);

  if (rows[0]) {
    return false;
  }
  else {
    const [rows] = await wifiguestConnection.query(`INSERT INTO login(domain, username, site_id, active) VALUES (?,?,?,?)`,
      [user.domain || 'corp', user.ntlogin, user.location_oid, status]);

    return true;
  }
});