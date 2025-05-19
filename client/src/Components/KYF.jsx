import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const KYF = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [staffid, setStaffid] = useState("");

  const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    navigate("/student/login");
  };
  const handleKYF = async () => {
    try {
      if (!email) {
        const err = new Error("Enter all fields");
        err.status = 400;
        throw err;
      }
      const results = await axios.post("http://localhost:3002/student/kyf", {
        email,
      });
      console.log(results.data?.staffid)
      setStaffid(results.data?.staffid);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      const status = err.response?.status || err.statusCode || 500;
      alert(`Error: ${message}`);
    }
  };
  return (
    <div>
      <nav>
        <div id="logoDiv" >
          <img src="../logo.png" alt="logo" className="w-25" />
          <Link to='/student/dashboard' className="text-decoration-none"><h1>DAKSHINA</h1></Link>
        </div>
        <button onClick={logout} className="btn btn-danger text-white">Log Out</button>
      </nav>
      <div className="d-flex vh-100 justify-content-center align-items-center flex-row">
        <div
          id="mainDiv"
          className="border border-danger w-25 h-50 d-flex flex-column justify-content-evenly align-items-center"
        >
          <h1>Know Your Faculty</h1>
          <div id="emailDiv">
            <p className="text-white">Enter the email of the faculty:</p>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <button onClick={handleKYF}>Find Out</button>
          <div id="staffId">
            <p className="text-white">Staff Id (will be generated):</p>
            <input
              type="text"
              id="staffid"
              value={staffid}
              onChange={(e) => {
                setStaffid(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYF;
