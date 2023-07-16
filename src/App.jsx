import React, { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./pages/allProducts/AllProducts";
import ProductDetails from "./pages/productDetails/ProductDetails";
import SideBar from "./Components/sideBar/SideBar";
import ViewCart from "./pages/viewCart/ViewCart";
import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import AdminShowProducts from "./Components/AdminShowProducts";
import CreateProductForm from "./Components/CreateProductForm";
import HomePage from "./pages/HomePage";
import BottomPage from "./Components/BottomPage";
import TopPage from "./Components/TopPage";
import UserDropdown from "./Components/UserDropdown";
import OrderSuccess from "./pages/orderSucess/OrderSucess";
import Terms from "./Components/Terms";
import AboutUs from "./Components/AboutUs";
import HomeSeller from "./pages/homeSeller/HomeSeller";
import ProfilePage from "./pages/profilePage/ProfilePage";

function App() {
  const location = useLocation();
  const isSellerPage = location.pathname.startsWith("/seller");
  const [showModal, setShowModal] = useState(false);

  const handleModalToggler = () => {
    console.log("clicked");
    setShowModal((prev) => !prev);
  };

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
        <Route
          path="/profile"
          element={
            <ProfilePage
              onToggleModal={handleModalToggler}
              showModal={showModal}
            />
          }
        />
      </Routes>
      <SideBar />
      <BottomPage />
    </div>
  );
}

export default App;
