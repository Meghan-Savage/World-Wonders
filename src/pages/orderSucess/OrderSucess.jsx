import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const OrderSuccess = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate(); // import and use navigate

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("orderInfo", orderInfo);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api/orders?intentId=${sessionId}`
        );
        setOrderInfo(response.data);
        console.log(response.data);
        setIsModalOpen(true);
      } catch (error) {
        console.log("Error retrieving order information:", error);
      }
    };

    if (sessionId) {
      fetchOrderInfo();
    }
  }, [sessionId]);

  const date = new Date().toLocaleDateString();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/products"); // use navigate instead of history.push
  };

  // Define custom styles for the modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70%", // reduce the width to 80% of the screen
      height: "70%", // reduce the height to 80% of the screen
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen h-full flex items-center justify-center">
      {orderInfo && (
        <Modal
          isOpen={isModalOpen}
          contentLabel="Order Success Modal"
          style={customStyles} // apply the custom styles
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">
            Thank you for your order!
          </h1>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-600">Order Info</h2>
            <p className="text-sm text-gray-500 mt-2">
              Order Number: #{orderInfo.orderId}
            </p>
            <p className="text-sm text-gray-500 mt-2">Order Date: {date}</p>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-600">
              Shipping Address
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {orderInfo.customer.name}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {orderInfo.customer.address.line1}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {orderInfo.customer.address.city},{" "}
              {orderInfo.customer.address.state}{" "}
              {orderInfo.customer.address.postal_code}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {orderInfo.customer.address.country}
            </p>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-600">
              Ordered Items
            </h2>
            {orderInfo.items.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between mt-4"
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
                  <p className="text-sm font-medium text-gray-800">Quantity</p>
                  <p className="text-sm text-gray-500"> {item.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Continue Shopping
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderSuccess;
