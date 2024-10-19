import React from 'react';
import logo from '../assets/cuvette.svg'; 
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ showUser }) => {
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userName'); 
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 m-4" />
      </div>
      <div className="flex items-center">
        <Link to="/contact" className="text-lg text-gray-700 m-4 hover:text-blue-500 transition duration-200">Contact</Link>
        {showUser && ( 
          <div className="flex items-center">
            <button className="flex items-center bg-gray-400 text-white py-2 pr-4 rounded cursor-pointer hover:bg-gray-600 m-4 transition duration-200">
              <FaUserCircle className="mx-2 text-lg" />
              <span className="hidden sm:block">{userName || 'Your Name'}</span>
              </button>
            <button 
              className="flex items-center bg-red-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-600 transition duration-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mx-2 text-lg" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
  