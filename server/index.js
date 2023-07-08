import dotenv from "dotenv";
import express from "express";
import stripe from "stripe";
import cors from "cors";

dotenv.config();
const port = 5252;
const app = express();

app.use(cors());
app.use(express.json());

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = stripe(stripeSecretKey);

app.get("/", (req, res) => {
  res.send("Hello, server is working correctly!");
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;
    const line_items = cart.map((item) => {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.title,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.amount,
      };
    });

    const session = await stripeClient.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/products",
      cancel_url: "http://localhost:5173/cart",
    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});
