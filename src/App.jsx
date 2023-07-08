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
import BottomPage from "./components/BottomPage.jsx";
import TopPage from "./Components/TopPage";
import UserDropdown from "./Components/UserDropdown";
import ContactPage from "./Components/ContactPage";

function App() {
  return (
    <>
      <TopPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/admin-products" element={<AdminShowProducts />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/footer" element={<BottomPage />} />
        <Route path="/navbar" element={<TopPage />} />
        <Route path="/user" element={<UserDropdown />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <SideBar />
      <BottomPage />
    </>
  );
}

export default App;
