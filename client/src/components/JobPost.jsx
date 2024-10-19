import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaHome, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const JobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobTitle || !jobDescription || !experienceLevel || !candidateEmail || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(candidateEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const token = localStorage.getItem('token'); 

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      endDate,
      candidates: [{ email: candidateEmail }], 
    };

    try {
      const response = await axios.post('https://job-posting-board-bfnr.onrender.com/api/job/post', jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });
      alert(response.data.message || 'Job posted successfully!');
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setCandidateEmail('');
      setEndDate('');
    } catch (error) {
      console.error('Error posting job:', error.response ? error.response.data : error.message);
      alert('Failed to post the job. Please try again later.');
    }
  };

  const handleHome = () => {
    navigate('/dashboard');
  }

  const handleViewJobs = () => {
    navigate('/job/list'); 
  };


  return (
    <>
      <Navbar showUser={true} />
      <div className="flex h-screen">
        <div className="flex flex-col items-center md:items-start w-16 border-r border-gray-300 md:w-[4%]">
          <div className="flex items-center justify-center w-full h-28" onClick={handleHome}>
            <FaHome className="text-gray-600 text-3xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center w-full h-28" onClick={handleViewJobs}>
            <FaClipboardList className="text-gray-600 text-3xl cursor-pointer" />
          </div>
        </div>
        <div className="flex-grow p-4 flex flex-col items-start">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto lg:mx-40 mt-10 lg:mt-24 p-4 lg:p-0">
            <div className="flex flex-col lg:flex-row items-start mb-4">
              <label className="text-base lg:text-lg font-medium mb-2 lg:mb-0 lg:w-1/4">Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="flex-1 border w-full border-gray-400 opacity-75 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start mb-4">
              <label className="text-base lg:text-lg font-medium mb-2 lg:mb-0 lg:w-1/4">Job Description</label>
              <textarea
                placeholder="Enter Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="flex-1 border w-full border-gray-400 opacity-75 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                rows={6}
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start mb-4">
              <label className="text-base lg:text-lg font-medium mb-2 lg:mb-0 lg:w-1/4">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="flex-1 border w-full border-gray-400 opacity-75 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              >
                <option value="" disabled>Select Experience Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            <div className="flex flex-col lg:flex-row items-start mb-4">
              <label className="text-base lg:text-lg font-medium mb-2 lg:mb-0 lg:w-1/4">Add Candidate</label>
              <input
                type="email"
                placeholder="Enter Candidate Email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                className="flex-1 border w-full border-gray-400 opacity-75 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start mb-4">
              <label className="text-base lg:text-lg font-medium mb-2 lg:mb-0 lg:w-1/4">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 border w-full border-gray-400 opacity-75 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobPost;
