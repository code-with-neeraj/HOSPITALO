import { assets } from "../assets/assets"; // Import assets for images
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Banner component: Hero section for booking appointments
const Banner = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex bg-gradient-to-r from-[#3A4FFF] to-[#202C80] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {" "}
      {/* Main banner container */}
      {/* ------Left Side------ */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        {" "}
        {/* Left section with text and button */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          {" "}
          {/* Headings */}
          <p>Book Appointment</p> {/* Main heading */}
          <p className="mt-4">With 100+ Trusted Doctors</p> {/* Subheading */}
        </div>
        <button
          onClick={() => {
            navigate("/login"); // Navigate to login page
            scrollTo(0, 0); // Scroll to top
          }}
          className="bg-white cursor-pointer text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account {/* Button to create account */}
        </button>
      </div>
      {/* ------Right Side------ */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        {" "}
        {/* Right section with image */}
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />{" "}
        {/* Appointment image */}
      </div>
    </div>
  );
};

export default Banner; // Export the Banner component
