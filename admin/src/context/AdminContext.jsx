import { createContext, useState } from "react"; // React context and state management
import axios from "axios"; // For making HTTP requests
import { toast } from "react-toastify"; // For showing toast notifications

// Create AdminContext for global admin state
export const AdminContext = createContext();

// AdminContextProvider component: provides admin-related state and functions
const AdminContextProvider = (props) => {
  // aToken: Admin authentication token, setAToken: function to update aToken
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  // doctors: List of all doctors, setDoctors: function to update doctors
  const [doctors, setDoctors] = useState([]);
  // appointments: List of all appointments, setAppointments: function to update appointments
  const [appointments, setAppointments] = useState([]);
  // dashData: Dashboard data, setDashData: function to update dashData
  const [dashData, setDashData] = useState(false);

  // backendUrl: Base URL for backend API
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // getAllDoctors: Fetches all doctors from backend and updates state
  const getAllDoctors = async () => {
    try {
      // Make POST request to fetch all doctors
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors); // Update doctors state
        console.log(data.doctors);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    }
  };

  // changeAvailability: Changes availability status of a doctor
  const changeAvailability = async (docId) => {
    try {
      // Make POST request to change doctor availability
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message); // Show success toast
        getAllDoctors(); // Refresh doctors list
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    }
  };

  // getAllAppointments: Fetches all appointments from backend and updates state
  const getAllAppointments = async () => {
    try {
      // Make GET request to fetch all appointments
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments); // Update appointments state
        console.log(data.appointments);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    }
  };

  // cancelAppointment: Cancels an appointment by ID
  const cancelAppointment = async (appointmentId) => {
    try {
      // Make POST request to cancel appointment
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message); // Show success toast
        getAllAppointments(); // Refresh appointments list
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    }
  };

  // getDashData: Fetches dashboard data for admin
  const getDashData = async () => {
    try {
      // Make GET request to fetch dashboard data
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData); // Update dashData state
        console.log(data.dashData);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    }
  };

  // value: Object containing all state and functions to provide via context
  const value = {
    aToken,
    setAToken, // Admin token and setter
    backendUrl,
    doctors, // Backend URL and doctors list
    getAllDoctors,
    changeAvailability, // Functions for doctors
    appointments,
    setAppointments, // Appointments list and setter
    getAllAppointments, // Function to fetch appointments
    cancelAppointment, // Function to cancel appointment
    dashData,
    getDashData, // Dashboard data and fetch function
  };

  // Return the context provider with value
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider; // Export the provider component
