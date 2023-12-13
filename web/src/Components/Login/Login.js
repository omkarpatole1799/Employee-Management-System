import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS IMPORT
import './Login.css'
import './Login-media.css'
import Loader from '../UI/Loader/Loader'
import { Notification } from '../UI/Notification/Notification'
import { notifcationActions } from '../../Store/notification-slice'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isShowNotification = useSelector(
    (state) => state.showNotification
  )

  const isShowLoader = useSelector(
    (state) => state.showLoader
  )
  console.log(isShowLoader)

  const [inputValue, setInputValue] = useState({
    email: '',
    pass: ''
  })

  function handleInputChange(e) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  function loginButtonHandler(e) {
    e.preventDefault()
    dispatch(
      notifcationActions.showNotification('Loggin you in!')
    )
    if (inputValue.email === '') {
      dispatch(
        notifcationActions.showNotification('Email Empty')
      )
      return false
    }
    if (inputValue.pass === '') {
      dispatch(
        notifcationActions.showNotification('Password Empty')
      )
      return false
    }

    if (inputValue.email !== '' && inputValue.pass !== '') {
      loginRequestHandler(inputValue.email, inputValue.pass)
    }
  }

  const loginRequestHandler = async (email, pass) => {
    dispatch(notifcationActions.showLoader())
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
      dispatch(
        notifcationActions.showNotification('Not authorized')
      )
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

      dispatch(notifcationActions.hideLoader())
      navigate('/')
    }

    if (message === 'Incorret Password') {
      dispatch(
        notifcationActions.showNotification(
          'Incorrect password'
        )
      )
    }

    if (message === 'Incorrect Email') {
      dispatch(
        notifcationActions.showNotification('Incorrect Email')
      )
    }
  }

  return (
    <>
      {isShowLoader && <Loader />}
      {isShowNotification && <Notification />}
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
