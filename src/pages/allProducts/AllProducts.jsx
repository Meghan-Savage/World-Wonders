import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext/ProductContext.jsx";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import Product from "../../Components/product/Product.jsx";

export const MissingProducts = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/create-product");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[25.09rem] mx-auto w-screen bg-white">
      <h2 className="text-2xl mb-4 font-bold">No Products Found</h2>
      <p className="mb-8 text-gray-600">Please add a product to sell</p>
      <button
        className="
      w-[20rem]
        font-semibold
        
        border-2
        border-gray-800
        hover:text-gray-800
        rounded-md
        hover:bg-orange-300
        bg-gray-800
        text-white"
        onClick={navigateHandler}
      >
        ADD PRODUCT
      </button>
    </div>
  );
};

const Products = () => {
  const { products } = useContext(ProductContext);
  const { country } = useParams();

  const filteredProducts = country
    ? products.filter(
        (product) => product.country.toLowerCase() === country.toLowerCase()
      )
    : products;

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2rem] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}

            {filteredProducts.length < 1 && <MissingProducts />}
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
};

export default Products;
