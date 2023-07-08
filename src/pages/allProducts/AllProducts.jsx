import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext/ProductContext.jsx";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "../../Components/navBar/NavBar.jsx";
import Product from "../../Components/product/Product.jsx";
import "./AllProducts.css";

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
      <NavBar />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2rem] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <div className="Products">
        <Outlet />
      </div>
    </>
  );
};

export default Products;
