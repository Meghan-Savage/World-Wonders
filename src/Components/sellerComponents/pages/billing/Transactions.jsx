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
        <p className="text-gray-700 mb-4">
          These are details about the last transactions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentItems.map((order) => (
            <>
              <div key={order.id} className="p-4 ">
                <h3 className="font-extrabold sm:hidden ">Payment From</h3>
                <h3 className="font-extrabold hidden sm:block">Payment From</h3>
                <p className="text-sm leading-6 font-medium text-gray-600">
                  {order.customer.email}
                </p>
                <hr className="my-4 border-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-extrabold sm:hidden">Amount</h3>
                <h3 className="font-extrabold hidden sm:block">Amount</h3>
                <p className="text-sm leading-6 font-medium font-bold text-green-500">
                  ${order.total}
                </p>
                <hr className="my-4 border-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-extrabold sm:hidden">Date</h3>
                <h3 className=" font-extrabold hidden sm:block">Date</h3>
                <p className="text-sm leading-6 font-medium text-gray-600">
                  {formatDate(order.created)}
                </p>
                <hr className="my-4 border-gray-300" />
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
              className=" px-2 py-3 bg-black hover:bg-orange-500 text-orange-500 hover:text-black rounded-md shadow-md transition duration-300 font-bold"
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              className=" px-2 py-3 bg-black hover:bg-orange-500 text-orange-500 hover:text-black rounded-md shadow-md transition duration-300 font-bold"
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
