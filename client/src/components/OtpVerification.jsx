import React, { useState } from 'react';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const location = useLocation();
  const [otpData, setOtpData] = useState({
    email: location.state?.email || '', 
    otp: '',
  });
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpData({ ...otpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', otpData);
      alert(response.data.message);
      setIsVerified(true);


      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error.response?.data?.message || 'An error occurred');
      setIsVerified(false);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 border-yellow-400 p-6 rounded-lg w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>
      <div className="mb-6">
        <div className="flex items-center border border-opacity-50 mb-4 border-gray-400 rounded-md bg-gray-100 p-2 relative">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input 
            type="text" 
            name="otp"
            placeholder="Email OTP" 
            value={otpData.otp}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none" 
            required 
          />
          {isVerified && (
            <FaCheckCircle className="text-green-500 absolute right-3" />
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
          Verify
        </button>
      </div>
    </form>
  );
};

export default OtpVerification;
