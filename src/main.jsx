import React from 'react'
import ReactDOM from 'react-dom/client'
import AllProducts from "./pages/allProducts/AllProducts.jsx"
import App from './App.jsx'
import './index.css'
import ProductProvider from './context/ProductContext/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProductProvider>

)
