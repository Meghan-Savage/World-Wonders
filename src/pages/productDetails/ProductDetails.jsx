import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { ProductContext } from "../../context/ProductContext/ProductContext.jsx";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, images } = product;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleTab = (index) => {
    setActiveIndex(index);
  };

  const toggleDescription = () => {
    setShowFullDescription((prevShow) => !prevShow);
  };

  const truncateDescription = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length <= maxLength) {
      return text;
    }
    return words.slice(0, maxLength).join(" ") + "...";
  };

  return (
    <div>
      <div className="app">
        <div className="details" key={id}>
          <div className="big-img">
            <img src={images[activeIndex]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{title}</h2>
              <span>${price}</span>
            </div>
            <p>
              {showFullDescription
                ? description
                : truncateDescription(description, 40)}
            </p>
            {description.length > 40 && (
              <button onClick={toggleDescription}>
                {showFullDescription ? "Show Less" : "Learn More"}
              </button>
            )}
            <div className="thump">
              {images.map((img, index) => (
                <img
                  src={img}
                  onClick={() => handleTab(index)}
                  key={index}
                  className={index === activeIndex ? "active" : ""}
                />
              ))}
            </div>
            <button
              className="cart"
              onClick={() => addToCart(product, product.id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
