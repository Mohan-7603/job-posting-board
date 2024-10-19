const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const { sendOtp, generateOtp } = require('../utils/sendOtp');

const registerUser = async (req, res) => {
  const { name, phone, companyName, email, employeeSize } = req.body;

  try {
    const otp = generateOtp();
    const user = new User({ name, phone, companyName, email, employeeSize, otp, otpExpiry: Date.now() + 300000 }); 

    await user.save();
    await sendOtp(email, otp);

    res.status(201).json({ message: 'User registered successfully! Please check your email for the OTP.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP.' });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP has expired.' });

    user.isVerified = true;
    user.otp = undefined; 
    user.otpExpiry = undefined; 
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified successfully!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, verifyOtp };
