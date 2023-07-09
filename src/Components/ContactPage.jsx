import React, { useState } from "react";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic here
  };

  return (
    <div className="min-h-screen z-10 bg-gray-100 flex flex-col justify-center items-center bg-gradient-to-r from-orange-400 to-orange-100 ">
      <div className="max-w-2xl px-6 py-8 bg-gray-900 text-orange-200 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

        <p className="text-red-400 mb-4">
          Notice: This Contact Form is Not Monitored - Please Refrain from
          Sending Messages.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-4">
            <label htmlFor="fullName" className="text-lg">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full bg-gray-800 text-white rounded px-3 py-2 mt-1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-800 text-white rounded px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-lg">
              Message:
            </label>
            <textarea
              id="message"
              className="w-full bg-gray-800 text-white rounded px-3 py-2 mt-1"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="border-2 border-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-orange-300 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
