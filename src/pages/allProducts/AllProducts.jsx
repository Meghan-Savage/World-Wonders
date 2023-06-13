import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext/ProductContext.jsx';
import { Outlet } from "react-router-dom";
import Footer from "../../Components/footer/Footer.jsx";
import NavBar from '../../Components/navBar/NavBar.jsx';
import Product from '../../Components/product/Product.jsx';
import './AllProducts.css';

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <NavBar />
      <section className='py-16'>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[80px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {products.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <div className='Products'>
        <h2>This is the Products page!</h2>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Products;
