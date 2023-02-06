const express = require("express");
const { login, getMe, updateDetails, logout } = require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const router = express.Router();


router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;

