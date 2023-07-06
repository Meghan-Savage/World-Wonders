import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "firebase/compat/functions";
import { auth } from "../../firebase/provider"; // Replace with the appropriate import for auth

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getClientSecret();
  }, []);

  const getClientSecret = async () => {
    try {
      const user = await auth.currentUser(); // Make sure to use the correct method to get the current user
      if (!user) {
        // Handle the case when the user is not authenticated
        throw new Error("User is not authenticated");
      }

      const token = await user.getIdToken();
      const response = await fetch("/stripe/createPaymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: [] }), // Pass the items or cart details if needed
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve client secret");
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.log("Error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const cardElement = elements.getElement(PaymentElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("Error:", error);
      setLoading(false);
      return;
    }

    // Use the paymentMethod object to proceed with the payment
    // For example, you can send the paymentMethod.id to your server to complete the payment

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement options={{ clientSecret }} />}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
