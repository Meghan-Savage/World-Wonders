import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext/ProductContext.jsx";
import { Outlet } from "react-router-dom";
import Product from "../../Components/product/Product.jsx";
import "./AllProducts.css";

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2rem] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <Outlet />
    </>
  );
};

export default Products;
