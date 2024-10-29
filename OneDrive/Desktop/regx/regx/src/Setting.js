// Settings.js
import React, { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';


const Settings = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');  
      
      
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    onLogout();  
    navigate('/login');
    
  };

  return (
    <>
    <BackButton />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <Outlet /> 

    </div>
    </>
  );
};

export default Settings;
