const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const crypto = require('crypto'); 

dotenv.config();
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

if (!process.env.JWT_SECRET) {
  const generateSecret = () => crypto.randomBytes(64).toString('hex');
  process.env.JWT_SECRET = generateSecret();
  console.log('Generated JWT Secret:', process.env.JWT_SECRET);
}

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json()); 

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/jobRoutes'));


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
