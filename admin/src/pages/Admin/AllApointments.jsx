import React from "react"; // Import React
import { useContext } from "react"; // Import useContext hook
import { AdminContext } from "../../context/AdminContext"; // Import AdminContext for admin state
import { useEffect } from "react"; // Import useEffect hook
import { AppContext } from "../../context/AppContext"; // Import AppContext for app utilities
import { assets } from "../../assets/assets"; // Import assets for images/icons

// AllApointments component: Displays all appointments in a table
const AllApointments = () => {
  // Destructure admin and app context values
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext); // Admin state and functions
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext); // Utility functions and currency

  // useEffect: Fetch all appointments when aToken changes
  useEffect(() => {
    if (aToken) {
      getAllAppointments(); // Fetch appointments if admin token exists
    }
  }, [aToken]);

  // Render the appointments table
  return (
    <div className="w-full max-w-6xl m-5">
      {/* Title */}
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      {/* Table container */}
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table header (hidden on small screens) */}
        <div className="hidden sm:grid grid-cols-[0.5f_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-200">
          <p>#</p> {/* Serial number */}
          <p>Patient</p> {/* Patient name */}
          <p>Age</p> {/* Patient age */}
          <p>Date & Time</p> {/* Appointment date and time */}
          <p>Doctor</p> {/* Doctor name */}
          <p>Fees</p> {/* Appointment fees */}
          <p>Actions</p> {/* Actions (cancel, status) */}
        </div>

        {/* Table rows: List all appointments */}
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-200  hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>{" "}
            {/* Serial number (hidden on small screens) */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              {/* Patient image */}
              <p>{item.userData.name}</p> {/* Patient name */}
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>{" "}
            {/* Patient age (hidden on small screens) */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>{" "}
            {/* Appointment date and time */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />{" "}
              {/* Doctor image */}
              <p>{item.docData.name}</p> {/* Doctor name */}
            </div>
            <p>
              {currency}
              {item.amount}
            </p>{" "}
            {/* Appointment fees */}
            {/* Appointment status or cancel action */}
            {
              item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p> // If cancelled
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p> // If completed
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              ) // Cancel button
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments; // Export the AllApointments component
