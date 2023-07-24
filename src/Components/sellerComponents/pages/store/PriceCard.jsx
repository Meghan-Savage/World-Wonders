import React, { useState } from "react";

const PriceCard = ({ price, setPrice, quantity, setQuantity }) => {
  return (
    <div>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold">Inventory and pricing</h1>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="price" className="text-md font-bold">
                Price
              </label>
              <p className="text-gray-500">
                Consider demand, competition, costs, and perceived value for
                pricing success.
              </p>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="mt-2 block w-full rounded-md border border-gray-100 resize-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-md font-bold">
                Quantity
              </label>
              <p className="text-gray-500">
                Balance demand, available inventory, and sales velocity for
                optimal quantity.
              </p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="mt-2 block w-full rounded-md border border-gray-100 resize-none shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
