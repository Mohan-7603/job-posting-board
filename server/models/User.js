const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employeeSize: { type: Number, required: true },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
