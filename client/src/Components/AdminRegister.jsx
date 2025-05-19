import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AdminRegister = () => {
  const navigate = useNavigate();
  const [staffid, setStaffid] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const handleAdminRegister = async () => {
    try {
      if (!staffid || !password || !department || !designation) {
        const err = new Error("Enter all the fields");
        err.status = 404;
        throw err;
      }
      console.log(`Email: ${email}`);
      const results = await axios.post("http://localhost:3002/admin/register", {
        staffid,
        password,
        department,
        designation,
        email,
      });
      navigate("/signup/verify");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Unknown Error";
      const status = err.response?.status || err.statusCode || 500;
      alert(`Message: ${message}\nError Code: ${status}`);
      console.log(message);
    }
  };
  return (
    <div className="d-flex flex-column h-100 w-100 align-items-center justify-content-center">
      <h1>Admin Register</h1>
      <div
        id="adminRegisterDiv"
        className="border border-danger d-flex flex-column justify-content-around align-items-center w-25 "
      >
        <div id="staffidDiv">
          <p className="text-white">Staff Id:</p>
          <input
            type="text"
            value={staffid}
            placeholder="Staff ID"
            id="staffid"
            onChange={(e) => {
              setStaffid(e.target.value);
            }}
          />
        </div>
        <div id="passwordDiv">
          <p className="text-white">Password:</p>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div id="emailDiv">
          <p className="text-white">Email:</p>
          <input
            type="email"
            value={email}
            id="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div id="departementDiv">
          <p className="text-white">Department:</p>
          <select
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            id="department"
            value={department}
          >
            <option value="" selected hidden disabled>
              Select
            </option>
            <option value="CSE">CSE</option>
            <option value="CSM">CSM</option>
            <option value="AIML">AIML</option>
            <option value="CAI">CAI</option>
          </select>
        </div>
        <br />
        <div id="designationDiv">
          <p className="text-white">Designation:</p>
          <select
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
            id="designation"
          >
            <option value="" selected hidden disabled>
              Select
            </option>
            <option value="astProf">Assistant Professor</option>
            <option value="assoProf">Associate Professor</option>
            <option value="prof">Professor</option>
            <option value="deo">DEO</option>
            <option value="nonTeachingStaff">Non Teaching Staff</option>
            <option value="hod">HOD</option>
          </select>
        </div>
        <button
          className="btn btn-success mt-4 mb-5"
          onClick={handleAdminRegister}
        >
          Sign Up
        </button>
      </div>
      <Link to="/register" className="text-decoration-none text-white">
        Back to Main Sign Up Page
      </Link>
    </div>
  );
};

export default AdminRegister;
