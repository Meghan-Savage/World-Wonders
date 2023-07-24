import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../../../firebase/provider";
import { auth } from "../../../../firebase/provider";

const Transactions = () => {
  const { db } = useContext(FirebaseContext);
  const ordersCollectionRef = collection(db, "orders");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextClick = () => {
    if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth.currentUser) {
          return;
        }

        const sellerId = auth.currentUser.uid;

        const q = query(ordersCollectionRef, where("sellerId", "==", sellerId));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [auth.currentUser]);

  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Recent Transactions</h1>
        <p className="text-gray-600 mb-4">
          These are details about the last transactions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentItems.map((order) => (
            <>
              <div key={order.id} className="p-4 ">
                <h3 className="font-extrabold sm:hidden ">Payment From</h3>
                <h3 className="font-extrabold hidden sm:block">Payment From</h3>
                <p className="text-sm leading-6 font-medium text-gray-400">
                  {order.customer.email}
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold sm:hidden">Amount</h3>
                <h3 className="font-extrabold hidden sm:block">Amount</h3>
                <p className="text-sm leading-6 font-medium text-[#85bb65]">
                  ${order.total}
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold sm:hidden">Date</h3>
                <h3 className=" font-extrabold hidden sm:block">Date</h3>
                <p className="text-sm leading-6 font-medium text-gray-400">
                  {formatDate(order.created)}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-row justify-between items-end mt-4">
          <p className="text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, orders.length)} of {orders.length}{" "}
            entries
          </p>
          <nav className="flex space-x-2">
            <button
              onClick={handlePreviousClick}
              className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
