import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import countryList from "country-list";
import ReactCountryFlag from "react-country-flag";
import UserDropdown from "./UserDropdown";

const countries = countryList.getData();

const Navbar = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
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
        <li className="flex items-center space-x-2">
          <select
            onChange={(e) => handleSelectCountry(e.target.value)}
            className="text-orange-200 bg-gray-900 border border-gray-400 rounded py-1 px-2"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
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
            to="/cart"
            className="text-orange-200 hover:text-gray-400 flex items-center"
          >
            <FaShoppingCart className="mr-1" />
            Cart
          </Link>
        </li>
        <li className="flex items-center">
          <UserDropdown />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
