// Settings.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!isAuthenticated) {
        navigate('/login');  
        
      }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
