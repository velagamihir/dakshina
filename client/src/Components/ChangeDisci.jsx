import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const ChangeDisci = () => {
  const [id, setId] = useState("");
  const [req, setReq] = useState("");
  const rollno = window.localStorage.getItem("rollno");
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    navigate("/student/login");
  };
  const handlesubmit = async () => {
    try {
      alert(`Request sent for ID: ${id}`);
      const results = await axios.post(
        "http://localhost:3002/student/request/disciplineRecord",
        {
          id,
          req,
          rollno,
        }
      );
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      const status = err.response?.status || err.status || 500;
      console.log(message);
      alert(`Error: ${message}`);
    }
  };
  return (  
    <div id="mainDiv">
      <nav>
        <div id="logoDiv" className="w-25 h-100">
          <img src="../../logo.png" alt="" className="w-25 h-75" />
          <Link
            to="/student/dashboard"
            className="text-white text-decoration-none"
          >
            <h1>Dakshina</h1>
          </Link>
        </div>
        <div id="buttonDiv" className="h-100">
          <button
            className="btn btn-warning text-white"
            onClick={() => {
              navigate("/student/dashboard");
            }}
          >
            Dashboard
          </button>
          <button className="btn btn-danger text-white" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
      <div
        id="remainingDiv"
        className="vh-100 d-flex justify-content-center align-items-center"
      >
        <div
          id="changeDiv"
          className="border border-warning h-50 w-25 d-flex flex-column justify-content-evenly align-items-center"
        >
          <div id="idDiv">
            <p className="text-white">ID:</p>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div id="request">
            <p className="text-white">Describe your request:</p>
            <input
              type="text"
              id="request"
              onChange={(e) => {
                setReq(e.target.value);
              }}
              value={req}
            />
          </div>
          <button className="btn btn-success" onClick={handlesubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDisci;
