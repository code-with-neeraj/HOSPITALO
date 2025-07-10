import React from "react"; // Import React
import { useContext } from "react"; // Import useContext hook
import { DoctorContext } from "../../context/DoctorContext"; // Import DoctorContext for doctor state
import { useEffect } from "react"; // Import useEffect hook
import { assets } from "../../assets/assets"; // Import assets for images/icons
import { AppContext } from "../../context/AppContext"; // Import AppContext for utilities

// DoctorDashboard component: Displays doctor's dashboard with stats and latest bookings
const DoctorDashboard = () => {
  // Destructure doctor context values
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  // Destructure currency and slotDateFormat from app context
  const { currency, slotDateFormat } = useContext(AppContext);

  // useEffect: Fetch dashboard data when dToken changes
  useEffect(() => {
    if (dToken) {
      getDashData(); // Fetch dashboard data if doctor token exists
    }
  }, [dToken]);

  // Render dashboard only if dashData exists
  return (
    dashData && (
      <div className="m-5">
        {/* Stats cards section */}
        <div className="flex flex-wrap gap-3">
          {/* Earnings card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          {/* Appointments card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          {/* Patients card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest bookings section */}
        <div className="bg-white">
          {/* Latest bookings header */}
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200 ">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          {/* Latest bookings list */}
          <div className="pt-4 border border-gray-200  border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                {/* Patient image */}
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                {/* Patient name and slot date */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {/* Appointment status or actions */}
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p> // If cancelled
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium">
                    Completed
                  </p> // If completed
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
      </div>
    )
  );
};

export default DoctorDashboard; // Export the DoctorDashboard component
