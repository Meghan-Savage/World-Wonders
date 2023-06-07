import React from 'react'
import ReactDOM from 'react-dom/client'
import Products from "./pages/Products/Products.jsx"
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth children={<App />} isAlllowed={"all"} />,
    children: [
      {
        path: "Products",
        element: <RequireAuth children={<Products />} />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
