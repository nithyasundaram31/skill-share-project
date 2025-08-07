import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/adminDashboard'
import SideBar from './components/sideBar'


function App() {
  return (
    <>
     <Routes>
      {/* Redirect from root to /register */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Actual register route */}
      <Route path="/register" element={<RegisterPage />} />
 <Route path="/login" element={<LoginPage />} />
     {/* <Route path="/admin" element={<SideBar />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route> */}
        <Route path="/user/dashboard" element={<AdminDashboard/>} />
    </Routes>
    <ToastContainer/>
    </>
   
  )
}

export default App
