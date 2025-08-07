import React from 'react'
import SideBar from '../../components/sideBar'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router'


function AdminDashboard() {
  return (
    <>
    <NavBar/>
    <SideBar/>
     <div className="p-4">
          <Outlet /> {/* Show nested page here */}
        </div>
    </>
  )
}

export default AdminDashboard