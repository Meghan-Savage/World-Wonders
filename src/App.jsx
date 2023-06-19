import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from './Home.jsx';

import Products from "./pages/allProducts/AllProducts.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import Home from "./Components/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path="/signup" element={<RegistrationForm />} />
      <Route path="/" element={<Home />} />
      
    </Routes>
  );
}

export default App;
