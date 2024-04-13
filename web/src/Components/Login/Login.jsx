import { useState } from "react"
import { useNavigate } from "react-router-dom"

// CSS IMPORT
import "./Login.css"
import "./Login-media.css"

import { notifcationActions } from "../../Store/notification-slice"
import { loaderActions } from "../../Store/loader-slice"
import { useDispatch, useSelector } from "react-redux"

import { Notification } from "../UI/Notification/Notification"
import Button from "../UI/Button/Button"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState({
    email: "",
    pass: ""
  })

  function handleInputChange(e) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  function loginSubmitHandler(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    loginRequestHandler(formData)
  }

  const loginRequestHandler = async sendData => {
    try {
      dispatch(loaderActions.showLoader())
      const res = await fetch("/auth/login", {
        method: "POST",
        body: sendData
      })

      let data = await res.json()

      console.log(data, "-data")

      if (!data.success) throw new Error(data.message)

      if (data.message === "authenticated") {
        localStorage.setItem("tocken", data.token)
        let expiration = new Date()
        expiration.setHours(expiration.getHours() + 10)
        localStorage.setItem("tockenExpiry", expiration.toISOString())
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("userName", data.userName)
        localStorage.setItem("userType", data.userType)

        dispatch(loaderActions.hideLoader())
        navigate("/")
      }
    } catch (error) {
      dispatch(notifcationActions.showNotification(`${error}`))
    } finally {
      dispatch(loaderActions.hideLoader())
    }
  }

  return (
    <>
      <div className='loginBox'>
        <div className='loginContainer'>
          <div>
            <img
              src={require("./loginPageImage.jpg")}
              alt=' loginn'
              className='loginPageImage'
            />
          </div>
          <div className='loginFormContainer'>
            <h3 className='heading-1 login-heading'>Login</h3>
            <form className='loginForm' onSubmit={loginSubmitHandler}>
              <div className='form-input-group'>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className='input-element'
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor='email' className='input-label'>
                  Email
                </label>
              </div>
              <div className='form-input-group'>
                <input
                  type='text'
                  name='password'
                  id='password'
                  className='input-element'
                  required
                />
                <label htmlFor='password' className='input-label'>
                  Password
                </label>
              </div>
              <div className='loginFormButtonContainer'>
                <Button type='submit'>Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
