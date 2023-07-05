import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="max-w-2xl px-6 py-8 bg-gray-900 text-orange-200 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="mb-4">
          <p className="text-lg">
            Phone Number:{" "}
            <span className="font-medium">Your Phone Number</span>
          </p>
          <p className="text-lg">
            Email Address:{" "}
            <Link
              to="mailto:youremail@example.com"
              className="font-medium hover:text-orange-300"
            >
              youremail@example.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
