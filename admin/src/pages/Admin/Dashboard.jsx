import React from "react"; // Import React
import { AdminContext } from "../../context/AdminContext"; // Import AdminContext for admin state
import { useEffect } from "react"; // Import useEffect hook
import { useContext } from "react"; // Import useContext hook
import { assets } from "../../assets/assets"; // Import assets for images/icons
import { AppContext } from "../../context/AppContext"; // Import AppContext for utilities

// Dashboard component: Displays admin dashboard with stats and latest bookings
const Dashboard = () => {
  // Destructure admin context values
  const { aToken, cancelAppointment, dashData, getDashData } =
    useContext(AdminContext);
  // Destructure slotDateFormat from app context
  const { slotDateFormat } = useContext(AppContext);

  // useEffect: Fetch dashboard data when aToken changes
  useEffect(() => {
    if (aToken) {
      getDashData(); // Fetch dashboard data if admin token exists
    }
  }, [aToken]);

  // Render dashboard only if dashData exists
  return (
    dashData && (
      <div className="m-5">
        {/* Stats cards section */}
        <div className="flex flex-wrap gap-3">
          {/* Doctors count card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          {/* Appointments count card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Patients count card */}
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
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          {/* Latest bookings list */}
          <div className="pt-4 border border-gray-200 border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                {/* Doctor image */}
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                {/* Doctor name and slot date */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {/* Appointment status or cancel action */}
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard; // Export the Dashboard component
