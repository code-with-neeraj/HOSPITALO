import React, { useContext } from "react"; // Import React and useContext
import Login from "./pages/Login"; // Import Login component
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import { AdminContext } from "./context/AdminContext"; // Import AdminContext for admin state
import Navbar from "./components/Navbar"; // Import Navbar component
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import { Route, Routes } from "react-router-dom"; // Import Route and Routes for routing
import Dashboard from "./pages/Admin/Dashboard"; // Import Admin Dashboard
import AllApointments from "./pages/Admin/AllApointments"; // Import All Appointments page
import AddDoctor from "./pages/Admin/AddDoctor"; // Import Add Doctor page
import DoctorsList from "./pages/Admin/DoctorsList"; // Import Doctors List page
import { DoctorContext } from "./context/DoctorContext"; // Import DoctorContext for doctor state
import DoctorDashboard from "./pages/Doctor/DoctorDashboard"; // Import Doctor Dashboard
import DoctorAppointments from "./pages/Doctor/DoctorAppointments"; // Import Doctor Appointments page
import DoctorProfile from "./pages/Doctor/DoctorProfile"; // Import Doctor Profile page

// App component: Main entry point for the application
const App = () => {
  // Destructure aToken from AdminContext (admin authentication token)
  const { aToken } = useContext(AdminContext);
  // Destructure dToken from DoctorContext (doctor authentication token)
  const { dToken } = useContext(DoctorContext);

  // If user is logged in (admin or doctor)
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      {/* Toast notifications container */}
      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Top navigation bar */}
      <Navbar />
      <div className="flex items-start">
        {/* Sidebar navigation */}
        <Sidebar />
        {/* Application routes */}
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} /> {/* Empty route for root */}
          <Route path="/admin-dashboard" element={<Dashboard />} />{" "}
          {/* Admin dashboard */}
          <Route path="/all-appointments" element={<AllApointments />} />{" "}
          {/* All appointments */}
          <Route path="/add-doctor" element={<AddDoctor />} />{" "}
          {/* Add doctor */}
          <Route path="/doctor-list" element={<DoctorsList />} />{" "}
          {/* Doctors list */}
          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />{" "}
          {/* Doctor dashboard */}
          <Route
            path="/doctor-appointments"
            element={<DoctorAppointments />}
          />{" "}
          {/* Doctor appointments */}
          <Route path="/doctor-profile" element={<DoctorProfile />} />{" "}
          {/* Doctor profile */}
        </Routes>
      </div>
    </div>
  ) : (
    // If user is not logged in, show login page
    <>
      <Login />
      {/* Toast notifications container for login page */}
      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App; // Export the App component
