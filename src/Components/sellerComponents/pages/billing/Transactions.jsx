import React from "react";

const Transactions = () => {
  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Recent Transactions</h1>
        <p className="text-gray-600 mb-4">
          These are details about the last transactions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4">
            <h3 className="font-extrabold sm:hidden">Payment From</h3>
            <h3 className="font-extrabold hidden sm:block">Payment From</h3>
            <p>Cell</p>
          </div>
          <div className="p-4">
            <h3 className="font-extrabold sm:hidden">Amount</h3>
            <h3 className="font-extrabold hidden sm:block">Amount</h3>
            <p>Cell</p>
          </div>
          <div className="p-4">
            <h3 className="font-extrabold sm:hidden">Date</h3>
            <h3 className=" font-extrabold hidden sm:block">Date</h3>
            <p>Cell</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end mt-4">
          {/* <p className="text-gray-600">Showing 1 to 3</p> */}
          <nav className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
