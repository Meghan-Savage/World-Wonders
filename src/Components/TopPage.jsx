import React, { useContext } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import ShoppingCart from "./cartBadge/CartBadge.jsx";
import { SideBarContext } from "../context/SideBarContext/SideBarContext.jsx";

export default function Navbar() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);

  return (
    <nav className="bg-gray-900 py-4">
      <ul className="flex justify-between container mx-auto px-8">
        <li>
          <a href="#home" className="text-orange-200 hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="#contact" className="text-orange-200 hover:text-gray-400">
            Contact
          </a>
        </li>
        <li className="relative">
          <a
            href="javascript:void(0)"
            className="text-orange-200 hover:text-gray-400"
          >
            Countries
          </a>
          <div className="absolute z-10 bg-white hidden">
            <a
              href="#"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Country 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Country 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Country 3
            </a>
          </div>
        </li>
        <li className="navbar-right">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="border rounded-l px-2 py-1 pl-8 rounded-r"
              />
              <div className="absolute top-0 left-0 mt-2 ml-2">
                <FaSearch className="text-gray-600" />
              </div>
            </div>
          </div>
        </li>
        <li className="navbar-right relative">
          <div onClick={() => setIsOpen(!isOpen)}>
            <ShoppingCart className="cursor-pointer" />
          </div>
          <div className="absolute z-10 bg-white hidden">
            <a
              href="#"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-orange-200 hover:text-gray-400"
            >
              Sign Out
            </a>
          </div>
        </li>
        <li className="navbar-right flex items-center">
          <a href="#logout" className="text-orange-200 hover:text-gray-400">
            Logout
          </a>
          <FaSignOutAlt className="ml-1 text-orange-200" />
        </li>
        <li className="navbar-right flex items-center">
          <a
            href="#profile"
            className="text-orange-200 hover:text-gray-400 flex items-center"
          >
            <FaUser className="mr-1" />
            Profile
          </a>
          <FaSignInAlt className="ml-1 text-orange-200" />
        </li>
      </ul>
    </nav>
  );
}
