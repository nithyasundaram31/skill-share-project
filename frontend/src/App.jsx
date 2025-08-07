import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/adminDashboard'
import SideBar from './components/sideBar'
import AdminDashboardPage from './pages/admin/adminDashboardPage'
import UserDashboard from './pages/user/UserDashboard'
import UserDashboardPage from './pages/user/UserDashboardPage'


function App() {
  return (
    <>
     <Routes>
      {/* Redirect from root to /register */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Actual register route */}
      <Route path="/register" element={<RegisterPage />} />
 <Route path="/login" element={<LoginPage />} />
     
      <Route path="/admin" element={< AdminDashboard/>}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
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
