import React from 'react'
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'


function UserDashboard() {
  return (
    <>
    <NavBar/>
    <SideBar/>
     <div className="p-4 ">
          <Outlet /> {/* Show nested page here */}
        </div>
    </>
  )
}

export default UserDashboard