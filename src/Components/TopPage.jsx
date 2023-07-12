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
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-orange-200 hover:text-gray-400 block sm:inline-block mr-16"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-orange-200 hover:text-gray-400 block sm:inline-block mr-4"
            >
              Products
            </Link>
          </div>
          <div className="flex items-center">
            <select
              onChange={(e) => handleSelectCountry(e.target.value)}
              className="text-orange-200 bg-gray-900 border border-gray-400 rounded py-1 px-16 mr-2"
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
          </div>
          <div className="flex items-center">
            <Link
              className="text-orange-200 hover:text-gray-400 mr-8"
              to="/cart"
            >
              <ShoppingCart />
            </Link>
            {isLoggedIn && (
              <button
                onClick={toggleProfileDropdown}
                className="text-orange-200 hover:text-gray-400 focus:outline-none"
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
                className="text-orange-200 hover:text-gray-400 ml-4"
              >
                Logout
              </button>
            ) : (
              <Link
              to="/signin"
              className="text-orange-200 hover:text-gray-400 ml-4"
            >
              Login
            </Link>
            )}
          </div>
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
            </div>
          )}
        </div>
        {showLoginForm && !isLoggedIn && (
          <div className="container mx-auto px-8 mt-4">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
