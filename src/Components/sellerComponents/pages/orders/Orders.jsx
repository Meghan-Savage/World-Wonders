import React, { useContext, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext/OrderContext";
import Modal from "react-modal";
import axios from "axios";

function Orders() {
  const { orderInfo } = useContext(OrderContext);
  const [open, setOpen] = useState(false);
  const [singleOrder, setSingleOrder] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShipOrder = (orderId) => {
    const selectedOrder = orderInfo.find((order) => order.orderId === orderId);
    setSingleOrder(selectedOrder);
    handleOpen();
  };

  const onCancel = () => {
    handleClose();
  };

  const onConfirm = async (orderId) => {
    try {
      await axios.patch(
        `https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api/status/${orderId}`,
        { sts: "shipped" }
      );
    } catch (error) {
      console.log("Error updating order status:", error);
    }
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
                  key={item.id}
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
                onClick={() => handleShipOrder(order.orderId)}
                className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                Ship Order
              </button>
            </div>
            <Modal
              isOpen={open}
              onRequestClose={handleClose}
              contentLabel="Confirm Shipping"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  maxWidth: "600px",
                  maxHeight: "500px",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  background: "#fff",
                },
              }}
            >
              {singleOrder ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Confirm Shipping
                  </h1>
                  <p className="text-gray-600 mt-4">
                    You are about to ship the following item/order:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>
                      Item name: <strong>{singleOrder.items[0].title}</strong>
                    </li>
                    <li>
                      Order ID: <strong>{singleOrder.orderId}</strong>
                    </li>
                    <li>
                      Buyer name: <strong>{singleOrder.customer.name}</strong>
                    </li>
                    <li>
                      Shipping address:{" "}
                      <strong>
                        {singleOrder.customer.address.line1},{" "}
                        {singleOrder.customer.address.city},{" "}
                        {singleOrder.customer.address.state}{" "}
                        {singleOrder.customer.address.zip}
                      </strong>
                    </li>
                    <li>
                      Shipping method: <strong>Standard Delivery</strong>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    Please confirm that the information is correct and click the
                    "Ship" button to proceed.
                  </p>
                  <div className="buttons flex justify-end space-x-4 mt-6">
                    <button
                      onClick={onCancel}
                      className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onConfirm(singleOrder.orderId);
                        handleClose();
                      }}
                      className="px-4 py-2 bg-gray-900 text-orange-200 font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
                    >
                      Ship
                    </button>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
