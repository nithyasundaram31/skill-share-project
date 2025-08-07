import React, { useState } from 'react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { IoNotificationsOutline } from 'react-icons/io5'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router'
import SideBar from './sideBar'

function NavBar() {
    //store logged in user data in localstorage and get the data here
    const storeUser = JSON.parse(localStorage.getItem("user"))
    console.log(storeUser)

    const [openDropdown, setOpenDropdown] = useState(false)
const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown)  // To toggle (open/close on click): (!openDropdown)
    }


    const toggleMobileMenu=()=>{
setOpenMobileMenu(!openMobileMenu)
    }
    return (
        <>
            <div className='relative z-[10]'>

                <div className=' w-full  h-16 bg-white  shadow-md p-4 pr-8 '>
                    <div className='flex  flex  justify-between   gap-1'>
                        <div className=' '>

                            <FaBars
                                className="text-2xl cursor-pointer md:hidden "
                              onClick={toggleMobileMenu}
                            />
                        </div>
                        <div className=' flex justify-center items-center gap-2 md:gap-0'>
                            <IoNotificationsOutline size={22} className='md:mr-2' />

                            <div className='text-green-600 md:mr-2 font-semibold'>Hi, {storeUser.name.toUpperCase()}</div>
                            <MdAccountCircle className='md:mr-2  w-10 h-10 text-2xl cursor-pointer' title="Profile" />
                            < FaChevronDown className='' onClick={toggleDropdown} />
                            {openDropdown && (
                                <div className=' bg-white shadow  p-4 md:w-[12%]  w-[20%] absolute z-20 top-14  right-6  flex flex-col justify-center  '>
                                    <Link className='mb-2 font-semibold hover:text-blue-600 cursor-pointer'> Profile</Link>
                                    <hr className='mb-2  font-semibold ' />
                                    <Link className='font-semibold hover:text-blue-600 cursor-pointer'>Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>




                </div>
            </div>
               <SideBar openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu}/>
        </>
     
    )
}

export default NavBar