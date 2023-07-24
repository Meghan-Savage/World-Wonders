import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineShop,
  AiOutlineDashboard,
} from "react-icons/ai";
import Orders from "../pages/orders/Orders";
import Billing from "../pages/billing/Billing";
import Store from "../pages/store/Store";
import HomeSeller from "../../../pages/homeSeller/HomeSeller";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex">
      {/* Collapsible Sidebar */}
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
            menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-4 hover:bg-gray-700"
                >
                  <item.icon className="h-6 w-6 mr-2" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Routes>
          <Route path="/seller" element={<HomeSeller />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/store" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
