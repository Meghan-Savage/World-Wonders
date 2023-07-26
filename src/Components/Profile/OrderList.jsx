import { useState } from "react";
import Modal from "../UI/Modal/Modal";

const OrderList = ({ onToggleModal, orders, user, showModal }) => {
  const userOrders = orders.filter(
    (order) => order.customer.email === user.email
  );

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onToggleModal();
  };

  return (
    <>
      <h1 className=" flex flex-col items-center text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-100">
        Order History
      </h1>
      {userOrders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-400 p-4 mb-4 rounded-md cursor-pointer"
          onClick={() => handleOrderClick(order)}
        >
          <h2 className="text-lg font-semibold mb-2">
            Order ID: {order.orderId}
          </h2>
          <p className="text-gray-600 mb-2">
            Created: {new Date(order.created).toLocaleString()}
          </p>
          <p>Amount: ${order.amount / 100}</p>
        </div>
      ))}

      {showModal && (
        <Modal onToggleModal={onToggleModal}>
          <div className="border border-gray-400 p-4 mb-4 rounded-md w-[40rem]">
            <h2 className="text-lg font-semibold mb-2">
              Order ID: {selectedOrder.orderId}
            </h2>
            <p className="text-gray-600 mb-2">
              Created: {new Date(selectedOrder.created).toLocaleString()}
            </p>
            <div className="border-t border-gray-400 my-2" />
            <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
            <p>Name: {selectedOrder.customer.name}</p>
            <p>Email: {selectedOrder.customer.email}</p>
            <p>Phone: {selectedOrder.customer.phone}</p>
            <p>Address: {selectedOrder.customer.address.line1}</p>
            <p>City: {selectedOrder.customer.address.city}</p>
            <p>State: {selectedOrder.customer.address.state}</p>
            <p>Postal Code: {selectedOrder.customer.address.postal_code}</p>
            <p>Country: {selectedOrder.customer.address.country}</p>
            <div className="border-t border-gray-400 my-2" />
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <p>Amount: ${selectedOrder.amount / 100}</p>
            <p>Payment Method: {selectedOrder.payment_method_types[0]}</p>
            <div className="border-t border-gray-400 my-2" />
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {selectedOrder.items.map((item, index) => (
              <div
                key={item.id}
                className={
                  selectedOrder.items.length - 1 != index
                    ? "flex items-center justify-between border-b border-gray-400"
                    : "flex items-center justify-between"
                }
              >
                <p className={"max-w-[20rem]"}>{item.title}</p>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end text-blue-500">
            <button onClick={onToggleModal}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderList;
