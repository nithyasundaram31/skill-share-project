import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'

import AdminDashboardPage from './pages/admin/adminDashboardPage'
import UserDashboard from './pages/user/UserDashboard'
import UserDashboardPage from './pages/user/UserDashboardPage'
import TermPage from './pages/admin/TermPage'
import CategoryPage from './pages/admin/CategoryPage'
import ResourcePage from './pages/admin/ResourcePage'


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
          {/* Add more nested admin routes here if needed */}
        </Route>
         
          <Route path="/user" element={< UserDashboard/>}>
          <Route path="dashboard" element={<UserDashboardPage />} />

          {/* Add more nested admin routes here if needed */}
        </Route>


    </Routes>


    <ToastContainer/>
    </>
   
  )
}

export default App
