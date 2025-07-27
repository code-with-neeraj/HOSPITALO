import React from "react";
import { assets } from "../assets/assets"; // Image assets
import { useNavigate } from "react-router-dom"; // For routing

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left: Logo and Description */}
        <div>
          <img className="mb-5 w-40" src={assets.logon} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Hospitalo is your trusted platform for managing prescriptions and healthcare needs online.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer" onClick={() => { navigate("/"); scrollTo(0, 0); }}>Home</li>
            <li className="cursor-pointer" onClick={() => { navigate("/about"); scrollTo(0, 0); }}>About us</li>
            <li className="cursor-pointer" onClick={() => { navigate("/contact"); scrollTo(0, 0); }}>Contact us</li>
            <li className="cursor-pointer" onClick={() => { navigate("/privacy"); scrollTo(0, 0); }}>Privacy policy</li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+7277959834</li>
            <li>neerajkr145518@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Neeraj Kumar - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
