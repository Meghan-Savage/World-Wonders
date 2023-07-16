import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import OrderSuccess from "./pages/orderSucess/OrderSucess";
import Terms from "./Components/Terms";
import AboutUs from "./Components/AboutUs.jsx";
import HomeSeller from "./pages/homeSeller/HomeSeller";

function App() {
  const location = useLocation();
  const isSellerPage = location.pathname.startsWith("/seller");

  return (
    <div className="App">
      {!isSellerPage && <TopPage />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:country" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/admin-products" element={<AdminShowProducts />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/user" element={<UserDropdown />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/seller/*" element={<HomeSeller />} />
      </Routes>
      <SideBar />
      <BottomPage />
    </div>
  );
}

export default App;
