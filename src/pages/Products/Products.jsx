import React from 'react'
import { Outlet } from "react-router-dom";

function Products() {
  return (
    <div className='Products'>
        <h1>This is the Products page!</h1>;
        <Outlet />
    </div>
  )
}

export default Products;