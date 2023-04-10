import React from "react"
import "../styles/dashboard.scss"
import axios from "axios"

const Dashboard = () => {
  const accessToken = localStorage.getItem("access-token")

  const localStorageToken = localStorage.getItem("access-token")
  console.log(localStorageToken)
  return (
    <div className="dashboard_wrapper">
      <h1>CityTech Dashboard</h1>
      <h5>Tickets</h5>
    </div>
  )
}

export default Dashboard
