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
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{ marginTop: "-20vh" }}
      S
    >
      <h2 className="text-2xl mb-4 font-bold">No Products Found</h2>
      <p className="mb-8 text-gray-700">Please add a product to sell</p>
      <button
        className="
        bg-black hover:bg-orange-500 text-orange-500 hover:text-black py-2 px-4 rounded-md shadow-md transition duration-300 font-bold"
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
    <div className="bg-gradient-to-r from-orange-400 to-orange-100">
      <section className="py-16 flex">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[6rem] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}

            {filteredProducts.length < 1 && <MissingProducts />}
          </div>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Products;
