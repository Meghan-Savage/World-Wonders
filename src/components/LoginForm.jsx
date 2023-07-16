import React, { useState, useContext } from "react";
import icon from "../images/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/provider";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { RiAlertFill } from "react-icons/ri";
import { AuthContext } from "../firebase/authentication";

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");

    // Simulating login logic
    if (email === "yourEmail" && password === "yourPassword") {
      setLoggedIn(true);
      setLoginError("");
      navigate("/products");
    } else {
      setLoggedIn(false);
      setLoginError("Wrong password or email");
    }
  };

  // Sign in with Firebase logic
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoggedIn(true);
        setLoginError("");
        setUser(userCredential.user);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        setLoginError("Wrong Email or Password !!.");
      });
  };

  // Sign in with Google logic
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setLoggedIn(true);
        setLoginError("");
        setUser(user);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
        setLoginError("Failed to sign in with Google");
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-orange-400 to-orange-100 ">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <form onSubmit={login}>
          <div>
            <h1 className="text-3xl block text-center font-bold text-gray-800">
              LOGIN
            </h1>
            <p className="text-1xl block text-center font-semi-bold text-gray-800">
              Welcome back! Please enter your details.
              {isLoggedIn && (
                <p className="text-green-500">User logged in successfully</p>
              )}
              {loginError && (
                <p className="text-white text-x z-50 bg-red-600 w-64 rounded ">
                  <RiAlertFill className="mr-2" style={{ fontSize: "24px" }} />
                  {loginError}
                </p>
              )}
            </p>

            <div className="mt-3">
              <label className="block font-semibold text-base mb-2">
                Email
              </label>
              <input
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
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
                Login
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
        <div className="mt-3 grid grid-cols-3 items-center text-gray-800">
          <hr className="border-gray-900" />
          <p className="text-center font-bold text-1xl">Or</p>
          <hr className="border-gray-900" />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="border-2 border-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold flex items-center justify-center px-0 gap-2"
            onClick={signInWithGoogle}
          >
            <img className="w-6 h-6 mt-0" src={icon} alt="images" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-2 flex justify-center items-center">
          <p className="font-semibold text-1xl">Don't have an account?</p>
          <Link
            to="/signup"
            className=" text-center text-1xl font-semibold ml-2 border-2 border-gray-800 hover:text-gray-800 rounded-md hover:bg-transparent bg-gray-800 text-white w-24"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
