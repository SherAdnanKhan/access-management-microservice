const express = require("express");
const router = express.Router({ mergeParams: true });
const { updateApplcation, getApplicationStatus, getApplications, getRoles, createUser } = require("../controllers/application");
const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getApplications);
router.post('/user', createUser);
router.post('/application-status', getApplicationStatus);
router.post('/application/update', updateApplcation);
router.get('/:id/roles', getRoles);

module.exports = router;
