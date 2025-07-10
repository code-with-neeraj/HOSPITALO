import { createContext } from "react"; // Import createContext from React

// Create AppContext for global app state
export const AppContext = createContext();

// AppContextProvider component: provides app-wide utilities and state
const AppContextProvider = (props) => {
  // currency: String for currency symbol (Rupee)
  const currency = "₹";

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

  // value: Object containing all utilities to provide via context
  const value = {
    calculateAge, // Function to calculate age
    slotDateFormat, // Function to format slot date
    currency, // Currency symbol
  };

  // Return the context provider with value
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider; // Export the provider component
