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
        {itemAmount > 0 && (
          <div className="ml-1 absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
            <div className="bg-orange-300 text-black text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] w-[1.2rem] h-[1.2rem] rounded-full flex justify-center items-center">
              {/* Content */}
              {itemAmount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
