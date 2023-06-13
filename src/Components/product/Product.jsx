import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext/CartContext.jsx';
import { Link } from 'react-router-dom';

import './Product.css';

function Product({ product }) {

  const { id, image, description, title, price, video } = product;
  console.log('id', id)

  const {addToCart} = useContext(CartContext)

  return (
    <div key={id}>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-xl">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <Link to={`/product/${id}`}>
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover object-center group-hover:scale-150 transition duration-300"
                src={image}
                alt=""
              />
            </div>
          </Link>
          {/* button */}
          <div className="absolute bottom-0 right-0 p-2 flex items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button onClick={() => addToCart(product, id)} className="font-normal hover:font-bold text-white bg-orange-300 py-2 px-4 rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {/* category & title & price */}
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{description}</div>
        <h2 className="font-semibold mb-1">{title}</h2>
        <div className="font-semibold">${price}</div>
      </div>
    </div>
  );
}

export default Product;
