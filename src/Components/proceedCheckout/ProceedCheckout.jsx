import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext.jsx";

export default function ProceedCheckout() {
  const { total, cartAmount } = useContext(CartContext);
  const roundedTotal = total.toFixed(2);
  const { id } = useParams();

  return (
    <Card className="w-96 h-48 rounded-none justify-center flex">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Subtotal ({cartAmount} items): ${roundedTotal}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={`/checkout`}>
          <Button className="bg-orange-300 rounded-none">
            Proceed to Checkout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
