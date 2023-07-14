import React, { useState, useEffect, useContext, createContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { FirebaseContext } from "../../firebase/provider.jsx";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "orders");

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(ordersCollectionRef);

      const ordersData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setOrders(ordersData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [ordersCollectionRef]);

  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
