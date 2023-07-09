import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import countryList from "country-list";
import ReactCountryFlag from "react-country-flag";
import LoginForm from "./LoginForm";
import { auth } from "../firebase/provider";
import { signOut, onAuthStateChanged } from "firebase/auth";
import ShoppingCart from "./cartBadge/CartBadge";

const countries = countryList.getData();

const Navbar = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setLoggedIn(false);
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectCountry = (countryCode) => {
    navigate(`/products/${countryCode}`);
    setSelectedCountry(countryCode);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        setShowProfileDropdown(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePostProduct = () => {
    // Navigate to the CreateProduct component
    navigate("/create-product");
  };

  return (
    <nav className="bg-gray-900 py-4">
      <ul className="flex justify-between container mx-auto px-8">
        <li>
          <Link
            to="/"
            className="text-orange-200 hover:text-gray-400 block sm:inline-block"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="text-orange-200 hover:text-gray-400 block sm:inline-block"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-orange-200 hover:text-gray-400 block sm:inline-block"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            className="text-orange-200 hover:text-gray-400 block sm:inline-block"
          >
            About Us
          </Link>
        </li>
        <li className="flex items-center">
          <select
            onChange={(e) => handleSelectCountry(e.target.value)}
            className="text-orange-200 bg-gray-900 border border-gray-400 rounded py-1 px-2"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {selectedCountry && (
            <ReactCountryFlag
              countryCode={selectedCountry}
              svg
              className="ml-2 w-8 h-8"
            />
          )}
        </li>
        <li>
          <Link
            className="text-orange-200 hover:text-gray-400 block sm:inline-block"
            to="/cart"
          >
            <ShoppingCart />
          </Link>
        </li>
        <li className="relative">
          {isLoggedIn && (
            <button
              onClick={toggleProfileDropdown}
              className="text-orange-200 hover:text-gray-400 block sm:inline-block"
            >
              {userEmail}
              <svg
                className={`${
                  showProfileDropdown ? "transform rotate-180" : ""
                } inline-block ml-1 h-4 w-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                ref={dropdownRef}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-orange-200 hover:text-gray-400 block sm:inline-block"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={toggleLoginForm}
              className="text-orange-200 hover:text-gray-400 block sm:inline-block"
            >
              Login
            </button>
          )}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-400 rounded py-2 z-10">
              <button
                onClick={() => navigate("/cart")}
                className="text-orange-200 hover:text-gray-400 block px-4 py-2"
              >
                Your Orders
              </button>
              <button
                onClick={handlePostProduct}
                className="text-orange-200 hover:text-gray-400 block px-4 py-2"
              >
                Upload Products
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-orange-200 hover:text-gray-400 block px-4 py-2"
              >
                Order Shipping
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-orange-200 hover:text-gray-400 block px-4 py-2"
              >
                Order Management
              </button>
            </div>
          )}
        </li>
      </ul>

      {showLoginForm && !isLoggedIn && (
        <div className="container mx-auto px-8 mt-4">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
