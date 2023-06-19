import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from './Home.jsx';

import Products from "./pages/allProducts/AllProducts.jsx";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<LoginForm />} />
      <Route path="/signup" element={<RegistrationForm />} />
    </Routes>
  );
}

export default App;


