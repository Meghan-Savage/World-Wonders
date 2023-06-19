import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Products from "./pages/allProducts/AllProducts.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import SideBar from "./Components/sideBar/SideBar.jsx";
import ViewCart from "./pages/viewCart/ViewCart.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <SideBar />
    </>
  );
}

export default App;
