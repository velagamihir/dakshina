import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [staffid, setStaffid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleAdminLogin = async () => {
    try {
      if (!staffid || !password) {
        const err = new Error("Enter all the fields");
        err.statusCode = 400;
        throw err;
      }
      const results = await axios.post("http://localhost:3002/admin/login", {
        staffid,
        password,
      });
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("role", "admin");
      window.localStorage.setItem("staffid", staffid);
      navigate("/admin/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      const status = err.response?.status || err.status || 500;
      alert(`Error: ${message}\nError Code: ${status}`);
    }
  };
  return (
    <div className="border border-primary d-flex vh-100 justify-content-center align-items-center flex-column">
      <div
        id="mainDiv"
        className="border border-danger d-flex justify-content-evenly flex-column align-items-center h-50 w-25"
      >
        <h1 className="text-white">Admin Login</h1>
        <div id="staffidDiv">
          <p className="text-white">Staff Id:</p>
          <input
            type="text"
            placeholder="Staff Id"
            value={staffid}
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleAdminLogin}>Login</button>
      </div>
      <Link to="/login" className="text-decoration-none text-white">
        Back to Main Login Page
      </Link>
    </div>
  );
};

export default AdminLogin;
