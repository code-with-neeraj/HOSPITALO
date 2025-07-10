import React, { useContext } from "react"; // Import React and useContext hook from 'react' library
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from 'react-router-dom' for navigation
import { AppContext } from "../context/AppContext"; // Import AppContext to access global state

// TopDoctors component: Shows a list of top doctors to book
const TopDoctors = () => {
  const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
  const { doctors } = useContext(AppContext); // Destructure doctors array from AppContext using useContext hook

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {" "}
      {/* Main container div with flex layout and styling */}
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>{" "}
      {/* Heading for the section */}
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>{" "}
      {/* Subheading/description paragraph */}
      <div
        className="w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }} // Inline style to create a responsive grid layout
      >
        {doctors.slice(0, 10).map(
          (
            item,
            index // Map over the first 10 doctors and render a card for each
          ) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              {" "}
              {/* Each doctor card is clickable; navigates to appointment page for that doctor and scrolls to top */}
              <img
                className="bg-blue-50 hover:bg-gradient-to-r from-[#D0D6FF] to-[#EDF0FF]"
                src={item.image}
                alt=""
              />{" "}
              {/* Doctor's image */}
              <div className="p-4">
                {" "}
                {/* Card content */}
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {" "}
                  {/* Availability status with conditional color and text */}
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>{" "}
                  {/* Small circle with color based on availability (ternary operator explained) */}
                  <p>{item.available ? "Available" : "Unavailable"}</p>{" "}
                  {/* Text shows 'Available' if item.available is true, else 'Unavailable' */}
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>{" "}
                {/* Doctor's name */}
                <p className="text-gray-600 text-sm">{item.speciality}</p>{" "}
                {/* Doctor's speciality */}
              </div>
            </div>
          )
        )}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
      >
        more
      </button>{" "}
      {/* Button to navigate to the full doctors list; scrolls to top on click */}
    </div>
  );
};

export default TopDoctors; // Export the TopDoctors component as default
