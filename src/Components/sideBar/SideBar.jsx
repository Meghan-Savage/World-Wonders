import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../cartItem/CartItem.jsx";
import { SideBarContext } from "../../context/SideBarContext/SideBarContext.jsx";
import { CartContext } from "../../context/CartContext/CartContext.jsx";

function SideBar() {
  const { isOpen, handleClose } = useContext(SideBarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-[45%] md:w-[30%] bg-white fixed top-0 h-full shadow-2xl transition-all duration-300 z-20 px-4 lg:px-[20px]`}
    >
      <div className="flex items-center justify-between py-3 border-b"></div>
      <div className="uppercase text-sm font-semibold">
        Shopping Bag ({itemAmount})
      </div>
      <div
        onClick={handleClose}
        className="cursor-pointer w-6 h-6 flex justify-center items-center"
      >
        <IoMdArrowForward className="text-xl" />
      </div>
      <div className="flex flex-col gap-y-2 h-[60vh] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-y-2 py-2 mt-2">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold text-xs">
            <span>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>

          <div
            onClick={clearCart}
            className="cursor-pointer py-2 text-red w-8 h-8 flex justify-center items-center text-sm"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to="/cart"
          className="bg-gray-200 flex p-2 justify-center items-center text-black w-full font-medium text-sm"
        >
          View Cart
        </Link>
        <Link
          to="/products"
          className="bg-orange-300 flex p-2 justify-center items-center text-white w-full font-medium text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
