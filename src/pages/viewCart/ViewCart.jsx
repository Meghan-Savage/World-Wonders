import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import ProceedCheckout from "../../Components/proceedCheckout/ProceedCheckout.jsx";

export default function ViewCart() {
  const { cart, cartAmount, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const [selectedQuantity, setSelectedQuantity] = useState(cart.quantity);

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(id, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-top h-full min-h-screen p-4 bg-gradient-to-r from-orange-400 to-orange-100 justify-center">
      <div className="container text-center max-w-[42rem]">
        <div>{cartAmount} Items In your Shopping Bag</div>
        {cart.map((item) => (
          <Card
            className="max-w-[30rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[30rem] xl:max-w-[33.33rem] mx-auto shadow-md rounded-lg mb-4"
            key={item.id}
          >
            <CardHeader shadow={false} floated={false}>
              <div className="w-full">
                <Link to={`/product/${item.id}`}>
                  <Typography className="text-sm sm:text-md font-semibold uppercase text-black hover:underline leading-normal min-w-[10rem]">
                    {item.title}
                  </Typography>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="mb-3">
              <div className="flex">
                <img src={item.images} className="w-[8rem] object-cover mr-4" />
                <div className="flex flex-col gap-y-6 mx-auto my-auto">
                  <div>
                    <Typography className="text-md">
                      Quantity: {item.quantity}
                    </Typography>
                  </div>
                  <div>
                    <select
                      value={selectedQuantity}
                      onChange={(event) => handleQuantityChange(item.id, event)}
                      className="border px-2 py-1 text-md"
                    >
                      {[...Array(item.quantity)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <button
                      style={{ flex: "1 0 auto", fontSize: "0.8rem" }}
                      className="rounded hover:bg-gray-300"
                    >
                      Save
                    </button>
                    <button
                      style={{
                        flex: "1 0 auto",
                        fontSize: "0.8rem",
                        marginLeft: "1rem",
                      }}
                      className="rounded hover:bg-gray-300"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Typography className="text-lg text-black font-bold text-end">
                CA$ {item.price}
              </Typography>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="sticky top-0 h-screen">
        <ProceedCheckout />
      </div>
    </div>
  );
}
