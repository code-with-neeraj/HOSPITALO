import { StrictMode } from "react"; // Import StrictMode for highlighting potential problems
import { createRoot } from "react-dom/client"; // Import createRoot for React 18 rendering
import "./index.css"; // Import global CSS styles
import App from "./App.jsx"; // Import main App component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import AdminContextProvider from "./context/AdminContext.jsx"; // Import AdminContextProvider for admin state
import DoctorContextProvider from "./context/DoctorContext.jsx"; // Import DoctorContextProvider for doctor state
import AppContextProvider from "./context/AppContext.jsx"; // Import AppContextProvider for app-wide utilities

// Mount the React app to the root DOM node
createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* Enables routing throughout the app */}
    <AdminContextProvider> {/* Provides admin context to the app */}
      <DoctorContextProvider> {/* Provides doctor context to the app */}
        <AppContextProvider> {/* Provides app-wide utilities context */}
          <App /> {/* Main application component */}
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
