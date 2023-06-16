import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import Badge from "../badge/Badge.jsx";

function CartItem() {
  return (
    <div className="xl:text-8xl text-orange-300 container flex mx-auto ">
      <div>
        <GiShoppingCart className="" />
      </div>
      <div className="flex ml- my-2">
        <Badge />
      </div>
    </div>
  );
}

export default CartItem;
