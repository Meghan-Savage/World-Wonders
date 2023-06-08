import React from 'react'
import ReactDOM from 'react-dom/client'
import Products from './pages/Products/Products.jsx'
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
