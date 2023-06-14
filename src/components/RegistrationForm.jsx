import React from 'react'
//import { Link } from "react-router-dom";

export default function RegistrationForm() {
  return (
    <div className="bg-slate-200 px-60 py-40 rounded-3xl border-2 border-gray-200">
    <h1 className="text-6xl text-blue-700 font-semibold">Create an Account.</h1>
    <p className="font-bold text-lg text-gray-600 mt-4">Please enter your details.</p>
    <div className="mt-8">
      
    </div>

    <div>
          <label className="text-2xl font-medium font-bold">Email</label>
          <input className="w-full border-2 border-gray-400 rounded-xl p-4 mt-2 bg-transparent" 
          type="password" placeholder="Enter your email"/>
      </div>
      <div>
          <label className="text-2xl font-medium font-bold">password</label>
          <input className="w-full border-2 border-gray-400 rounded-xl p-4 mt-2 bg-transparent" 
          type="password" placeholder="Enter your password!"/>
      </div>
      

      <div className="mt-8 flex flex-col gap-y-4">
          <button className="active: scale-[.98] active:duration-75 hover:scale-[1.01] 
          ease-in-out transition-all py-3 rounded-xl bg-blue-700 border-gray-400 big-violet-500 text-blue
           text-4xl font-bold">Submit</button>
      </div>
      <div className="mt-8 flex justify-center items-center">
          <p className="font-bold text-1xl">Already have an account?</p>
          <button className="text-violet-500 text-2xl font-bold ml-2"></button>
      </div>
  </div>
  )
}

