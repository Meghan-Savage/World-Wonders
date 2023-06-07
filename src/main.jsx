import React from 'react'
import ReactDOM from 'react-dom/client'
import Products from './pages/Products/Products.jsx'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, Outlet  } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <Products />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  </React.StrictMode>
);