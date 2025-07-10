import React, { useContext, useEffect } from "react"; // Import React, useContext, useEffect
import { DoctorContext } from "../../context/DoctorContext"; // Import DoctorContext for doctor state
import { AppContext } from "../../context/AppContext"; // Import AppContext for utilities
import { assets } from "../../assets/assets"; // Import assets for images/icons

// DoctorAppointments component: Displays all appointments for the doctor
const DoctorAppointments = () => {
  // Destructure doctor context values
  const {
    dToken,
    appointment,
    getAppointment,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  // Destructure utility functions and currency from app context
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  // useEffect: Fetch all appointments when dToken changes
  useEffect(() => {
    if (dToken) {
      getAppointment(); // Fetch appointments if doctor token exists
    }
  }, [dToken]);

  // Render the appointments table
  return (
    <div className="w-full max-w-6xl m-5">
      {/* Page title */}
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      {/* Table container */}
      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Table header (hidden on small screens) */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200">
          <p>#</p> {/* Serial number */}
          <p>Patient</p> {/* Patient name */}
          <p>Payment</p> {/* Payment type */}
          <p>Age</p> {/* Patient age */}
          <p>Date & Time</p> {/* Appointment date and time */}
          <p>Fees</p> {/* Appointment fees */}
          <p>Action</p> {/* Actions (cancel, complete, status) */}
        </div>

        {/* Table rows: List all appointments (reversed for latest first) */}
        {appointment.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-200 hover:bg-gray-50"
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
              <p>{item.userData.name}</p> {/* Patient image and name */}
            </div>
            <div>
              <p className="text-xs inline border border-[#5f6FFF] px-2 rounded-full">
                {item.payment ? "Online" : "CASH"} {/* Payment type */}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>{" "}
            {/* Patient age (hidden on small screens) */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>{" "}
            {/* Appointment date and time */}
            <p>
              {currency} {item.amount}
            </p>{" "}
            {/* Appointment fees */}
            {/* Appointment status or actions */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p> // If cancelled
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p> // If completed
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />{" "}
                {/* Cancel button */}
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />{" "}
                {/* Complete button */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments; // Export the DoctorAppointments component
