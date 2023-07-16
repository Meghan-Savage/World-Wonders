import React from "react";

import { BrowserRouter } from "react-router-dom";

import FirebaseProvider from "./firebase/provider.jsx";
import { AuthProvider } from "./firebase/authentication.jsx";
import ProductProvider from "./context/ProductContext/ProductContext.jsx";
import CartProvider from "./context/CartContext/CartContext.jsx";
import SideBarProvider from "./context/SideBarContext/SideBarContext.jsx";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import OrderProvider from "./context/OrderContext/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <SideBarProvider>
              <ProductProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ProductProvider>
            </SideBarProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
