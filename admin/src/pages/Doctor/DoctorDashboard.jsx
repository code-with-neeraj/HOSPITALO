import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // ✅ Load dashboard data properly with async handling
  useEffect(() => {
    const fetchData = async () => {
      if (dToken) {
        setLoading(true);
        await getDashData();
        setLoading(false);
      }
    };
    fetchData();
  }, [dToken]);

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <span className="w-12 h-12 border-4 border-[#5f6FFF] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  // ✅ If data exists
  return (
    dashData && (
      <div className="m-5">
        {/* Stats cards */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings || 0}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments || 0}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients || 0}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest bookings */}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          <div className="pt-4 border border-gray-200 border-t-0">
            {dashData.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.userData?.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.userData?.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-400">
                No recent bookings found.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
