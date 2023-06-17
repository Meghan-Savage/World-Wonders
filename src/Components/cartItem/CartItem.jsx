import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../../context/CartContext/CartContext.jsx";

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);
  const { id, title, images, description, price, amount } = item;
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/*image*/}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={images} />
        </Link>
        <div className="flex flex-col">
          {/*title and remove icon*/}
          <div className="flex justify-between w-full mb-2">
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/product/${id}`}
            >
              {title}
            </Link>
            {/*remove icon*/}
            <div
              onClick={() => removeFromCart(id)}
              className="ml-16 text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-6 h-[72px] text-sm">
            {/*Qty*/}
            <div className="flex flex-1 max-w-[100px] items-center h-full text-primary font-medium">
              {/*minus icon*/}
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <IoMdRemove />
              </div>
              {/*amount*/}
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              {/*plus icon*/}
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <IoMdAdd />
              </div>
            </div>
            {/* item price*/}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              ${price}
            </div>
            {/* final price*/}

            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              ${`${parseFloat(price * amount).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
