import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../../context/CartContext/CartContext.jsx";

function CartItem({ item }) {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  const { id, title, images, price, amount } = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={images} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          {/* Title and remove icon */}
          <div className="flex justify-between w-full mb-2">
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-black hover:underline"
              to={`/product/${id}`}
            >
              {title}
            </Link>
            {/* Remove icon */}
            <div
              onClick={() => removeFromCart(id)}
              className="ml-8 text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-4 h-[72px] text-sm">
            {/* Quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full text-black font-medium">
              {/* Minus icon */}
              <div
                onClick={() => decreaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove className="text-gray-500 hover:text-red-500 transition" />
              </div>
              {/* Amount */}
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              {/* Plus icon */}
              <div
                onClick={() => increaseAmount(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* Item price */}
            <div className="flex-1 flex justify-end items-center text-black font-medium">
              ${price}
            </div>
            {/* Final price */}
            <div className="flex-1 flex justify-end items-center text-black font-medium">
              ${`${(price * amount).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
