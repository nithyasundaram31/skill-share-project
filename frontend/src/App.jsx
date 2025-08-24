import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'

import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import UserDashboard from './pages/user/UserDashboard'
import UserDashboardPage from './pages/user/UserDashboardPage'
import TermPage from './pages/admin/TermPage'
import CategoryPage from './pages/admin/CategoryPage'
import ResourcePage from './pages/admin/ResourcePage'

import ResourceCard from './components/ResourceCard'
import VideoPage from './pages/admin/VideoPage'
import Profile from './components/Profile'
import BookMarkPage from './pages/user/BookMarkPage'


function App() {
  return (
    <>
     <Routes>
      {/* Redirect from root to /register */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Actual register route */}
      <Route path="/register" element={<RegisterPage />} />
 <Route path="/login" element={<LoginPage />} />
     
      <Route path="/admin/dashboard" element={< AdminDashboard/>}> //absolute path
          <Route path="" element={<AdminDashboardPage />} />
          <Route path="terms" element={<TermPage />} />
          <Route path="category" element={< CategoryPage/>} />
            <Route path="resource" element={< ResourcePage  />} />
           <Route path='profile/:id' element={<Profile/>}/>
   
    
 
            
          {/* Add more nested admin routes here if needed */}
        </Route>
         
          <Route path="/user/dashboard" element={< UserDashboard/>}>
          <Route path="" element={<UserDashboardPage />} />
           <Route path='profile/:id' element={<Profile/>}/>
            <Route path="resource" element={< ResourcePage  />} />
               <Route path="bookmark" element={< BookMarkPage  />} />
   

                  {/* Public resources */}
          {/* Add more nested admin routes here if needed */}
        </Route>

 <Route path="/video/:id" element={<VideoPage />} />
    </Routes>


    <ToastContainer/>
    </>
   
  )
}

export default App
