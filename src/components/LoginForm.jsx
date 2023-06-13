import React from "react"
import icon from '../images/icon.png';
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (

    <div className="bg-slate-200 px-60 py-40 rounded-3xl border-2 border-gray-200">
    <h1 className="text-6xl text-blue-700 font-semibold">Login</h1>
    <p className="font-bold text-lg text-gray-600 mt-4">Welcome back! Please enter your login details.</p>
    <div className="mt-8">
      <div>
          <label className="text-4xl font-medium font-bold">Email</label>
          <input className="w-full border-2 border-gray-400 rounded-xl p-4 mt-2 bg-transparent" type="text" placeholder="Enter your email"/>
      </div>
    </div>

    <div>
          <label className="text-3xl font-medium">Password</label>
          <input className="w-full border-2 border-gray-400 rounded-xl p-4 mt-2 bg-transparent" type="password" placeholder="Enter your password"/>
      </div>
      
      <div className="mt-4 flex flex-col gap-y-4">
          <button className=" hover: active: scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-700 border-gray-400 big-violet-500 text-blue text-4xl font-bold">Sign in</button>

          <div className="mt-2 grid grid-cols-3 items-center text-red-900">
              <hr className="border-gray-800" />
              <p className="text-center  font-semibold text-2xl ">Or</p>
              <hr className="border-gray-800" />
          </div>
        
          <button className=" px-1 py-1 mt-4 text-1xl flex rounded-xl py-1 border-2 border-gray-400 items-center justify-center gap-2 active: scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
          <img className="w-12 h-12 mt-1 "src={icon} alt="images" />
          <span>Sign in with Google</span>
              </button>
      </div>
      <div className="mt-4 flex justify-center items-center">
          <p className="font-bold text-1xl">Don't have an account?</p>
          <button className="text-violet-500 text-2xl font-bold ml-2"><Link to="/login/signup">Sign up!</Link></button>
      </div>
  </div>
    
  )
}

