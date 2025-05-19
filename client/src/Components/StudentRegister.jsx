import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const StudentRegister = () => {
  const navigate = useNavigate();
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [sem, setSem] = useState("");
  const [department, setDepartment] = useState("");
  const handleStudentRegister = async () => {
    try {
      if (!rollno || !password || !email || !year || !sem || !department) {
        const err = new Error("Enter all the fields");
        err.status = 404;
        throw err;
      }
      console.log(window.localStorage.getItem("loggedIn"));
      const results = await axios.post(
        "http://localhost:3002/student/register",
        {
          rollno,
          password,
          email,
          year,
          sem,
          department,
        }
      );
      navigate("/signup/verify");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      const status = err?.response?.status || err.statusCode || 500;
      console.log(message);
      alert(`Error: ${message}\nStatus: ${status}`);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 mt-5">
      <h1>Student Register</h1>
      <div
        id="studentRegisterDiv"
        className="d-flex flex-column justify-content-around align-items-center border border-danger w-25"
      >
        <div id="rollnumberDiv">
          <p className="text-white">RollNumber:</p>
          <input
            type="text"
            required
            placeholder="Roll Number"
            value={rollno}
            id="rollno"
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div id="emailDiv">
          <p className="text-white">Email:</p>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div id="yearDiv">
          <p className="text-white">Year:</p>
          <select
            id="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Select
            </option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Final Year</option>
          </select>
        </div>
        <div id="semDiv">
          <p className="text-white">Sem:</p>
          <select
            id="sem"
            value={sem}
            onChange={(e) => {
              setSem(e.target.value);
            }}
          >
            <option value="" disabled hidden selected>
              Select
            </option>
            <option value="1">First Sem</option>
            <option value="2">Second Sem</option>
          </select>
        </div>
        <div id="departmentDiv">
          <p className="text-white">Department:</p>
          <select
            id="department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Select
            </option>
            <option value="cse">CSE</option>
            <option value="CSM">CSM</option>
            <option value="CAI">CAI</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
          </select>
        </div>
        <button
          className="btn btn-success mt-4 mb-2"
          onClick={handleStudentRegister}
        >
          Sign up
        </button>
      </div>
      <Link to="/register" className="text-decoration-none text-white">
        Back to Main Sign Up Page
      </Link>
    </div>
  );
};

export default StudentRegister;
