import dotenv from "dotenv";
import express from "express";
import stripe from "stripe";
import cors from "cors"

dotenv.config();
const port = 5252;
const app = express();

app.use(cors());
app.use(express.json());

// Initialize Firebase admin SDK
const serviceAccount = require("path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-project.firebaseio.com",
});
const db = admin.firestore();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const endpointSecret = process.env.WEB_HOOK_SECRET;
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
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "cad" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "hour", value: 2 },
              maximum: { unit: "hour", value: 4 },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
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

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let eventType;
  let data;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    stripe.CustomersResource.retrieve(data.customer).then((customer) => {
      createOrder(customer, data);
    });
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});

const createOrder = async (customer, intent) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("orders").doc(orderId.toString()).set(data);
    console.log("Order created:", orderId);
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});
