import React from 'react'
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'


function UserDashboard() {
   return (
     <div className="flex">
       <SideBar />
       <div className="flex-1">
         <NavBar />
         <div className="p-4 mt-14  lg:ml-[11%] ">
  <Outlet />
</div>
       </div>
     </div>
   );
}

export default UserDashboard