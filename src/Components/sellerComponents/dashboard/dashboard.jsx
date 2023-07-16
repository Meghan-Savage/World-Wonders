import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineShop,
  AiOutlineDashboard, // import an icon for dashboard
} from "react-icons/ai";
import Shipped from "../pages/orders/Shipped";
import Pending from "../pages/orders/Pending";
import Billing from "../pages/billing/Billing";
import Store from "../pages/store/Store";
import HomeSeller from "../../../pages/homeSeller/HomeSeller";

// Dummy components for the dashboard pages
// const Home = () => <div>Home</div>;
// const Orders = () => <div>Orders</div>;
// const Billing = () => <div>Billing</div>;
// const Store = () => <div>Store</div>;

function Dashboard() {
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);

  const toggleOrdersDropdown = () => {
    setIsOrdersDropdownOpen((prev) => !prev);
  };

  // Define the dashboard menu items
  const menuItems = [
    { name: "Home", path: "/seller", icon: AiOutlineHome },
    {
      name: "Orders",
      path: "/seller/dashboard/orders",
      icon: AiOutlineShopping,
    },
    {
      name: "Billing",
      path: "/seller/dashboard/billing",
      icon: AiOutlineCreditCard,
    },
    { name: "Store", path: "/seller/dashboard/store", icon: AiOutlineShop },
  ];

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-32 bg-gray-800 text-orange-200">
        <div className="p-4 flex items-center justify-center">
          {/* Use a different icon and text for dashboard */}
          <AiOutlineDashboard className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        {/* Add a horizontal line to separate the dashboard title and the menu items */}
        <hr className="border-orange-200" />
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.name === "Orders" ? (
                <div
                  className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
                  onClick={toggleOrdersDropdown}
                >
                  <item.icon className="h-6 w-6 mr-2" />
                  <span>{item.name}</span>
                  <svg
                    className={`h-4 w-4 ml-auto ${
                      isOrdersDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 12.95l.707.707L15.657 9l-.707-.707L10 13.243l-4.95-4.95L4.343 9l4.95 4.95z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center p-4 hover:bg-gray-700"
                >
                  <item.icon className="h-6 w-6 mr-2" />
                  <span>{item.name}</span>
                </Link>
              )}
              {isOrdersDropdownOpen && item.name === "Orders" && (
                <ul className="text-orange-200 rounded ml-6 mt-1 w-full">
                  <li className="flex items-center px-4 py-2 hover:bg-gray-600">
                    <Link to="/seller/dashboard/orders/pending">Pending</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-600">
                    <Link to="/seller/dashboard/orders/shipped">Shipped</Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        {/* Use Routes instead of Switch */}
        <Routes>
          <Route path="/seller" element={<HomeSeller />} />
          <Route path="/dashboard/orders/pending" element={<Pending />} />
          <Route path="/dashboard/orders/shipped" element={<Shipped />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/store" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
