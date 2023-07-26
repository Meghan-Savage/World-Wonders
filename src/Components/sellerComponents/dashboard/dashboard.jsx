import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineShop,
  AiOutlineDashboard,
  AiOutlineDown,
} from "react-icons/ai";
import Orders from "../pages/orders/Orders";
import Billing from "../pages/billing/Billing";
import HomeSeller from "../../../pages/homeSeller/HomeSeller";
import PostListing from "../pages/store/PostListing";
import ViewListing from "../pages/store/ViewListing";
import EditListing from "../pages/store/EditListing";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isStoreDropdownOpen, setStoreDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
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
    {
      name: "Edit",
      path: "/seller/dashboard/edit-listing/:id",
    },

    { name: "Store", icon: AiOutlineShop, hasDropdown: true },
  ];

  const handleStoreDropdownToggle = () => {
    setStoreDropdownOpen(!isStoreDropdownOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const filteredMenuItems = menuItems.filter((item) => item.name !== "Edit");

  useEffect(() => {
    navigate("/seller/dashboard/orders");
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div
        className={`${
          isSidebarOpen ? "w-32" : "w-16"
        } bg-gray-800 text-orange-200 transition-all ease-in-out overflow-hidden`}
      >
        <div
          className="p-4 flex items-center justify-center cursor-pointer"
          onClick={handleSidebarToggle}
        >
          <AiOutlineDashboard className="h-8 w-8 mr-2" />
          {isSidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        </div>
        <hr className="border-orange-200" />
        <ul className="space-y-2">
          {isSidebarOpen &&
            filteredMenuItems.map((item) => (
              <li key={item.name}>
                {item.hasDropdown ? (
                  <div onClick={handleStoreDropdownToggle}>
                    <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                      <item.icon className="h-6 w-6 mr-2" />
                      <span>{item.name}</span>
                      <AiOutlineDown className="ml-auto h-5 w-5" />
                    </div>
                    {isStoreDropdownOpen && (
                      <ul className="pl-4">
                        <li>
                          <Link
                            to="/seller/dashboard/store/post-listings"
                            className="flex items-center p-2 hover:bg-gray-700"
                          >
                            <span>Post Listings</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/seller/dashboard/store/view-listings"
                            className="flex items-center p-2 hover:bg-gray-700"
                          >
                            <span>View Listings</span>
                          </Link>
                        </li>
                      </ul>
                    )}
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
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Routes>
          <Route path="dashboard/edit-listing/:id" element={<EditListing />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route
            path="/dashboard/store/post-listings"
            element={<PostListing />}
          />
          <Route
            path="/dashboard/store/view-listings"
            element={<ViewListing />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
