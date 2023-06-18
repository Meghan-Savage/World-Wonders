import React from "react";
import FirebaseProvider from "./firebase/provider.jsx";
import { AuthProvider } from "./firebase/authentication.jsx";
import ProductProvider from "./context/ProductContext/ProductContext.jsx";
import CartProvider from "./context/CartContext/CartContext.jsx";
import SideBarProvider from "./context/SideBarContext/SideBarContext.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <CartProvider>
          <SideBarProvider>
            <ProductProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProductProvider>
          </SideBarProvider>
        </CartProvider>
      </AuthProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
