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
  const { user } = useContext(AuthContext);
  console.log("user", user);
  const roundedTotal = Number(total.toFixed(2));

  const handleCheckout = () => {
    const filteredCart = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      amount: item.amount,
      sellerId: item.sellerId,
    }));

    const filteredUser = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
    };

    const data = {
      user: filteredUser,
      items: filteredCart,
      total: roundedTotal,
    };

    axios
      .post(
        "https://us-central1-world-wonders-inceptionu.cloudfunctions.net/api",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("An error occurred during checkout. Please try again later.");
      });
  };

  return (
    <div className="min-w-[20rem]">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Subtotal: ${roundedTotal}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleCheckout}
          className="bg-black hover:bg-orange-300 text-orange-300 hover:text-black py-2 px-4 rounded-md shadow-md transition duration-300 font-bold"
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </div>
  );
}
