import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn');
    const role = window.localStorage.getItem('role');

  return (isLoggedIn==='true' && role==='admin')?<Outlet/>:<Navigate to='/admin/login'/>
}

export default AdminProtectedRoute
