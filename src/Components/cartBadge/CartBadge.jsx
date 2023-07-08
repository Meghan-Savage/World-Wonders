import React, { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { itemAmount } = useContext(CartContext);

  return (
    <div className="xl:text-4xl text-orange-300 container mx-auto flex items-center justify-end">
      <div className="flex items-center relative">
        <GiShoppingCart className="text-4xl" />
        <div
          className="ml-1 absolute -right-0 -bottom-2"
          style={{ top: "0.4rem", right: "-0.4rem" }}
        >
          <div className="bg-orange-300 text-[0.65rem] sm:text-[0.75rem] md:text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] w-[0.75rem] h-[0.75rem] text-white rounded-full flex justify-center items-center">
            {/* Content */}
            {itemAmount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
