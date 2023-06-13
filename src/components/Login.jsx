import React from 'react'
import { Outlet } from "react-router-dom";


function Login() {
  return (
    <div className='h-screen w-screen '>
    <div className='flex justify-center items-center w-screen h-screen '>
      <div className='mr-24 '>
        <Outlet /></div>
        <div className='bg-white'>
      </div>
    </div></div>
  )
}

export default Login
