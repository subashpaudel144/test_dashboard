import React from "react"
import "./App.css"
import Dashboard from "./components/Dashboard"
import "@picocss/pico/css/pico.css"



import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/Login"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
