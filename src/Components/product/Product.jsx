import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill} from 'react-icons/bs'
import "./Product.css"

function Product({ product }) {

  const {id, images, description, product, price, video} = product;
  return <div>
    <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-xl'>
        <div className='w-full h-full flex justify-center items-center'>
            {/*image*/}
            <Link to={`/product/${id}`}>
            <div className='w-[200px] mx-auto flex justify-center items-center' >
                <img className='max-h-[160px] group-hover:scale-150 transition duration-300' src={images} alt="" />
            </div>
            </Link>
            {/*button*/}
            <div className='absolute bottom-0 right-0 p-2 flex items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                <button className='font-normal hover:font-bold'>Add to cart</button>
            </div>
        </div>
    </div>
    {/* category & title & price */}
    <div>
        <div className='text-sm capitalize text-gray-500 mb-1'>{description}</div>
            <h2 className='font-semibold mb-1'>{product}</h2>
        <div className='font-semibold'>${price}</div>
    </div>
  </div>
  
}

export default Product;