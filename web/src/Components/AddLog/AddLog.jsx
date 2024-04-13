import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../UI/Button/Button"

// CSS IMPORT
import "./add-log.css"
import Loader from "../UI/Loader/Loader"
import headers from "../../Utils/authHeaders"

function AddLog() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  function submitLogHandler(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    postLogData(formData)
  }

  async function postLogData(sendData) {
    const _res = await fetch("/user/add-log", {
      method: "POST",
      headers: {
        Authorization: headers.Authorization
      },
      mode: "cors",
      body: sendData
    })

    const data = await _res.json()
    console.log(data, "-after post log data")
  }

  const projectListItems = ["R & D", "Project 1", "Project 2", "Project 3"]

  return (
    <>
      {isLoading && <Loader />}
      <div className='container-primary'>
        <h3 className='heading-1'>Add Log</h3>
        <div className='log-form-container'>
          <form onSubmit={submitLogHandler}>
            <div className='projct-dropdown'>
              <select id='projectListItems' className='' name='projectName'>
                <option>Select Project</option>
                {projectListItems.map((el, i) => {
                  return (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className='log-description'>
              <label
                htmlFor='logDescription'
                className='heading-2 dis-inline-block'
              >
                Log Description
              </label>
              <textarea
                type='text'
                className=''
                id='logDescription'
                name='logDescription'
                rows='10'
                required
              />
            </div>

            <div className='add-log-button-container'>
              <Button className='button button--primary' type='submit'>
                Submit
              </Button>

              <Button
                onClick={() => navigate("/log-list")}
                className='button btn--secondary'
                type='button'
              >
                Log list
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default AddLog
