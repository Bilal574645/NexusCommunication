import React from 'react';
import Image from 'next/image';
import img1 from '@/img/google_logo_icon.png'; // Place images in the 'public' folder
import img2 from '@/img/bg.jpg'; 
import Link from 'next/link';

const resetpassword = () => {
  return (
    <div>
        <div className="text-white">
      <div className="h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img2.src})` }}>
        <div className="bg-black bg-opacity-60 backdrop-blur-lg px-8 py-10 rounded-md border">
          <h2 className="text-3xl text-center mb-5 font-semibold">Reset account password</h2> 
          <h3>Enter a new password  <Link className="text-blue-500" href="/login">Login here</Link></h3>
          <div>
           
           <br />
           <br />

          </div>
          <div>
       
          </div>

          {/* Email Input */}
          <div className="flex items-center border-b mb-3">
          
            <input
              type="password"
              placeholder="password"
              className="py-2 outline-none bg-inherit w-64"
            />
            <i className="ri-mail-line text-gray-400"></i>
          </div>

          <div className="flex items-center border-b mb-3">
          
          <input
            type="password"
            placeholder="Confirm password"
            className="py-2 outline-none bg-inherit w-64"
          />
          <i className="ri-mail-line text-gray-400"></i>
        </div>

        


          {/*  Button */}
          <div
            className="bg-white hover:bg-gray-400 rounded-md text-black py-2 text-center mb-5 font-semibold cursor-pointer"
          >
            Reset password
          </div>

        
        </div>
      </div>
    </div>
    </div>
  )
}

export default resetpassword
