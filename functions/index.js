const functions = require("firebase-functions");
const cors = require("cors");
const admin = require("firebase-admin");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51NPs04ALbGdPmn1L7QQTY20l2iYxBxIoKnqt3AqginbOGzoV1nc4qDtnbfikYq9ZnUrv5vd9Fsu0ObAIGDjZMX3N00jaR4KX05"
);

const app = express();
admin.initializeApp();

app.use(cors());
app.use(express.json());
app.post("/", async (req, res) => {
  try {
    console.log(req.body.items);
    const customer = await stripe.customers.create({
      metadata: {
        items: JSON.stringify(req.body.items),
        total: req.body.total,
      },
    });
    console.log("customer ", customer);
    const line_items = req.body.items.map((item) => {
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
    console.log("line_items ", line_items);
    const session = await stripe.checkout.sessions.create({
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
      customer: customer.id,
      mode: "payment",
      success_url: "https://world-wonders-inceptionu.web.app/sucess",
      cancel_url: "https://world-wonders-inceptionu.web.app/products",
    });
    console.log("session :", session);
    console.log("session.url", session.url);

    res.send({ url: session.url });
  } catch (error) {
    console.log("errooooooooor :", error.message);
    res.status(500).json({ error: error.message });
  }
});
exports.api = functions.https.onRequest(app);

let endpointSecret;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    if (endpointSecret) {
      try {
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
        data = event.data.object;
        eventType = event.type;
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      try {
        const customer = await stripe.customers.retrieve(data.customer);
        await createOrder(customer, data, res);
        console.log("customer", customer);
      } catch (err) {
        console.log("Error retrieving customer details:", err);
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      items: customer.metadata.items,
      total: customer.metadata.total,
      sts: "preparing",
    };
    const db = admin.firestore();
    await db.collection("orders").doc(`/${orderId}/`).set(data);
    console.log("Order created:", orderId);
  } catch (err) {
    console.log("Error creating order:", err);
    return res.status(500).json({ error: "Error creating order" });
  }
};
