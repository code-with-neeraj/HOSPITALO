import React from "react"; // Import React
import { specialityData } from "../assets/assets"; // Import speciality data array
import { Link } from "react-router-dom"; // Import Link for navigation

// SpecialityMenu component: Displays a menu of doctor specialities
const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      {" "}
      {/* Main container for the speciality menu */}
      <h1 className="text-3xl font-medium">Find by Speciality</h1> {/* Title */}
      <p className="sm:w1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>{" "}
      {/* Subtitle */}
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {" "}
        {/* Speciality cards container */}
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)} // Scroll to top on click
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            {" "}
            {/* Link to doctors by speciality */}
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />{" "}
            {/* Speciality image */}
            <p>{item.speciality}</p> {/* Speciality name */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu; // Export the SpecialityMenu component
