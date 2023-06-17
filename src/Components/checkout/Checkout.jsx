import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import CartItem from "../cartItem/CartItem";
import { FiTrash2 } from "react-icons/fi";

function Checkout() {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <div className="uppercase text-sm font-semibold">Shopping Cart (0)</div>
      <div>
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div>
        <div className="bg-pink-200 flex w-full justify-between items-center">
          {/*total*/}
          <div>
            <span>Total:</span>$ 1000
          </div>
          {/*clear icon cart*/}
          <div className="cursor-pointer py-4 bg-rose-500 text-white w-12 h-12 flex justify-center items-center text-xl">
            <FiTrash2 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
