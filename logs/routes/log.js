
const express = require("express");
const router = express.Router({ mergeParams: true });
const { getLogs } = require("../controllers/log");
const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getLogs);

module.exports = router;