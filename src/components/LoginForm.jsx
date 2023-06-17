import React, { useState,} from "react";
import icon from '../images/icon.png';
import { Link, useNavigate} from "react-router-dom";

import { auth } from "../firebase/provider";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  // Sign in function/logic
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/products");
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-300">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <form onSubmit={login}>
          <div>
            <h1 className="text-3xl block text-center font-bold text-indigo-600">LOGIN</h1>
            <p className="text-1xl block text-center font-semi-bold text-indigo-600">
              Welcome back! Please enter your details.
            </p>

            <div className="mt-3">
              <label className="block font-semibold text-base mb-2">Email</label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="block font-semibold text-base mb-2">Password</label>
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
                className="border-2 border-indigo-700 bg-indigo-600 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        </form>

        <div className="mt-3 grid grid-cols-3 items-center text-indigo-600">
          <hr className="border-gray-900" />
          <p className="text-center  font-bold text-1xl">Or</p>
          <hr className="border-gray-900" />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="border-2 border-indigo-400 bg-indigo-400 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold  flex items-center justify-center px-0  gap-2"
          >
            <img className="w-6 h-6 mt-0" src={icon} alt="images" />
            <span className="">Sign in with Google</span>
          </button>
        </div>

        <div className="mt-2 flex justify-center items-center">
          <p className="font-semibold text-1xl">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-1xl font-semibold ml-2 border-2 border-indigo-400 hover:text-indigo-700 rounded-md hover:bg-transparent bg-indigo-400 text-white w-24"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
