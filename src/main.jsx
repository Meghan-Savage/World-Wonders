import React from "react";
import FirebaseProvider from "./firebase/provider.jsx";
import { AuthProvider } from "./firebase/authentication.jsx";
import ProductProvider from "./context/ProductContext/ProductContext.jsx"
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>  
        <ProductProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProductProvider>
      </AuthProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
