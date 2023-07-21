import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/provider";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 to-orange-100">
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
                className="bg-black hover:bg-orange-300 text-orange-300 hover:text-black py-2 px-4 rounded-md shadow-md transition duration-300 font-bold"
              >
                Sign up
              </button>
            </div>
            <div className="mt-3 text-center">
              By continuing, you agree to world-wonders. Inc's{" "}
              <Link
                to="/terms"
                className="text-blue-700 underline hover:text-orange-900"
              >
                Terms 0f Use
              </Link>
              .
            </div>
          </div>
        </form>

        <div className="mt-2 flex justify-center items-center">
          <p className="font-semibold text-1xl">Already have an account?</p>
          <Link
            to="/signin"
            className="bg-black hover:bg-orange-300 text-orange-300 hover:text-black py-2 px-4 rounded-md shadow-md transition duration-300 font-bold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
