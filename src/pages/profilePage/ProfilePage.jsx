import React, { useContext, useEffect, useState } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import OrderList from "../../Components/Profile/OrderList";
import { FirebaseContext } from "../../firebase/provider";
import { AuthContext } from "../../firebase/authentication";
import { collection, getDocs } from "firebase/firestore";

const ProfilePage = ({ onToggleModal, showModal }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const snapshot = await getDocs(ordersRef);
      const ordersData = snapshot.docs.map((doc) => doc.data());

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log("orders", orders);
  return (
    <div className="h-screen">
      <OrderList
        onToggleModal={onToggleModal}
        orders={orders}
        user={user}
        showModal={showModal}
      />
    </div>
  );
};

export default ProfilePage;
