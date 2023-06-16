import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { ProductContext } from "../../context/ProductContext/ProductContext.jsx";
import Carousel from "../../Components/carousel/Carousel.jsx";
import NavBar from "../../Components/navBar/NavBar.jsx";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [carouselItems, setCarouselItems] = useState([]);
  const product = products.find((item) => item.id === id);

  useEffect(() => {
    if (product) {
      const { images, video } = product;
      const itemArray = video ? [video, ...images] : images;
      setCarouselItems(itemArray);
      console.log("carouselItems", itemArray);
    }
  }, [product]);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, images, video } = product;

  return (
    <div>
      <NavBar />
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            {carouselItems.length >= 1 && (
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <Carousel images={carouselItems}>
                  {carouselItems.map((item, index) => (
                    <div key={index}>
                      {typeof item === "string" ? (
                        <img
                          className="max-w-[200px] lg:max-w-sm"
                          src={item}
                          alt={`Image ${index + 1}`}
                        />
                      ) : (
                        <video
                          className="max-w-[200px] lg:max-w-sm"
                          src={item}
                          alt={`Video ${index + 1}`}
                          controls
                        />
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            <div className="flex-1 text-center lg:text-left ml-0">
              <h1 className="text-[26px] lg:mx-0 font-medium mb-2 max-w-[450px] mx-auto">
                {title}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                ${price}
              </div>
              <p className="mb-8">{description}</p>
              <button
                onClick={() => addToCart(product, product.id)}
                className="font-normal hover:font-bold text-white bg-orange-300 rounded-xl py-4 px-8"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
