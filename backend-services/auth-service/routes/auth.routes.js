const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verify-registration', authController.verifyRegistration);

// Password Reset Flow
router.post('/password/forgot', authController.forgotPassword);
router.post('/password/verify-otp', authController.verifyOtp);
router.post('/password/reset', authController.resetPassword);

module.exports = router;
