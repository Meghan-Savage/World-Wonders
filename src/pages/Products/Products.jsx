import React, {useContext} from 'react'
import { ProductContext } from '../../context/ProductContext/ProductContext.jsx';
import { Outlet } from "react-router-dom";
import Footer from "../../Components/footer/Footer.jsx"
import NavBar from '../../Components/navBar/NavBar.jsx';
import Profile from '../../Components/profile/profile.jsx';

const Products = () => {
  const {products} = useContext(ProductContext);
  console.log('products', products)
  const filteredProducts = products.filter(item => {
    return item.category === "men's clothing" || item.category === "women's clothing"
  })

  return (
    <>
    <NavBar />
    <section className='py-16'>
      <div className="container mx-auto">
        <div className='grid'>
          {filteredProducts.map(product => {
            return <div key={product.id}>{product.title}</div>  
          })}
        </div>
      </div>
    </section>
    <div className='Products'>
        <h2>This is the Products page!</h2>
        <Outlet />
    <Footer />
    </div>
    </>

  )
}

export default Products;