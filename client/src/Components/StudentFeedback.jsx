import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const StudentFeedback = () => {
  const navigate = useNavigate();
  const [staffid, setStaffid] = useState("");
  const [feedback, setFeedback] = useState("");
  const logout = () => {
    window.localStorage.setItem('loggedIn', false);
    navigate('/student/login')
  }
  const handleFeedback = async () => {
    try {
      const rollno = window.localStorage.getItem('rollno')
      if (!staffid || !feedback) {
        const err = new Error('Enter all fields');
        err.statusCode = 404;
        throw err;
      }
      const results = await axios.post('http://localhost:3002/student/feedback', {
        staffid,
        feedback,
        rollno
      })
      alert('Feedback sent!')
    }
    catch (err) {
      const message = err.response?.data?.message || err.message || 'Internal Server Error';
      const status = err.response?.status || err.statusCode || 500;
      alert(`Error: ${message}`);
    }
  };
  return (
    <div>
      <nav className="">
        <div id="logoDiv" >
          <img src="../logo.png" alt="" className="w-25" />
          <Link to='/student/dashboard' className="text-white text-decoration-none"><h1>DAKSHINA</h1></Link>
        </div>
        <div id="buttonsDiv" className="w-25 d-flex flex-row justify-content-evenly">
          <button onClick={logout}>Logout</button>
          <button onClick={()=>{navigate('/student/dashboard')}}>Dashboard</button>
        </div>
      </nav>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div
          id="mainDiv"
          className="border border-success w-25 d-flex flex-column align-items-center justify-content-evenly h-50"
        >
          <div id="staffidDiv">
            <p className="text-white">Staffid of the Faculty:</p>
            <input
              type="text"
              onChange={(e) => {
                setStaffid(e.target.value);
              }}
              id="staffid"
              placeholder="Staff Id"
              value={staffid}
            />
          </div>
          <div id="feedbackDiv" className="ml-1">
            <p className="text-white">Feedback (in less than '20' words):</p>
            <input
              type="text"
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
              id="feedback"
              value={feedback}
              placeholder="Feedback"
            />
          </div>
          <button
            onClick={handleFeedback}
            className="btn btn-outline-danger text-white h-25 w-50 mt-5"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
