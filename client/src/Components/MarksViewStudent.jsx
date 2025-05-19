import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MarksViewStudent = () => {
  const rollno = window.localStorage.getItem("rollno");
  const navigate = useNavigate();
  const [oneone, setoneone] = useState("");
  const [onetwo, setonetwo] = useState("");
  const [twoone, settwoone] = useState("");
  const [twotwo, settwotwo] = useState("");
  const [threeone, setthreeone] = useState("");
  const [threetwo, setthreetwo] = useState("");
  const [fourone, setfourone] = useState("");
  const [fourtwo, setfourtwo] = useState("");
  const [cgpa, setcgpa] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const logout = () => {
    window.localStorage.setItem('loggedIn', false);
    navigate('/student/login');
  }
  const handleSubmit = async () => {
    try {
      const results = await axios.post(
        "http://localhost:3002/student/marks/view",
        {
          rollno,
        }
      );
      const data = results.data;
      alert("Your marks have been displayed");
      setoneone(data.oneone);
      setonetwo(data.onetwo);
      settwoone(data.twoone);
      settwotwo(data.twotwo);
      setthreeone(data.threeone);
      setthreetwo(data.threetwo);
      setfourone(data.fourone);
      setfourtwo(data.fourtwo);
      setBacklogs(data.backlogs);
      setcgpa(data.cgpa);
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || err.message || 'Unknown Error';
      const status = err.reponse?.status || err.status || 500;
      alert(`Error: ${message}`);
    }
  };
  return (
    <div>
      <nav>
        <div id="logoPng" className=" w-50 h-100 d-flex align-items-center">
          <img src="../../logo.png" alt="" className="h-75 ms-5" />
          <Link to='/student/dashboard' className="text-decoration-none ms-5"><h1>Dakshina</h1></Link>
        </div>
        <div id="buttonDiv" className=" h-100 w-25">
          <button className="btn btn-warning text-white" onClick={() => { navigate('/student/dashboard') }}>Dashboard</button>
          <button className="btn btn-danger text-white" onClick={logout}>Log Out</button>
        </div>
      </nav>
      <div
        id="remainingDiv"
        className="  vh-100 d-flex  flex-column justify-content-evenly mt-5"
      >
        <div id="mainDivPart-1" className="d-flex w-100 justify-content-evenly">
          <div id="mainDiv1" className="  h-50">
            <div id="oneoneDiv">
              <p className="text-white">1-1</p>
              <input
                type="text"
                value={oneone}
                disabled
                className="text-danger"
                id="oneone"
              />
            </div>
            <div id="onetwoDiv">
              <p className="text-white">1-2</p>
              <input
                type="text"
                value={onetwo}
                disabled
                className="text-danger"
              />
            </div>
            <div id="twooneDiv">
              <p className="text-white">2-1</p>
              <input
                type="text"
                value={twoone}
                disabled
                className="text-danger"
              />
            </div>
            <div id="twotwoDiv">
              <p className="text-white">2-1</p>
              <input
                type="text"
                value={twotwo}
                disabled
                className="text-danger"
              />
            </div>
          </div>
          <div id="mainDiv2" className=" h-50">
            <div id="threeoneDiv">
              <p className="text-white">3-1</p>
              <input
                type="text"
                value={threeone}
                disabled
                className="text-danger"
              />
            </div>
            <div id="threetwoDiv">
              <p className="text-white">3-2</p>
              <input
                type="text"
                value={threetwo}
                disabled
                className="text-danger"
              />
            </div>
            <div id="fouroneDiv">
              <p className="text-white ">4-1</p>
              <input
                type="text"
                value={fourone}
                disabled
                className="text-danger"
              />
            </div>
            <div id="fourTwoDiv">
              <p className="text-white">4-2</p>
              <input
                type="text"
                value={fourtwo}
                disabled
                className="text-danger"
              />
            </div>
          </div>
        </div>
        <div id="remainingDivv">
          <div id="backlogsDiv">
            <p className="text-white">CGPA:</p>
            <input type="text" value={cgpa} disabled className="text-danger" />
          </div>
          <div id="backlogsDiv">
            <p className="text-white">Backlogs</p>
            <input
              type="text"
              value={backlogs}
              disabled
              className="text-danger"
            />
          </div>
          <button className="btn btn-primary mt-5" onClick={handleSubmit}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksViewStudent;
