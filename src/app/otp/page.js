"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const OTP = () => {
  const [otp, setOtp] = useState(Array(6).fill('')); // Six digits for OTP
  const inputs = useRef([]);
  const router = useRouter(); // Initialize the router

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to next input if not the last input
      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      // Move to previous input if available
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP Submitted:', otpValue); // Log the OTP value
    // Assuming OTP is validated, redirect the user
    router.push('/resetpassword'); // Redirect to resetPassword page
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 6-digit verification code that was sent to your email address.
                </p>
              </header>
              <form id="otp-form" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputs.current[index] = el)} // Store each input reference
                      type="text"
                      className="w-12 h-12 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                  >
                    VERIFY OTP
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive the code?{' '}
                <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute left-6 right-6 md:left-12 md:right-auto bottom-4 md:bottom-8 text-center md:text-left">
        <a
          className="text-xs text-slate-500 hover:underline"
          href="https://cruip.com"
        >
          &copy; Cruip - Tailwind CSS templates
        </a>
      </footer>
    </div>
  );
};

export default OTP;
