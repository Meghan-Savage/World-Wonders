import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext/CartContext.jsx";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import "./Product.css";

function Product({ product }) {
  const { id, images, title, price } = product;

  const { addToCart } = useContext(CartContext);

  return (
    <Card className="w-64 flex flex-col shadow-2xl">
      <CardHeader shadow={false} floated={false} className="h-48">
        <Link to={`/product/${id}`}>
          <div className="flex items-center justify-center h-full">
            <img
              src={images}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </CardHeader>
      <CardBody className="flex-grow">
        <div className="flex flex-col justify-between h-full">
          <div>
            <Typography color="blue-gray" className="font-medium text-s mt-4">
              <span className="max-lines">{title}</span>
            </Typography>
            <Typography color="blue-gray" className="font-bold text-md mt-4">
              ${price}
            </Typography>
          </div>
          <div className="mt-2">
            <Button
              onClick={() => addToCart(product, product.id)}
              ripple={false}
              fullWidth={true}
              className="bg-gray-900 text-orange-300 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100 text-xs mt-4"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Product;
