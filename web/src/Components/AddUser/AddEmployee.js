// functions import
import { useState } from 'react'

// HELPER FUNCTIONS IMPORT
import { postUserData } from './helpers'

// components import
import Button from '../UI/Button/Button'

// CSS IMPORT
import './addEmployee.css'

function AddEmployee() {
  const [emailAlreadyExsist, setEmailAlreadyExsist] =
    useState(false)

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const [createSuccess, setCreateSuccess] = useState(false)

  const [adminCheckbox, setAdminCheckbox] = useState(false)
  const [employeeCheckBox, setemployeeCheckBox] =
    useState(false)
  const [userType, setUserType] = useState(null)

  function user_nameChangeHandler(e) {
    setUserName(e.target.value)
  }
  function emailChangeHandler(e) {
    setEmail(e.target.value)
  }
  function passwordChangeHandler(e) {
    setPass(e.target.value)
  }
  function adminCheckboxHandler(e) {
    setUserType(1)
    setemployeeCheckBox(false)
    setAdminCheckbox(true)
  }
  function employeeCheckBoxHandler(e) {
    setUserType(2)
    setAdminCheckbox(false)
    setemployeeCheckBox(true)
  }
  function submitFormHandler(e) {
    e.preventDefault()

    if (email !== '' && pass !== '') {
      postSignUp()
    }
  }
  const postSignUp = async () => {
    setEmailAlreadyExsist(false)
    try {
      let sendData = {
        userName,
        email,
        pass,
        userType
      }
      const res = await postUserData(sendData)

      let data = await res.json()

      if (data.message === 'Email already exsist') {
        setEmailAlreadyExsist(true)
        setTimeout(() => {
          setEmailAlreadyExsist(false)
        }, 1500)
      }
      if (data.message === 'User Created successfully') {
        setUserName('')
        setEmail('')
        setPass('')
        setCreateSuccess(true)
        setTimeout(() => {
          setCreateSuccess(false)
        }, 1500)
      }
    } catch (error) {
      alert('Something went wrong, please try again later!')
    }
  }

  return (
    <div className='container-primary'>
      <h3 className='heading-1'>Add User</h3>
      <div className=''>
        <form
          method='POST'
          className='add-employee-form-container'
          encType='application/json'
        >
          <div className='form-input-group'>
            <label
              className='input-label'
              htmlFor='user_name'
            >
              User Name
            </label>
            <input
              type='text'
              className='input-element'
              id='user_name'
              name='user_name'
              onChange={user_nameChangeHandler}
            />
          </div>

          <div className='form-input-group'>
            <label className='input-label' htmlFor='emailId'>
              Email ID
            </label>
            <input
              type='text'
              className='input-element'
              id='emailId'
              name='emailId'
              onChange={emailChangeHandler}
            />
            {/* {emailAlreadyExsist && (
              <span>Email already exsist</span>
            )} */}
            <div
              className={
                emailAlreadyExsist ? 'alert show' : 'alert'
              }
            >
              Email already exsist
            </div>
          </div>
          <div className='form-input-group'>
            <label className='input-label' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              className='input-element'
              id='password'
              name='password'
              onChange={passwordChangeHandler}
            />
          </div>
          <div className='add-emp-checkbox-container'>
            <div className='form-check-group'>
              <input
                type='checkbox'
                id='adminCheckbox'
                value={adminCheckbox}
                checked={adminCheckbox}
                onChange={adminCheckboxHandler}
              />
              <label
                className='input-label'
                htmlFor='adminCheckbox'
              >
                Admin
              </label>
            </div>
            <div className='form-check-group'>
              <input
                type='checkbox'
                id='employeeCheckBox'
                value={employeeCheckBox}
                checked={employeeCheckBox}
                onChange={employeeCheckBoxHandler}
              />
              <label
                className='input-label'
                htmlFor='employeeCheckBox'
              >
                Employee
              </label>
            </div>
          </div>
          <div className=''>
            <Button
              onClick={submitFormHandler}
              className='button button--primary'
            >
              Submit
            </Button>
          </div>
          <div
            className={createSuccess ? 'alert show' : 'alert'}
          >
            User added Successfully
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddEmployee
