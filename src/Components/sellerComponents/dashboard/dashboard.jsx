import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineShop,
  AiOutlineDashboard, // import an icon for dashboard
} from "react-icons/ai";

// Dummy components for the dashboard pages
const Home = () => <div>Home</div>;
const Orders = () => <div>Orders</div>;
const Billing = () => <div>Billing</div>;
const Store = () => <div>Store</div>;

function Dashboard() {
  // Define the dashboard menu items
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: AiOutlineHome },
    { name: "Orders", path: "/dashboard/orders", icon: AiOutlineShopping },
    { name: "Billing", path: "/dashboard/billing", icon: AiOutlineCreditCard },
    { name: "Store", path: "/dashboard/store", icon: AiOutlineShop },
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
      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        {/* Use Routes instead of Switch */}
        <Routes>
          {/* Use element prop instead of children */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/store" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
