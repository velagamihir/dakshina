import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Home.css'
const Login = () => {
  const navigate=useNavigate()
  return (
    <div>
      <nav id="loginNav" className="h-25">
        <div
          id="logoLogin"
          className="ml-1 d-flex flex-row justify-content-between align-items-center w-25"
        >
          <img
            src="./logo.png"
            alt="logo"
            id="logoNavBarLogin"
            className="w-25"
          />
          <h1>
            <Link to="/" className="text-white text-decoration-none">
              Dakshina
            </Link>
          </h1>
        </div>
      </nav>
      <div
        id="mainDiv"
        className="vh-100 d-flex justify-content-center align-items-center flex-column"
      >
        <div className="border border-danger w-25 h-50 d-flex flex-column align-items-center justify-content-evenly">
          <h1>Login</h1>
          <button
            onClick={() => {
              navigate("/student/login");
            }}
          >
            Student
          </button>
          <button
            onClick={() => {
              navigate("/admin/login");
            }}
          >
            Admin
          </button>
        </div>
        <Link to="/register" className='text-white text-decoration-none'>Want to create a new account? Sign up</Link>
      </div>
    </div>
  );
}

export default Login
