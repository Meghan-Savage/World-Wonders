import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import ProceedCheckout from "../../Components/proceedCheckout/ProceedCheckout.jsx";

export default function ViewCart() {
  const { cart, cartAmount, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(cart.quantity);
  console.log("cart", cart);

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(id, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-top gap-8">
      <div className="container mx-auto">
        <div>{cartAmount} Items In your Shopping Bag</div>
        {cart.map((item) => (
          <Card
            className="max-w-[30rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[30rem] xl:max-w-[33.33rem] flex mb-4 shadow-md rounded-none"
            key={item.id}
          >
            <CardHeader shadow={false} floated={false} className="rounded-none">
              <div className="w-full min-h-[150px] flex items-start justify-between">
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-start gap-x-4">
                    <img
                      src={item.images}
                      className="w-[100px] h-full object-cover"
                    />
                    <div className="flex flex-col gap-y-3">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <Typography className="text-sm sm:text-xs uppercase font-medium text-black hover:underline">
                            {item.title}
                          </Typography>
                        </Link>
                      </div>
                      <div>
                        <Typography className="text-sm sm:text-xs">
                          Quantity: {item.quantity}
                        </Typography>
                      </div>
                      <div>
                        <select
                          value={selectedQuantity}
                          onChange={(event) =>
                            handleQuantityChange(item.id, event)
                          }
                          className="border px-2 py-1 text-sm sm:text-xs"
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
                </div>
                <div className="flex flex-col gap-y-1">
                  <Typography className="text-sm sm:text-xs text-black font-bold">
                    CA$ {item.price}
                  </Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="rounded-none"></CardBody>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mr-64">
        <ProceedCheckout />
      </div>
    </div>
  );
}
