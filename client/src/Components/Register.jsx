import React from "react";
import "../CSS/register.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav id="registerNav">
        <div id="logoDivRegister">
          <img src="./logo.png" alt="logo" id="logoNavBarRegister" />
          <h1 id="mainHeadingRegister">
            <Link to="/">Dakshina</Link>
          </h1>
        </div>
      </nav>
      <div
        id="remainingDiv"
        className="d-flex flex-column align-items-center vh-100 mt-5"
      >
        <div
          id="mainRegisterButtonDiv"
          className="border border-danger h-50 w-25 d-flex flex-column align-items-center justify-content-evenly"
        >
          <h1>Register</h1>
          <div id="buttonsDiv" className="h-50 d-flex flex-column justify-content-evenly w-50 align-items-center">
            <button
              onClick={() => {
                navigate("/student/register");
              }}
            >
              Student
            </button>
            <button
              onClick={() => {
                navigate("/admin/register");
              }}
            >
              Admin
            </button>
          </div>
        </div>
        <Link to="/login" className="text-white text-decoration-none">
          Have an account? Log In
        </Link>
      </div>
    </>
  );
};

export default Register;
