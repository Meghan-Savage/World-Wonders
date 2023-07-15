import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../firebase/authentication";

function Pending() {
  const [orderInfo, setOrderInfo] = useState([]);
  const { user } = useContext(AuthContext);

  console.log("orderInfo", orderInfo);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api/pending?sellerId=${user.uid}`
        );
        const orders = Object.values(response.data);
        setOrderInfo(orders);
        console.log(orders);
      } catch (error) {
        console.log("Error retrieving order information:", error);
      }
    };

    if (user && user.uid) {
      fetchOrderInfo();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Pending Orders</h1>
      <div className="mt-4">
        {orderInfo.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Order #{order.id}
                </p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-sm text-yellow-500">{order.sts}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-sm text-gray-800">{order.total}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Ordered Items
              </h2>
              {order.items.map((item) => (
                <div
                  key={item.id} // Use item.id as the key
                  className="flex items-center justify-between mt-2"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-16 w-16 rounded"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-800">
                      Quantity
                    </p>
                    <p className="text-sm text-gray-500">{item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Shipping Address
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {order.customer.name}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {order.customer.address.line1}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {order.customer.address.city}, {order.customer.address.state}{" "}
                {order.customer.address.zip}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {order.customer.address.country}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none">
                Ship Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pending;
