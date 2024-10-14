'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import img1 from '@/img/google_logo_icon.png';  // Google logo
import img2 from '@/img/bg.jpg';  // Background image
import Link from 'next/link';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // Added state to track message type (success/error)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setMessage("Username or Email and password are required");
      setMessageType('error');  // Set message type to error
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        emailOrUsername: usernameOrEmail, 
        password 
      });

      if (res.status === 200) {
        setMessage("Login successful!");
        setMessageType('success');  // Set message type to success
        localStorage.setItem('token', res.data.token);  // Store the token
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || 'Invalid credentials');
        setMessageType('error');  // Set message type to error
      } else {
        setMessage('Something went wrong!');
        setMessageType('error');  // Set message type to error
      }
    }
  };

  return (
    <div className="text-white">
      <div className="h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img2.src})` }}>
        <div className="bg-black bg-opacity-60 backdrop-blur-lg px-8 py-10 rounded-md border">
          <h2 className="text-3xl text-center mb-5 font-semibold">Login</h2>

          {/* Username or Email Input */}
          <form className="mb-4">
            <div className="flex items-center border-b mb-3">
              <input
                type="text"
                placeholder="Username or Email"
                className="py-2 outline-none bg-inherit w-64"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-b mb-3">
              <input
                type="password"
                placeholder="Password"
                className="py-2 outline-none bg-inherit w-64"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="bg-white hover:bg-gray-400 rounded-md text-black py-2 text-center mb-5 font-semibold cursor-pointer">
              <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <p className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'} mb-4`}>
              {message}
            </p>
          )}

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between text-xs mb-6">
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <p>Remember password</p>
            </div>
            <Link className='text-blue-500' href="/forget">Forgot password?</Link>
          </div>

          {/* Google Login Button */}
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm">
            <Image className="w-6 mr-3" src={img1} alt="Google logo" />
            <h1 className="text-black">Login with Google</h1>
          </button>

          {/* Register Link */}
          <div className="text-sm text-center mt-5">
            Don't have an account?{' '}
            <Link href="/signup">
              <button className="text-blue-500 font-semibold">SIGNUP</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
