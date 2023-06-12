import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CreateProductForm from "./components/CreateProductForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-product" element={<CreateProductForm />} />
    </Routes>
  );
}

export default App;
