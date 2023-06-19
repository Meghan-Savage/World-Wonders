import React, { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { itemAmount } = useContext(CartContext);

  return (
    <div className="xl:text-4xl text-orange-300 container mx-auto flex items-center justify-end">
      <div className="flex items-center relative">
        <GiShoppingCart className="text-6xl" />
        <div
          className="ml-1 absolute -right-2 -bottom-0"
          style={{ top: "0.4rem", right: "-0.4rem" }}
        >
          <div className="bg-orange-300 text-[0.65rem] sm:text-[0.75rem] md:text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] w-[1.5rem] h-[1.5rem] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
