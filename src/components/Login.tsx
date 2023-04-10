import React, { FormEvent } from "react"
import "../styles/login.scss"
import axios from "axios"
import { Navigate } from "react-router-dom"

const Login = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    formData.append("ip_address", "182.93.95.159")
    const data = Object.fromEntries(formData) as {
      login_id: string
      login_password: string
      ip_address: string
    }
    try {
      const loginResponse = await axios.post(
        "https://jp-dev.cityremit.global/web-api/config/v1/auths/login",
        data
      )
      console.log("loginresponse", loginResponse)
      const token = loginResponse?.data?.data[0]?.jwt_token
      localStorage.setItem("access-token", token)
      window.location.href = "/"
    } catch (err) {
      console.log(err)
    }
  }

  const userToken = localStorage.getItem("access-token")
  if (userToken) {
    return <Navigate to="/" replace />
  }
  return (
    <div className="login_wrapper">
      <div className="form_wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h3>City Tech Login</h3>
          <p>Please enter your login id and login password to login</p>
          <fieldset>
            <label htmlFor="login-id">Login Id:</label>
            <input type="text" name="login_id" id="login_id" />
          </fieldset>
          <fieldset>
            <label htmlFor="login_password">Login Password:</label>
            <input type="password" id="login_password" name="login_password" />
          </fieldset>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
