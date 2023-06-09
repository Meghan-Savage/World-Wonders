import React, { useContext } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { CartContext } from "../../context/CartContext/CartContext";
import { AuthContext } from "../../firebase/authentication";

export default function ProceedCheckout() {
  const { cart, total } = useContext(CartContext);
  console.log("cart", cart);
  const { user } = useContext(AuthContext);

  const roundedTotal = Number(total.toFixed(2));
  console.log("roundedTotal", roundedTotal);

  const handleCheckout = () => {
    const filteredCart = cart.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        amount: item.amount,
      };
    });

    const data = {
      user: user,
      items: filteredCart,
      total: roundedTotal,
    };

    console.log("data", data);
    axios
      .post(
        "https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred during checkout. Please try again later.");
      });
  };

  return (
    <Card className="w-96 h-48 rounded-none justify-center flex">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Subtotal: ${roundedTotal}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleCheckout} className="bg-orange-300 rounded-none">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
