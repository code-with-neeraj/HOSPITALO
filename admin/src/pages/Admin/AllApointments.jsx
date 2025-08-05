import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, backendUrl } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/admin/delete-appointment/${appointmentId}`, {
        headers: { aToken },
      });
      if (data.success) {
        toast.success("Appointment deleted successfully");
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete appointment");
    }
  };

  const openModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointmentId(null);
  };

  // Filter appointments based on search term (patient name or doctor name) and date
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesPatientName = appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctorName = appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || appointment.slotDate === filterDate;
    return (matchesPatientName || matchesDoctorName) && matchesDate;
  });

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      {/* Search and Filter Section */}
      <div className="mb-4 m-2  flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by patient name or doctor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f6FFF]"
        />
       
      </div>

      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header row with 8 columns including Delete */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] py-3 px-6 border-b border-gray-200 gap-2 font-medium text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
          <p>Delete</p>
        </div>

        {filteredAppointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-200 hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>
              {currency}
              {item.amount}
            </p>

            {/* Action Status */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel"
              />
            )}

            {/* Delete Button */}
            <button
              className="group p-2 text-[1rem] text-red-500 transition-all active:scale-95"
              onClick={() => openModal(item._id)}
            >
              <FaRegTrashAlt className="text-red-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this appointment? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleDeleteAppointment(selectedAppointmentId);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApointments;