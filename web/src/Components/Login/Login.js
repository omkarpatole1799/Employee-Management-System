import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS IMPORT
import './Login.css'
import './Login-media.css'
import Loader from '../UI/Loader/Loader'

function Login() {
  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)

  const [inputValue, setInputValue] = useState({
    email: '',
    pass: ''
  })

  const [alert, setAlert] = useState({
    value: false,
    message: ''
  })

  function handleInputChange(e) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  function loginButtonHandler(e) {
    e.preventDefault()
    if (inputValue.email === '') {
      displayAlert('Email Empty')
      return false
    }
    if (inputValue.pass === '') {
      displayAlert('Password Empty')
      return false
    }

    if (inputValue.email !== '' && inputValue.pass !== '') {
      loginRequestHandler(inputValue.email, inputValue.pass)
    }
  }

  const loginRequestHandler = async (email, pass) => {
    setLoader(true)
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: email,
        pass: pass
      })
    })

    const { message, tocken, userId, userName, userType } =
      await res.json()

    if (message === 'Not authorized') {
      displayAlert('Not authorized')
    }

    if (message === 'authenticated') {
      localStorage.setItem('tocken', tocken)
      let expiration = new Date()
      expiration.setHours(expiration.getHours() + 10)
      localStorage.setItem(
        'tockenExpiry',
        expiration.toISOString()
      )
      localStorage.setItem('userId', userId)
      localStorage.setItem('userName', userName)
      localStorage.setItem('userType', userType)
      setLoader(false)
      navigate('/')
    }

    if (message === 'Incorret Password') {
      displayAlert('Incorrect Password')
    }

    if (message === 'Incorrect Email') {
      displayAlert('Incorrect email')
    }
  }

  function displayAlert(message) {
    setAlert({
      value: true,
      message: message
    })
    setTimeout(() => {
      setAlert({
        value: false,
        message: ''
      })
    }, 2500)
  }

  return (
    <>
      {alert.value && (
        <div
          className={
            alert.value ? 'alert-1 alert-show' : 'alert-1'
          }
        >
          {alert.message}
        </div>
      )}
      {loader && <Loader />}
      <div className='loginBox'>
        <div className='loginContainer'>
          <div>
            <img
              src={require('./loginPageImage.jpg')}
              alt=' loginn'
              className='loginPageImage'
            />
          </div>
          <div className='loginFormContainer'>
            <h3 className='heading-1 login-heading'>Login</h3>
            <form
              className='loginForm'
              method='POST'
              encType='application/json'
            >
              <div className='loginFormInputContainer'>
                <label htmlFor='email' className=''>
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  value={inputValue.email}
                  id='email'
                  className='input-element'
                  onChange={handleInputChange}
                />
              </div>
              <div className='loginFormInputContainer'>
                <label htmlFor='password' className=''>
                  Password
                </label>
                <input
                  type='text'
                  name='pass'
                  value={inputValue.pass}
                  id='password'
                  className='input-element'
                  onChange={handleInputChange}
                />
              </div>
              <div className='loginFormButtonContainer'>
                <button
                  type='submit'
                  className='button button--primary'
                  onClick={loginButtonHandler}
                >
                  {/* Submit
                  <i className='fa-solid fa-right-to-bracket'></i> */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
