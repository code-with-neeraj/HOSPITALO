// Import React library for building the component
import React from "react";
// Import Header component for the top section of the page
import Header from "../components/Header";
// Import SpecialityMenu component to show doctor specialities
import SpecialityMenu from "../components/SpecialityMenu";
// Import TopDoctors component to display top doctors
import TopDoctors from "../components/TopDoctors";
// Import Banner component for promotional or informational banner
import Banner from "../components/Banner";

// Define the Home functional component
const Home = () => {
  // Return the JSX to render the Home page
  return (
    // Main container div for the Home page
    <div>
      {/* Render the Header at the top */}
      <Header />
      {/* Render the SpecialityMenu below the header */}
      <SpecialityMenu />
      {/* Render the TopDoctors section */}
      <TopDoctors />
      {/* Render the Banner at the bottom */}
      <Banner />
    </div>
  );
};

// Export the Home component as default
export default Home;
