const asyncHandler = require('../../middlewares/async');
var helpdeskConnection = require('../connections/helpdeskDb');

// Get the status of the helpdesk application
exports.getHelpDeskStatus = asyncHandler(async (id) => {
  const [rows] = await helpdeskConnection.query('select `Status` from `loginsmapping` where `ntlogin` = ? LIMIT 1', [id]);
  return rows;
});

// Update the status of the helpdesk application
exports.updateHelpDeskStatus = asyncHandler(async (status, id) => {
  const [rows] = await helpdeskConnection.query('UPDATE `loginsmapping` SET `Status`= ? where `ntlogin` = ? LIMIT 1', [status, id]);
  return rows;
});

// Create helpdesk application user
exports.createHelpDeskUser = asyncHandler(async (status, user, permission) => {
  const [rows] = await helpdeskConnection.query('select `Status` from `loginsmapping` where `ntlogin` = ? LIMIT 1', [user.ntlogin]);

  if (rows[0]) {
    return false;
  }
  else {
    const [rows] = await helpdeskConnection.query(`INSERT INTO loginsmapping(LoginId, Name, domain, ntlogin, Role, Status) VALUES (?,?,?,?,?,?)`,
      [user.ntlogin, user.name, user.domain || 'corp', user.ntlogin, permission, status]);

    return true;
  }
});