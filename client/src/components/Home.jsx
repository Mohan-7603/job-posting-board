import React from 'react';
import { FaUser, FaPhoneAlt, FaEnvelope, FaUsers } from 'react-icons/fa'; 
import Navbar from './Navbar';
import SignUpForm from './SignupForm';
import OtpVerification from './OtpVerification';

const Register = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      <Navbar showUser = {false}/>

      <div className="flex items-center justify-center bg-white flex-grow ">
        <div className="flex flex-col md:flex-row w-full max-w-full mx-auto p-4">
          <div className="w-full md:w-1/2 text-2xl p-8 mr-20 flex items-center justify-center">
            <p className="text-left">
              Lorem ipsum is simply dummy text of the printing and 
              typesetting industry. Lorem Ipsum has been the industry's 
              standard dummy text ever since the 1500s, when an 
              unknown printer took a gallery.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
                <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
