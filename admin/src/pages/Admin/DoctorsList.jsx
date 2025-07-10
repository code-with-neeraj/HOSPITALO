import React, { useContext, useEffect } from "react"; // Import React, useContext, useEffect
import { AdminContext } from "../../context/AdminContext"; // Import AdminContext for admin state

// DoctorsList component: Displays all doctors and allows changing their availability
const DoctorsList = () => {
  // Destructure doctors, aToken, getAllDoctors, changeAvailability from AdminContext
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  // useEffect: Fetch all doctors when aToken changes
  useEffect(() => {
    if (aToken) {
      getAllDoctors(); // Fetch doctors if admin token exists
    }
  }, [aToken]);

  // Render the doctors list
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      {/* Page title */}
      <h1 className="text-lg font-medium">All Doctors</h1>
      {/* Doctors cards container */}
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {/* Map through doctors and render each doctor card */}
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            {/* Doctor image */}
            <img
              className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              {/* Doctor name */}
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              {/* Doctor speciality */}
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              {/* Availability toggle */}
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList; // Export the DoctorsList component
