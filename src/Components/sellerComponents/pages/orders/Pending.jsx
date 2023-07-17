import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../../context/OrderContext/OrderContext";

function Pending() {
  const { orderInfo } = useContext(OrderContext);
  const navigate = useNavigate();

  const handleShipOrder = () => {
    navigate("/seller/dashboard/orders/shipped");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Pending Orders</h1>
      <div className="mt-4">
        {orderInfo.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Order #{order.orderId}
                </p>
                <p className="text-sm text-gray-500">{order.date}</p>
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
                      <p className="text-sm text-gray-500">
                        {item.price} | Qt: {item.amount}
                      </p>
                    </div>
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
              <button
                onClick={handleShipOrder}
                className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
              >
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
