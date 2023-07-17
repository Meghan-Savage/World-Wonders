import React, { useState } from "react";
import axios from "axios";

const ShippingFrom = () => {
  const [data, setData] = useState({
    name: "",
    company: "",
    street1: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api/shippingFrom",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Sender Details</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange}
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block font-bold mb-2">
            Company:
          </label>
          <input
            type="text"
            value={data.company}
            onChange={handleChange}
            id="company"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street1" className="block font-bold mb-2">
            Street Address:
          </label>
          <input
            type="text"
            value={data.street1}
            onChange={handleChange}
            id="street1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-bold mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={data.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block font-bold mb-2">
            Province:
          </label>
          <input
            type="text"
            id="province"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block font-bold mb-2">
            Postal Code:
          </label>
          <input
            type="text"
            value={data.postalCode}
            onChange={handleChange}
            id="postalCode"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block font-bold mb-2">
            Country:
          </label>
          <input
            type="text"
            value={data.country}
            onChange={handleChange}
            id="country"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-bold mb-2">
            Phone:
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={handleChange}
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange}
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShippingFrom;
