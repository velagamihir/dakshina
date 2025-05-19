import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const LoggedOutProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem('loggedIn');
    const role = window.localStorage.getItem('role');
    if (isLoggedIn === false) {
        return <Outlet/>
    }
    else if (isLoggedIn) {
        if (role === 'admin') {
            return <Navigate to=' /admin/dashboard'/>
        }
        else if (role === 'student') {
            return <Navigate to='/student/dashboard'/>
        }
    }   
    return <Navigate to='/'/>
}

export default LoggedOutProtectedRoute
