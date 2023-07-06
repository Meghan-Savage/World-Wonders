import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
import CheckoutForm from "./Components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NPWL7DwzLlcdwuQkg39TBWtYi5q7OKls4iYv804iRG0mia75vcvF8BJTP2isZtjC0DG5H4IZjGyrYbnKASlZGvK00RCCaDLqQ"
);
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
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <SideBar />
      <BottomPage />
    </>
  );
}

export default App;
