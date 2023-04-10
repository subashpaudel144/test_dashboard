import React, { useEffect, useState } from "react"
import "../styles/dashboard.scss"
import axios from "axios"

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

  console.log(ticketData)

  const localStorageToken = localStorage.getItem("access-token")
  console.log(localStorageToken)
  return (
    <div className="dashboard_wrapper">
      <h1>CityTech Dashboard</h1>
      <h5>Tickets</h5>

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
