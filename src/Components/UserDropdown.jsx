import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserAccountDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the clicked element is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener for page refresh/close
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Add event listener for click anywhere on the document
    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Remove event listeners when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBeforeUnload = () => {
    // Clear the dropdown state before the page refreshes/closes
    setShowDropdown(false);
  };

  // logout logic
  const handleLogout = () => {
    // Clear any user-specific data from local storage, cookies, or other storage mechanisms
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    // Redirect the user to the HomePage
    navigate("/");

    setShowDropdown(false);
  };

  const handlePostProduct = () => {
    // Navigate to the CreateProduct component
    navigate("/create-product");

    setShowDropdown(false);
  };

  const handleLogin = () => {
    // Navigate to the Signin component
    navigate("/signin");

    setShowDropdown(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-orange-200 hover:text-gray-400 focus:outline-none"
      >
        <FaUser className="mr-1" style={{ fontSize: "24px" }} />
        <span className="hidden sm:inline">Profile</span>
        <FaCaretDown className="text-xs ml-1" />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-gray-200 border rounded border-gray-800 w-60">
          <button
            onClick={handleLogin}
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Login or Sign up
          </button>
          <button
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Your Orders
          </button>
          <button
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Order Shipping
          </button>
          <button
            onClick={handlePostProduct}
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Post Product(s)
          </button>
          <button
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Order Management
          </button>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;
