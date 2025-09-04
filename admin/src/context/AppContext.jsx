import { createContext, useEffect } from "react";
import axios from "axios";

// Create AppContext for global app state
export const AppContext = createContext();

// AppContextProvider component: provides app-wide utilities and state
const AppContextProvider = (props) => {
  const currency = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // calculateAge: Calculates age from date of birth (dob)
  const calculateAge = (dob) => {
    const today = new Date(); // Current date
    const birtDate = new Date(dob); // Date of birth

    // Calculate year difference
    let age = today.getFullYear() - birtDate.getFullYear();
    return age; // Return calculated age
  };

  // months: Array of month abbreviations (1-based index)
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // slotDateFormat: Formats slot date string (e.g. '25_06_2025') to '25 Jun 2025'
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_"); // Split date string by '_'
    // Format as 'DD MMM YYYY'
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // register axios interceptor to handle 401 (token expired)
  useEffect(() => {
    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // clear stored admin/doctor tokens and reload to show login
          localStorage.removeItem("aToken");
          localStorage.removeItem("dToken");
          // optional: clear any in-memory token state via events or reload
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // value: Object containing all utilities to provide via context
  const value = {
    backendUrl,
    calculateAge,
    slotDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;