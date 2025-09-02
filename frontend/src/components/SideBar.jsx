import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FiLogOut } from 'react-icons/fi';
import {  FaFolderOpen, FaThList, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdEventNote } from 'react-icons/md';
import { Link,  } from 'react-router-dom';



function SideBar({ openMobileMenu, setOpenMobileMenu , handleLogout}) {

  const roleInfo = JSON.parse(localStorage.getItem('user'))

  console.log("roleinfo user details is:",roleInfo)



  const closeButton = () => {
    setOpenMobileMenu(false); //default toggle close so wheni click the close btn it close

  }    

  return (
    <>
      {/* // mobile devices small screen sidebar will close. md screen will show when we block */}

      {/* <div
        className={`fixed  top-0 left-0 z-50 bg-white shadow-md h-full p-6
      ${openMobileMenu ? "block" : "hidden"} md:block w-[40%] md:w-[15%] `}

      > */} 

      <div
  className={`fixed top-0 left-0 z-50 bg-white shadow-md h-full p-6
  ${openMobileMenu ? "block" : "hidden"} md:block 
  w-[50%] sm:w-[50%] md:w-[20%] lg:w-[16%] xl:w-[15%]`}
>

        <FaTimes onClick={closeButton} className='md:hidden ' />
        <div className='flex justify-center items-center'>
          <img src={logo} alt="Logo" className="w-24 h-20 flex justify-center items-center" />
        </div>

        <ul className='flex flex-col justify-center  font-semibold text-lg mt-12  gap-4 '>
          {roleInfo?.role === 'admin' && (
            <>
              <li className='flex items-center gap-3'>
                <MdDashboard className='text-xl' /><Link to='/admin/dashboard'>Dashboard</Link>
              </li>

              <li className='flex items-center gap-3'>
                <MdEventNote className='text-xl' /><Link to='/admin/dashboard/terms'>Terms</Link>
              </li>

              <li className='flex items-center gap-3'>
                <FaThList className='text-xl' /> <Link to='/admin/dashboard/category'>Category</Link>
              </li>

              <li className='flex items-center gap-3'>
                <FaFolderOpen className='text-xl' /><Link to='/admin/dashboard/resource'>Resource</Link>
              </li>

              <li className='flex items-center gap-3'>
                <FiLogOut className='text-xl' /><button onClick={handleLogout}> Logout</button>
              </li>

            </>
            
          )}


          {roleInfo?.role==='user'&&(
           <>
              <li className='flex items-center gap-3'>
                <MdDashboard className='text-xl' /><Link to='/user/dashboard'>Dashboard</Link>
              </li>

              <li className='flex items-center gap-3'>
                <MdEventNote className='text-xl' /><Link  to='/user/dashboard/resource'>My Resources </Link>
              </li>

              <li className='flex items-center gap-3'>
                <FaThList className='text-xl' /> <Link  to={`/user/dashboard/bookmark/${roleInfo.id}`}>Bookmarked</Link>
              </li>

              <li className='flex items-center gap-3'>
                <FaFolderOpen className='text-xl' /><Link>Profile</Link>
              </li>

             

            </>
        ) }


        </ul>

         
      </div>
 

    </>

  );

}

export default SideBar;
