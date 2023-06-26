import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { auth } from "../firebase/provider";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sign up function/logic
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <form onSubmit={signUp}>
          <div>
            <h1 className="text-3xl block text-center font-bold text-gray-800">
              Create an Account
            </h1>
            <p className="text-1xl block text-center font-semi-bold text-gray-800">
              Please enter your details.
            </p>

            <div className="mt-3">
              <label className="block font-semibold text-base mb-2">
                Email
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-800"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="block font-semibold text-base mb-2">
                Password
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <button
                type="submit"
                className="border-2 border-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>

        <div className="mt-2 flex justify-center items-center">
          <p className="font-semibold text-1xl">Already have an account?</p>
          <Link
            to="/signin"
            className="text-1xl font-semibold ml-2 border-2 border-gray-800 hover:text-gray-800 rounded-md hover:bg-transparent bg-gray-800 text-white w-24"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}



