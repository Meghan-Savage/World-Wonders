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
import CartItem from "../../Components/cartItem/CartItem.jsx";
import NavBar from "../../Components/navBar/NavBar.jsx";
import Footer from "../../Components/footer/Footer.jsx";

export default function ViewCart() {
  const { cart, cartAmount, updateQuantity } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(cart.quantity);

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(id, quantity);
  };

  return (
    <>
      <NavBar />
      <div>{cartAmount} Items In your Shopping Bag</div>
      <div>
        {cart.map((item) => (
          <Card
            className="max-w-[36rem] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[36rem] xl:max-w-[40rem] flex mb-4 shadow-md"
            key={item.id}
          >
            <CardHeader shadow={false} floated={false}>
              <div className="w-full min-h-[150px] flex items-start justify-between">
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-start gap-x-4">
                    <img
                      src={item.images}
                      className="w-[100px] h-full object-cover"
                    />
                    <div className="flex flex-col gap-y-1">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <Typography className="text-sm uppercase font-medium text-black hover:underline">
                            {item.title}
                          </Typography>
                        </Link>
                      </div>
                      <div>
                        <Typography>Quantity: {item.quantity}</Typography>
                      </div>
                      <div>
                        <select
                          value={selectedQuantity}
                          onChange={(event) =>
                            handleQuantityChange(item.id, event)
                          }
                          className="border rounded-md px-2 py-1"
                        >
                          {[...Array(item.quantity)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <Typography className="text-black font-bold">
                  CA$ {item.price}
                </Typography>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
}
