import React, { useContext } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";

import "./Product.css";

function Product({ product }) {
  const { id, images, description, title, price, video } = product;
  console.log("id", id);

  const { addToCart } = useContext(CartContext);

  return (
    <Card className="w-64">
      <CardHeader shadow={false} floated={false} className="h-48">
        <Link to={`/product/${id}`}>
          <img
            src={images}
            alt={title}
            className="h-full w-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-medium text-sm">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-medium text-sm">
            ${price}
          </Typography>
        </div>
        <Typography
          variant="body"
          color="gray"
          className="font-normal opacity-75 text-sm"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          color="orange"
          className="font-normal hover:font-bold text-white bg-orange-300 rounded-xl py-2 px-4 text-sm"
          onClick={() => addToCart()}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Product;
