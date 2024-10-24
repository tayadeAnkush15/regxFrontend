// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import UserData from './UserData';
import Settings from './Setting';
import Layout from './Layout'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (username) => {
    setUserName(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <>
    <ToastContainer />
      <Routes>
        {/* Public route: Login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />}
        />

        {/* Protected routes within Layout */}
        <Route element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage userName={userName} /> : <Navigate to="/login" />}
          />
          <Route
            path="/user-data"
            element={isAuthenticated ? <UserData /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Redirect to login if no matching route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </>
  );
};

export default App;
