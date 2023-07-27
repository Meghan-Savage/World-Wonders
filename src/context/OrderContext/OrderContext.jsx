import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../firebase/authentication";
import axios from "axios";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api/pending?sellerId=${user.uid}`
        );
        const orders = Object.values(response.data);
        setOrderInfo(orders);
      } catch (error) {
        console.log("Error retrieving order information:", error);
      }
    };

    if (user && user.uid) {
      fetchOrderInfo();
    }
  }, [user]);

  return (
    <OrderContext.Provider value={{ orderInfo }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
