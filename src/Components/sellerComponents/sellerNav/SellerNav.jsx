import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function SellerNav() {
  // Define the user information
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  };

  // Define a state for the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define a function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-900 text-orange-200 h-16 flex items-center justify-between px-4">
      <Link to="/" className="text-xl font-bold">
        World Wonders
      </Link>

      <div className="flex items-center space-x-4 mr-8">
        <AiOutlineBell className="h-6 w-6" />

        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <AiOutlineUser className="h-6 w-6" />
            <span className="ml-2">
              {user.firstName} {user.lastName}
            </span>
          </div>

          {isDropdownOpen && (
            <ul className="absolute right-0 bg-gray-800 text-orange-200  rounded shadow mt-2 py-2 w-48">
              <li className="flex items-center px-4 py-2 hover:bg-gray-700">
                <AiOutlineUser className="h-4 w-4 mr-2" />
                <Link to="/profile">Profile</Link>
              </li>
              <li className="flex items-center px-4 py-2 hover:bg-gray-700">
                <AiOutlineShoppingCart className="h-4 w-4 mr-2" />
                <Link to="/products">Products</Link>
              </li>
              <li className="flex items-center px-4 py-2 hover:bg-gray-700">
                <AiOutlineLogout className="h-4 w-4 mr-2" />
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerNav;
