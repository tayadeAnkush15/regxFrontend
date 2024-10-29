// Layout.js
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(50000);  
  const logoutTime = 500000000; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  
      
      
      return;
    }

    
    const resetTimer = () => {
      setRemainingTime(50);  
    };

    
    const countdown = setInterval(() => {
      setRemainingTime((prev) => prev - 1);  
    }, 1000);

    
    const autoLogoutTimer = setTimeout(() => {
      handleLogout();  
    }, logoutTime);

   
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('scroll', resetTimer);

    
    return () => {
      clearTimeout(autoLogoutTimer);
      clearInterval(countdown);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    onLogout();  
    navigate('/login');
    
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-white shadow-md ">
        {isAuthenticated && (
          <div className="relative">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="fixed top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              style={{ zIndex: 1000 }}
              aria-label="Logout"
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
            </button>

            
            <span className="fixed top-16 right-4 bg-gray-800 text-white text-sm p-1 rounded-md">
              {remainingTime}s
            </span>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="p-4">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
