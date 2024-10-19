const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to:', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); 
};

module.exports = { sendOtp, generateOtp };
