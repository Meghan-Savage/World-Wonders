import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Products from "./pages/allProducts/AllProducts.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import SideBar from "./Components/sideBar/SideBar.jsx";
import ViewCart from "./pages/viewCart/ViewCart.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import RegistrationForm from "./Components/RegistrationForm.jsx";
import AdminShowProducts from "./components/AdminShowProducts";
import CreateProductForm from "./components/CreateProductForm";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/admin-products" element={<AdminShowProducts />} />
        <Route path="/create-product" element={<CreateProductForm />} />
      </Routes>
      <SideBar />
    </>
  );
}

export default App;
