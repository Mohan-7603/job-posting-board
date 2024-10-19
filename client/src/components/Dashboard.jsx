import React from 'react';
import Navbar from './Navbar';
import { FaHome, FaClipboardList } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateInterview = () => {
    navigate('/job/post');
  };

  const handleViewJobs = () => {
    navigate('/job/list'); 
  };

  return (
    <>
      <Navbar showUser={true} />
      <div className="flex h-screen">
        <div className="flex flex-col items-center md:items-start w-16 border-r border-gray-300 md:w-[4%]">
          <div className="flex items-center justify-center w-full h-28">
            <FaHome className="text-gray-600 text-3xl" />
          </div>
          {/* Jobs Posted Icon */}
          <div className="flex items-center justify-center w-full h-28" onClick={handleViewJobs}>
            <FaClipboardList className="text-gray-600 text-3xl cursor-pointer" />
          </div>
        </div>
        <div className="flex-grow p-4 flex flex-col items-start">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600 md:w-1/2 md:mt-6 lg:w-1/4 lg:mt-6 transition duration-200" onClick={handleCreateInterview}>
            Create Interview
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
