import React, { useContext } from "react";
// Import assets for images and icons
import { assets } from "../assets/assets";
// Import AdminContext for admin authentication state
import { AdminContext } from "../context/AdminContext";
// Import useNavigate hook for navigation
import { useNavigate } from "react-router-dom";
// Import DoctorContext for doctor authentication state
import { DoctorContext } from "../context/DoctorContext";

// Navbar component for displaying the top navigation bar with logout functionality
const Navbar = () => {
  // Destructure admin token and its setter from AdminContext
  const { aToken, setAToken } = useContext(AdminContext);
  // Destructure doctor token and its setter from DoctorContext
  const { dToken, setDToken } = useContext(DoctorContext);

  // Initialize navigation hook
  const navigate = useNavigate();

  // logoutHandler: Logs out the user by clearing tokens, localStorage, and navigating to home
  const logoutHandler = () => {
    navigate("/"); // Navigate to home page
    aToken && setAToken(""); // Clear admin token in context if present
    aToken && localStorage.removeItem("aToken"); // Remove admin token from localStorage if present
    dToken && setDToken(""); // Clear doctor token in context if present
    dToken && localStorage.removeItem("dToken"); // Remove doctor token from localStorage if present
    window.location.reload(); // Reload the page to reset state
  };

  // Render the navigation bar
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white ">
      {/* Left section: Logo and user role */}
      <div className="flex items-center gap-2 text-xs">
        {/* Logo image */}
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.logon}
          alt="Logo"
        />
        {/* Display user role based on token */}
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      {/* Right section: Logout button */}
      <button
        onClick={logoutHandler}
        className="bg-[#5f6FFF] hover:opacity-75 cursor-pointer text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
