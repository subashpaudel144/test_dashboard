import React, { useEffect, useState } from "react"
import "../styles/dashboard.scss"
import axios from "axios"
import { Navigate } from "react-router-dom"

const Dashboard = () => {
  const [ticketData, setTicketData] = useState([])

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token")

    axios
      .post(
        "https://jp-dev.cityremit.global/web-api/transaction-manager/v1/admin/dashboard/search",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setTicketData(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access-token")
    window.location.href = "/login"
  }

  const localStorageToken = localStorage.getItem("access-token")
  if (!localStorageToken) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="dashboard_wrapper">
      <div className="header_wrapper">
        <h1>CityTech Dashboard</h1>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <h5>List of Transactions</h5>

      <table>
        <tr>
          <th>Id</th>
          <th>Sender Name</th>
          <th>Receiver Name</th>
          <th>Send Country</th>
          <th>Receive Country</th>
          <th>Send Amount</th>
        </tr>

        {ticketData?.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item?.id}</td>
            <td>{item?.["Sender Full Name"]}</td>
            <td>{item?.["Receiver Full Name"]}</td>
            <td>{item?.["Send Country/送金国"]}</td>
            <td>{item?.["Receive Country/受取国"]}</td>
            <td>{item?.["Send Amount/送金額"]}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Dashboard
