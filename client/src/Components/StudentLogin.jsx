import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const StudentLogin = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleStudentLogin = async () => {
    try {
      if (!rollno || !password) {
        const err = new Error("Enter all fields");
        err.status = 400; 
        throw err;
      }
      const results = await axios.post("http://localhost:3002/student/login", {
        rollno,
        password,
      });
      window.localStorage.setItem("rollno", rollno);
      if (results.data?.message === "login successful") {
        alert("Login Successful");
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("role", "student");
        navigate("/student/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Unknown Error";
      const status = err.response?.status || err.status || 500;
      alert(`Error: ${message}\nStatus Code: ${status}`);
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <div
        id="mainDiv"
        className="border border-danger d-flex justify-content-evenly flex-column align-items-center h-50 w-25"
      >
        <h1 className="text-white">Student Login</h1>
        <div id="rollDiv">
          <p className="text-white">Roll Number:</p>
          <input
            type="text"
            id="rollno"
            value={rollno}
            onChange={(e) => {
              setRollno(e.target.value);
            }}
          />
        </div>
        <div id="passwordDiv">
          <p className="text-white">Password:</p>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleStudentLogin}>Login</button>
      </div>
      <Link to='/login' className="text-decoration-none text-white">Back to Main Login Page</Link>
    </div>
  );
};

export default StudentLogin;
