import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

function RootComponent() {
  return (
    <div className=''>
      <div className=''>
        <Navbar></Navbar>
      </div>
      <div className=''>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default RootComponent
