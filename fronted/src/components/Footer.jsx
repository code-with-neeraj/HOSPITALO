import React from "react"; // Import React
import { assets } from "../assets/assets"; // Import assets for images
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Footer component: Displays footer with company info and links
const Footer = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="md:mx-10">
      {" "}
      {/* Main footer container */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {" "}
        {/* Grid for footer sections */}
        {/* ----- Left Section ----- */}
        <div>
          {" "}
          {/* Left: Logo and description */}
          <img className="mb-5 w-40" src={assets.logon} alt="" />{" "}
          {/* Logo image */}
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Hospitalo is your trusted platform for managing prescriptions and
            healthcare needs online. We aim to simplify the process of
            connecting patients, doctors, and pharmacies, ensuring a seamless
            and secure experience for all users.
          </p>{" "}
          {/* Description */}
        </div>
        {/* ----- Center Section ----- */}
        <div>
          {" "}
          {/* Center: Company links */}
          <p className="text-xl font-medium mb-5">COMPANY</p>{" "}
          {/* Section title */}
          <ul className="flex flex-col gap-2 text-gray-600">
            {" "}
            {/* Links list */}
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
            >
              Home
            </li>{" "}
            {/* Home link */}
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/about");
                scrollTo(0, 0);
              }}
            >
              About us
            </li>{" "}
            {/* About us link */}
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/contact");
                scrollTo(0, 0);
              }}
            >
              Contact us
            </li>{" "}
            {/* Contact us link */}
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/privacy");
                scrollTo(0, 0);
              }}
            >
              Privacy policy
            </li>{" "}
            {/* Privacy policy link */}
          </ul>
        </div>
        {/* ----- Right Section ----- */}
        <div>
          {" "}
          {/* Right: Contact info */}
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>{" "}
          {/* Section title */}
          <ul className="flex flex-col gap-2 text-gray-600">
            {" "}
            {/* Contact list */}
            <li>+7277959834</li> {/* Phone number */}
            <li>neerajkr145518@gmail.com</li> {/* Email address */}
          </ul>
        </div>
      </div>
      {/* -------Copyright Text------- */}
      <div>
        <hr /> {/* Horizontal line */}
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Neeraj Kumar - All Rights Reserved.
        </p>{" "}
        {/* Copyright */}
      </div>
    </div>
  );
};

export default Footer; // Export the Footer component
