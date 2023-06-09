import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/allProducts/AllProducts.jsx";



function App() {
  return (
   <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
   </Router> 

  );
}

export default App;
