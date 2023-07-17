import React, { useState } from "react";

function Shipped() {
  const [carrier, setCarrier] = useState("UPS");

  function handleOptionChange(event) {
    const { name, value } = event.target;
    if (name === "signature") {
      setSignature((prevValue) => !prevValue);
    } else if (name === "returnLabel") {
      setReturnLabel((prevValue) => !prevValue);
    } else if (name === "carrier") {
      setCarrier(value);
    }
  }

  function handleLabelPurchase() {
    // Handle label purchase logic here
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t">
        <h1 className="text-xl font-bold text-white">Shipping Label</h1>
        <p className="text-sm font-medium text-white">Order #12345</p>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Item row */}
        <div className="col-span-2">
          <label htmlFor="item" className="block text-sm font-medium">
            Item
          </label>
          <input
            type="text"
            id="item"
            name="item"
            value="Sample Item"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        {/* Address row */}
        <div className="col-span-2">
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value="123 Street, City, State, Postal Code"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        {/* Package details row */}
        <div className="col-span-2">
          <label htmlFor="package" className="block text-sm font-medium">
            Package Details
          </label>
          <input
            type="text"
            id="package"
            name="package"
            value="10 x 8 x 5 in, 2 lbs"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        {/* Shipment date row */}
        <div className="col-span-1">
          <label htmlFor="date" className="block text-sm font-medium">
            Shipment Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value="2023-07-16"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
        {/* Payment method row */}
        <div className="col-span-1">
          <label htmlFor="payment" className="block text-sm font-medium">
            Payment Method
          </label>
          <input
            type="text"
            id="payment"
            name="payment"
            value="Credit Card"
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        {/* Shipping options row */}

        {/* Carrier rates row */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-medium">Carrier Rates</p>
          <div className="flex items-center">
            <input
              type="radio"
              id="ups"
              name="carrier"
              value="UPS"
              checked={carrier === "UPS"}
              onChange={handleOptionChange}
              className="border border-gray-300 rounded mr-2"
            />
            <label htmlFor="ups" className="text-sm font-medium mr-4">
              UPS
            </label>
            <input
              type="radio"
              id="canadaPost"
              name="carrier"
              value="Canada Post"
              checked={carrier === "Canada Post"}
              onChange={handleOptionChange}
              className="border border-gray-300 rounded mr-2"
            />
            <label htmlFor="canadaPost" className="text-sm font-medium">
              Canada Post
            </label>
          </div>
        </div>
        {/* Buy label button */}
        <button
          onClick={handleLabelPurchase}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full"
        >
          Buy Label
        </button>
      </div>
    </div>
  );
}

export default Shipped;
