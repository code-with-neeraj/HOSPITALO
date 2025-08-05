import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, backendUrl } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpeciality, setFilterSpeciality] = useState("");

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const { data } = await axios.delete(backendUrl + `/api/admin/doctor/${doctorId}`, {
        headers: { aToken },
      });
      if (data.success) {
        toast.success("Doctor deleted successfully");
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete doctor");
    }
  };

  const openModal = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctorId(null);
  };

  // Filter doctors based on search term and speciality
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeciality = !filterSpeciality || doctor.speciality === filterSpeciality;
    return matchesSearch && matchesSpeciality;
  });

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      {/* Search and Filter Section */}
      <div className="mb-4 p-3 w-full  flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] text-sm sm:text-base"
        />
        <select
          value={filterSpeciality}
          onChange={(e) => setFilterSpeciality(e.target.value)}
          className=" w-1/2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] text-sm sm:text-base"
        >
          <option className="md:w-[30px]" value="">All Specialities</option>
          {[...new Set(doctors.map((doc) => doc.speciality))].map((speciality, index) => (
            <option key={index} value={speciality} className="text-sm sm:text-base ">
              {speciality}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {filteredDoctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm ">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
                <button
                  className="text-[1rem] group ml-20 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg active:scale-95"
                  onClick={() => openModal(item._id)}
                >
                  <FaRegTrashAlt className="text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this doctor? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleDeleteDoctor(selectedDoctorId);
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

export default DoctorsList;