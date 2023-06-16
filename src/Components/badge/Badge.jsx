import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext.jsx";

function Badge() {
  const { itemAmount } = useContext(CartContext);
  console.log("itemsAmount", itemAmount);
  return (
    <div className="bg-orange-300 absolute -right-2-bottom-2 text-[18px] w-[36px] h-[36px] text-white rounded-full flex justify-center items-center">
      {itemAmount}
    </div>
  );
}

export default Badge;
