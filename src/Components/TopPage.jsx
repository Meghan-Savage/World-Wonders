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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

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
    setSelectedCountry(
      countries.find((country) => country.name === countryCode)
    );
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !(
          dropdownRef.current.contains(event.target) ||
          userMenuRef.current.contains(event.target)
        )
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto px-4 sm:px-8 relative">
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
          <div className="hidden sm:flex items-center">
            <select
              onChange={(e) => handleSelectCountry(e.target.value)}
              className="text-orange-200 bg-gray-900 border border-gray-400 rounded p-2 max-w-[30rem]"
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
                countryCode={selectedCountry.code}
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
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden text-orange-200 hover:text-gray-400 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6.5H20V8.5H4V6.5ZM4 12.5H20V14.5H4V12.5ZM4 18.5H20V20.5H4V18.5Z"
              />
            </svg>
          </button>
        </div>
        {showProfileDropdown && (
          <div
            ref={userMenuRef}
            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-400 rounded py-2 z-10"
          >
            <Link
              to="/profile"
              className="text-orange-200 hover:text-gray-400 block px-4 py-2"
            >
              Your Orders
            </Link>
            <Link
              to="/seller"
              className="text-orange-200 hover:text-gray-400 block px-4 py-2"
            >
              Your Store
            </Link>
          </div>
        )}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-gray-900 py-2">
            <Link
              to="/"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Products
            </Link>
            <select
              onChange={(e) => handleSelectCountry(e.target.value)}
              className="text-orange-200 bg-gray-900 border border-gray-400 rounded py-1 px-4 mt-2 ml-4 mr-2"
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
            <Link
              className="block px-4 py-2 text-orange-200 hover:text-gray-400 mt-2"
              to="/cart"
            >
              <ShoppingCart />
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-orange-200 hover:text-gray-400 mt-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="block px-4 py-2 text-orange-200 hover:text-gray-400 mt-2"
              >
                Login
              </Link>
            )}
          </div>
        )}
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
