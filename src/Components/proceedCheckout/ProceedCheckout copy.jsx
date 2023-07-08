// import React, { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import { loadStripe } from "@stripe/stripe-js";
// import { v4 as uuidv4 } from "uuid";
// import { CartContext } from "../../context/CartContext/CartContext.jsx";
// import { AuthContext } from "../../firebase/authentication.jsx";
// import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
// import { FirebaseContext } from "../../firebase/provider.jsx";

// export default function ProceedCheckout() {
//   const { cart, total } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const { db } = useContext(FirebaseContext);
//   const [priceId, setPriceId] = useState(null);

//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     for (const item of cart) {
//       totalPrice += item.price * item.quantity;
//     }
//     return totalPrice;
//   };

//   const createPriceId = async () => {
//     const stripe = await stripePromise;
//     for (const item of cart) {
//       const price = await stripe.prices.create({
//         unit_amount: item.price,
//         currency: "cad",
//         product: item.id,
//       });
//       setPriceId(price);
//     }
//   };

//   useEffect(() => {
//     createPriceId();
//   }, [cart]);

//   useEffect(() => {
//     const addPriceDocuments = async () => {
//       for (const item of cart) {
//         const productId = item.id;
//         const productRef = doc(db, "products", productId);
//         const pricesRef = collection(productRef, "prices");
//         try {
//           const docRef = await addDoc(pricesRef, priceId[productId]);
//           console.log("Price document added with ID: ", docRef.id);
//         } catch (error) {
//           console.error("Error adding price document: ", error);
//         }
//       }
//     };

//     if (priceId) {
//       addPriceDocuments();
//     }
//   }, [cart, db, priceId]);

//   const checkout = async () => {
//     if (!priceId) {
//       console.error("Invalid priceId");
//       return;
//     }

//     const lineItems = cart.map((item) => ({
//       price: priceId[item.id],
//       quantity: item.quantity,
//     }));

//     const checkoutData = {
//       mode: "payment",
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//       line_items: lineItems,
//     };

//     try {
//       if (user && user.uid) {
//         const docRef = await addDoc(
//           collection(db, "customers", user.uid, "checkout_sessions"),
//           checkoutData
//         );

//         onSnapshot(docRef, (docSnap) => {
//           const { error, sessionId } = docSnap.data();

//           if (error) {
//             alert(error.message);
//           }

//           if (sessionId) {
//             const stripe = loadStripe(
//               "pk_test_51NPs04ALbGdPmn1LVwJMBoy1DvjugjUearnDRhBKRb3F3NBrtFyRxiI7PCFmHt9uuQVGdJlkw5OiLln3HfFt79zq00l7SzIDvw"
//             );
//             stripe.redirectToCheckout({ sessionId });
//           }
//         });
//       } else {
//         console.log("User is not authenticated");
//       }
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//     }
//   };

//   const roundedTotal = calculateTotalPrice();

//   return (
//     <Card className="w-96 h-48 rounded-none justify-center flex">
//       <CardBody>
//         <Typography variant="h5" color="blue-gray" className="mb-2">
//           Subtotal ({total})
//         </Typography>
//       </CardBody>
//       <CardFooter className="pt-0">
//         <Button onClick={checkout} className="bg-orange-300 rounded-none">
//           Proceed to Checkout
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
