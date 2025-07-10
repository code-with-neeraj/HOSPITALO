import React, { useContext, useState } from "react"; // Import React, useContext, useState
import { assets } from "../assets/assets"; // Import assets for images/icons
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink and useNavigate for routing
import { AppContext } from "../context/AppContext"; // Import AppContext for app state
import axios from "axios";

// Navbar component: Top navigation bar for the website
const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [showMenu, setShowMenu] = useState(false); // State for mobile menu visibility
  const { token, setToken, userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext); // Get token, setToken, userData from context



  // logout: Handles user logout
  const logout = async () => {
     const {data} = await axios.post(backendUrl + '/api/user/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(false); // Clear token in context
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      {" "}
      {/* Main navbar container */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logon}
        alt=""
      />{" "}
      {/* Logo image */}
      <ul className="md:flex items-start gap-5 font-medium hidden">
        {" "}
        {/* Desktop navigation links */}
        <NavLink to="/">
          <li className="py-1">HOME</li> {/* Home link */}
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li> {/* All doctors link */}
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li> {/* About link */}
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li> {/* Contact link */}
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 ">
        {" "}
        {/* Right side: user/account section */}
        {
          // Ternary operator: If both token and userData are true, show user profile dropdown, else show 'Create account' button
          // (token && userData) ? (profile dropdown) : (Create account button)
          token && userData ? (
            <button className="flex items-center gap-2 cursor-pointer group relative">
              {" "}
              {/* User profile dropdown */}
              <img
                className="w-8 rounded-full "
                src={userData.image}
                alt=""
              />{" "}
              {/* User profile image */}
              <img className=" w-2.5" src={assets.dropdown_icon} alt="" />{" "}
              {/* Dropdown icon */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                {" "}
                {/* Dropdown menu */}
                <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 ">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>{" "}
                  {/* My Profile link */}
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>{" "}
                  {/* My Appointments link */}
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                  
                  
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create account
            </button>
          ) // Create account button
        }
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />{" "}
        {/* Mobile menu icon */}
        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          {" "}
          {/* Mobile menu container */}
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logon} className="w-36" alt="" />{" "}
            {/* Logo in mobile menu */}
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7"
              alt=""
            />{" "}
            {/* Close icon */}
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {" "}
            {/* Mobile menu links */}
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded full inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded full inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded full inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded full inline-block">CONTACT</p>
            </NavLink>
            {
              // Ternary operator: If both token and userData are not present, show nothing, else show profile/appointments NavLink
              // (!token && !userData) ? '' : (profile/appointments NavLink)
              !token && !userData ? (
                ""
              ) : (
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/my-profile"
                  className=" px-4 py-2 rounded full inline-block"
                >
                  My Profile
                </NavLink>
              )
            }
            {!token && !userData ? (
              ""
            ) : (
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-appointments"
                className=" px-4 py-2 rounded full inline-block"
              >
                My Appointments
              </NavLink>
            )}
            {
              // Ternary operator: If token is not present, show Login button, else show Logout button
              // (!token) ? (Login button) : (Logout button)
              !token ? (
                <NavLink
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/login");
                  }}
                  to="/login"
                  className="bg-purple-500 hover:opacity-75 text-white px-4 py-2 rounded font-semibold"
                >
                  Login
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  to="/login"
                  className="bg-purple-500 hover:opacity-75 text-white px-4 py-2 rounded font-semibold"
                >
                  Logout
                </NavLink>
              )
            }
            {
              // Ternary operator: If token is not present, show Create account button, else show nothing
              // (!token) ? (Create account button) : ''
              !token ? (
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/login"
                  className="bg-purple-500 hover:opacity-75 text-white px-4 py-2 rounded font-semibold"
                >
                  Create account
                </NavLink>
              ) : (
                ""
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar; // Export the Navbar component
