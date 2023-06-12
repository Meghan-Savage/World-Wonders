import React from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "signin",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <RegistrationForm />,
      
      }]
  },
 
]);


function App() {
  return (
    <RouterProvider router={router} />
  )
};

export default App;