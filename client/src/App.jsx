import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from "../src/utils/auth"; // Adjust the path as needed
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import JobPost from "./components/JobPost";
import JobList from "./components/JobList";
import OtpVerification from "./components/OtpVerification";
import Verification from "./components/Verification";
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path="/verify-otp" element={<Verification />} />
        <Route path="/job/post" element={<ProtectedRoute><JobPost /></ProtectedRoute>} />
        <Route path="/job/list" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
