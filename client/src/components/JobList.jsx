import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FaHome, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://job-posting-board-bfnr.onrender.com/api/job/list', {
        headers: {
          'Authorization': `Bearer ${token}` 
        },
      });
      setJobs(response.data.jobs); 
      console.log('Fetched jobs:', response.data.jobs); 

    } catch (error) {
      console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
    }
  };

  const handleSendJobAlert = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`https://job-posting-board-bfnr.onrender.com/api/send-updates/${jobId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}` 
        },
      });
      setAlertMessage(response.data.message); 
    } catch (error) {
      console.error('Error sending job alerts:', error.response ? error.response.data : error.message);
      setAlertMessage('Error sending job alerts'); 
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleViewJobPost = () => {
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
          <div className="flex items-center justify-center w-full h-28" onClick={handleViewJobPost}>
            <FaClipboardList className="text-gray-600 text-3xl cursor-pointer" />
          </div>
        </div>
        <div className="flex-grow p-4 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4">Jobs Posted</h2>
          {alertMessage && <div className="mb-4 text-green-600">{alertMessage}</div>}
          <div className="w-full max-w-2xl mx-auto lg:mx-40">
            {jobs.length > 0 ? (
              <ul className="space-y-4">
                {jobs.map((job) => (
                  <li key={job._id} className="border rounded-lg p-4 shadow">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <p className="text-gray-500">Experience Level: {job.experienceLevel}</p>
                    <p className="text-gray-500">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                    <p className="text-gray-500">Candidates: {job.candidates.map(c => c.email).join(', ')}</p>
                    <button
                      onClick={() => handleSendJobAlert(job._id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Send Job Alerts
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
