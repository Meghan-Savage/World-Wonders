import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserAccountDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-orange-200 hover:text-gray-400 focus:outline-none"
      >
        <FaUser className="mr-1" />
        <FaCaretDown className="text-xs" />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 bg-gray-200 border rounded border-gray-800 w-60">
         
          <button
            onClick={() => console.log("My Profile clicked")}
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            My Profile
          </button>
          <button
            onClick={() => console.log("Edit Profile clicked")}
            className="block px-4 py-2 text-black hover:bg-orange-200 w-full text-left"
          >
            Edit Profile
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
