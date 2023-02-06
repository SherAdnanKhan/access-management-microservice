const express = require("express");
const router = express.Router({ mergeParams: true });
const { getIbexUser } = require("../controllers/user");
const { protect, authorize } = require('../middlewares/auth');


router.use(protect);
router.use(authorize('admin'));

router.post('/ibexuser', getIbexUser);

module.exports = router;