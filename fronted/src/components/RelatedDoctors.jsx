import React, { useContext, useEffect, useState } from "react"; // Import React, useContext, useEffect, useState
import { AppContext } from "../context/AppContext"; // Import AppContext for app state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// RelatedDoctors component: Shows doctors with the same speciality except the current one
const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext); // Get doctors list from context
  const navigate = useNavigate(); // Hook for navigation

  const [relDoc, setRelDoc] = useState([]); // State for related doctors

  useEffect(() => {
    // When doctors or speciality or docId changes, filter related doctors
    if (doctors.length > 0 && speciality) {
      // Filter doctors with same speciality and not the current doctor
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData); // Update related doctors state
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {" "}
      {/* Main container */}
      <h1 className="text-3xl font-medium">Related Doctors</h1> {/* Title */}
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>{" "}
      {/* Subtitle */}
      <div
        className="w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }} // Responsive grid for doctor cards
      >
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            {" "}
            {/* Doctor card */}
            <img className="bg-blue-50 " src={item.image} alt="" />{" "}
            {/* Doctor image */}
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                {" "}
                {/* Availability status */}
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Unavailable"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>{" "}
              {/* Doctor name */}
              <p className="text-gray-600 text-sm">{item.speciality}</p>{" "}
              {/* Doctor speciality */}
            </div>
          </div>
        ))}
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
      {/* More button */}
    </div>
  );
};

export default RelatedDoctors; // Export the RelatedDoctors component
