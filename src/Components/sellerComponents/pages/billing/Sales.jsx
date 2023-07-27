import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../../../firebase/provider";
import { auth } from "../../../../firebase/provider";

function Sales() {
  const { db } = useContext(FirebaseContext);
  const ordersCollectionRef = collection(db, "orders");
  const [orders, setOrders] = useState([]);
  console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth.currentUser) {
          console.log("User not logged in.");
          return;
        }

        const sellerId = auth.currentUser.uid;
        console.log("Current user ID:", sellerId);

        const q = query(ordersCollectionRef, where("sellerId", "==", sellerId));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setOrders(ordersData);
        console.log("ordersData", ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [auth.currentUser]);

  const totalOrderItems = orders.length;
  const totalRevenue = orders.reduce((total, order) => {
    return total + parseFloat(order.total);
  }, 0);
  const averageOrderValue = totalRevenue / totalOrderItems;

  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
      <div className="sm:flex sm:space-x-4">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-sm leading-6 font-medium text-gray-700">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-black">
                  {" "}
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-sm leading-6 font-medium text-gray-700">
                  Total Order Items
                </h3>
                <p className="text-3xl font-bold text-black">
                  {totalOrderItems}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-sm leading-6 font-medium text-gray-700">
                  Avg. Order Value
                </h3>
                <p className="text-3xl font-bold text-black">
                  {" "}
                  ${averageOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
