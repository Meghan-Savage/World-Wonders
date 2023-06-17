import React, { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { itemAmount } = useContext(CartContext);

  return (
    <div className="xl:text-8xl text-orange-300 container mx-auto flex items-center justify-end">
      <Link to={'/cart'}>
        <div className="flex items-center relative">
          <GiShoppingCart className="text-8xl" />
          <div
            style={{ top: 10, right: -10 }}
            className="ml-2 absolute -right-2-bottom-0"
          >
            <div className="bg-orange-300 text-[18px] w-[36px] h-[36px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ShoppingCart;
