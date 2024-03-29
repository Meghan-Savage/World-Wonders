import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const BottomPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <footer>
      <div className="w-full bg-gray-900 text-gray-500 mx-auto px-10 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center justify-between bg-gray-900 ">
          <div className="flex items-center bg-gray-900 ">
            <Link
              to="/about-us"
              className={`text-orange-200 hover:text-gray-400 ml-10 mb-4 sm:mb-0 sm:ml-0 sm:mr-10 ${
                isMobileMenuOpen ? "hidden sm:block" : "block"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/terms"
              className={`text-orange-200 hover:text-gray-400 ml-10 mb-4 sm:mb-0 sm:ml-0 sm:mr-10 ${
                isMobileMenuOpen ? "hidden sm:block" : "block"
              }`}
            >
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center ">
            <span className="mx-4 text-gray-600">
              Copyright © 2023 World-Wonders Inc. All rights reserved. ® a
              registered trademark.
            </span>
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-orange-200 hover:text-gray-400 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine size={20} />
              ) : (
                <RiMenu3Line size={20} />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4">
            <Link
              to="/about"
              className="block text-orange-200 hover:text-gray-400 ml-10 mb-2"
            >
              About Us
            </Link>
            <Link
              to="/terms"
              className="block text-orange-200 hover:text-gray-400 ml-10 mb-2"
            >
              Terms of Use
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
};

export default BottomPage;
