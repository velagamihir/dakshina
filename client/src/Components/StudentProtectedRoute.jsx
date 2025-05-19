import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const StudentProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn');
    const role = window.localStorage.getItem('role');
  return (isLoggedIn==='true' && role==='student')?<Outlet/>:<Navigate to='/student/login'/>
}

export default StudentProtectedRoute
