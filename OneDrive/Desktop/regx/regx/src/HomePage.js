// HomePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const HomePage = ({ userName, onLogout, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();  
    navigate('/login');  
  };

  return (
    <>
    <BackButton />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Welcome, {userName}</h2>
      <div className="space-y-4">
        <Link to="/user-data">
          <button className="px-6 py-2 mr-7 bg-green-500 text-white rounded hover:bg-green-600">
            View User Data
          </button>
        </Link>
        <Link to="/settings">
          <button className="px-6 py-2  bg-blue-500 text-white rounded hover:bg-blue-600">
            Settings
          </button>
        </Link>
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default HomePage;
