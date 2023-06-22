import LandingPage from "../components/LandingPage";
import Banner from "../Components/Banner/Banner";

import React from "react";

const HomePage = () => {
  return (
    <div className="h-screen w-screen">
      <Banner />
      <LandingPage />
    </div>
  );
};

export default HomePage;
