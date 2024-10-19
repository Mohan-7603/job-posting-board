import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaEnvelope, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    employeeSize: '',
  });

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && !/^[0-9]*$/.test(value)) {
      return; 
    }
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.phone.match(phoneRegex)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.companyName) newErrors.companyName = 'Company Name is required.';
    if (!formData.email.match(emailRegex)) newErrors.email = 'Invalid email format.';
    if (!formData.employeeSize || formData.employeeSize < 1) newErrors.employeeSize = 'Employee Size must be at least 1.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://job-posting-board-bfnr.onrender.com/api/auth/register', formData);
      alert(response.data.message);

      localStorage.setItem('userName', formData.name);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 border-yellow-400 p-6 rounded-lg w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
      <p className='text-center mb-8'>Lorem, Ipsum is a simply dummy text</p>
      {Object.keys(errors).map((key) => (
        <p key={key} className="text-red-500 text-center">{errors[key]}</p>
      ))}
      <div className="mb-4">
        <div className="flex items-center border border-opacity-50 border-gray-400 rounded-md bg-gray-100 p-2">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center border border-opacity-50 border-gray-400 rounded-md bg-gray-100 p-2">
          <FaPhoneAlt className="text-gray-400 mr-2" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone no."
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none"
            maxLength={10} // Restrict to 10 digits
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center border border-opacity-50 border-gray-400 rounded-md bg-gray-100 p-2">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            name='companyName'
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center border border-opacity-50 border-gray-400 rounded-md bg-gray-100 p-2">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            name='email'
            placeholder="Company Email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center border border-opacity-50 border-gray-400 rounded-md bg-gray-100 p-2">
          <FaUsers className="text-gray-400 mr-2" />
          <input
            type="number"
            name='employeeSize'
            placeholder="Employee Size"
            value={formData.employeeSize}
            onChange={handleChange}
            className="flex-1 bg-gray-100 focus:outline-none"
            min="1" 
            required
          />
        </div>
      </div>
      <p className='text-center mb-4'>By clicking on proceed you will accept our <br /> <span className='text-blue-400'>Terms & Conditions</span></p>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
      >
        Proceed
      </button>
    </form>
  );
};

export default SignUpForm;
