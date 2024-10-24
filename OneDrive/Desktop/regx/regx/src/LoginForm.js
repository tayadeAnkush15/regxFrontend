// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);  
      toast.success('Successfully logged in!'); 
      navigate('/home');  
    } else {
      toast.error('Please fill in all fields!');  
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-[500px]">
        <h2 className="text-2xl mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="mb-4 px-4 py-2 border w-full rounded outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}  
            placeholder="Password"
            className="px-4 py-2 border w-full rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            {showPassword ? (
              <span role="img" aria-label="Hide password">👁️</span>
            ) : (
              <span role="img" aria-label="Show password">👁️‍🗨️</span>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
