import { createContext, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";

// Create AdminContext for global admin state
export const AdminContext = createContext();

// AdminContextProvider component: provides admin-related state and functions
const AdminContextProvider = (props) => {

   // backendUrl: Base URL for backend API
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

 

  // getAllDoctors: Fetches all doctors from backend and updates state
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message); 
    }
  };

  // changeAvailability: Changes availability status of a doctor
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // getAllAppointments: Fetches all appointments from backend and updates state
  const getAllAppointments = async () => {
    try {
      
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments); 
        console.log(data.appointments);
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error(error.message); 
    }
  };

  // cancelAppointment: Cancels an appointment by ID
  const cancelAppointment = async (appointmentId) => {
    try {
     
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments(); 
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // getDashData: Fetches dashboard data for admin
  const getDashData = async () => {
    try {
     
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error(error.message); 
    }
  };

  // value: Object containing all state and functions to provide via context
  const value = {
    aToken,
    setAToken, 
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability, 
    appointments,
    setAppointments,
    getAllAppointments, 
    cancelAppointment, 
    dashData,
    getDashData, 
  };

 
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
