import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Products from "./pages/allProducts/AllProducts.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CreateProductForm from "./components/CreateProductForm";
import AdminShowProducts from "./components/AdminShowProducts";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/add-product" element={<CreateProductForm />} />
      <Route path="/admin-products" element={<AdminShowProducts />} />
    </Routes>
  );
}

export default App;
