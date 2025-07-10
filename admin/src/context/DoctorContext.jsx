import { useState } from "react"; // Import useState for state management
import { createContext } from "react"; // Import createContext for context API
import axios from "axios"; // Import axios for HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications

// Create DoctorContext for global doctor state
export const DoctorContext = createContext();

// DoctorContextProvider component: provides doctor-related state and functions
const DoctorContextProvider = (props) => {
  // backendUrl: Base URL for backend API
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // dToken: Doctor authentication token, setDToken: function to update dToken
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  // appointment: List of all appointments, setAppointment: function to update appointment
  const [appointment, setAppointment] = useState([]);
  // dashData: Dashboard data, setDashData: function to update dashData
  const [dashData, setDashData] = useState(false);
  // profileData: Doctor profile data, setProfileData: function to update profileData
  const [profileData, setProfileData] = useState(false);

  // getAppointment: Fetches all appointments for the doctor
  const getAppointment = async () => {
    try {
      // Make GET request to fetch all appointments
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointment(data.appointments); // Update appointment state
        console.log(data.appointments);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.message); // Show error toast
    }
  };

  // completeAppointment: Marks an appointment as complete
  const completeAppointment = async (appointmentId) => {
    try {
      // Make POST request to complete appointment
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message); // Show success toast
        getAppointment(); // Refresh appointments list
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.message); // Show error toast
    }
  };

  // cancelAppointment: Cancels an appointment by ID
  const cancelAppointment = async (appointmentId) => {
    try {
      // Make POST request to cancel appointment
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message); // Show success toast
        getAppointment(); // Refresh appointments list
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.message); // Show error toast
    }
  };

  // getDashData: Fetches dashboard data for doctor
  const getDashData = async () => {
    try {
      // Make GET request to fetch dashboard data
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData); // Update dashData state
        console.log(data.dashData);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.message); // Show error toast
    }
  };

  // getProfileData: Fetches profile data for doctor
  const getProfileData = async () => {
    try {
      // Make GET request to fetch profile data
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData); // Update profileData state
        console.log(data.profileData);
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error(error.message); // Show error toast
    }
  };

  // value: Object containing all state and functions to provide via context
  const value = {
    dToken, // Doctor token
    setDToken, // Setter for doctor token
    backendUrl, // Backend API URL
    appointment, // Appointments list
    setAppointment, // Setter for appointments
    getAppointment, // Function to fetch appointments
    completeAppointment, // Function to complete appointment
    cancelAppointment, // Function to cancel appointment
    dashData, // Dashboard data
    setDashData, // Setter for dashboard data
    getDashData, // Function to fetch dashboard data
    profileData, // Profile data
    setProfileData, // Setter for profile data
    getProfileData, // Function to fetch profile data
  };

  // Return the context provider with value
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider; // Export the provider component
