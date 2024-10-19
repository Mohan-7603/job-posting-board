const express = require('express');
const { registerUser, verifyOtp } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard!' });
});

module.exports = router;
