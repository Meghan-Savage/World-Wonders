import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/LandingPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
