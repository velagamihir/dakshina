import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AdminSendReport = () => {
  const [rollno, setRollno] = useState("");
  const [record, setRecord] = useState("");
  const [dateofoffence, setDate] = useState("");
  const [suggestionsgiven, setSuggestions] = useState("");
  const [actionstaken, setActions] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    navigate("/admin/login");
  };
  const handleSubmit = async () => {
    try {
      const staffid = window.localStorage.getItem('staffid');
      const results = await axios.post(
        "http://localhost:3002/admin/send/DisciplineReport",
        {
          rollno,
          staffid,
          record,
          dateofoffence,
          suggestionsgiven,
          actionstaken,
        }
      );
      console.log(results)
      alert("Discipline Record added");
    } catch (err) {
      const message = err.response?.data?.message;
      const status = err.response?.status || err.status || 500;
      alert(`Error: ${message}\nError Code: ${status}`);
    }
  };
  return (
    <div>
      <nav>
        <div id="logoDiv" className="w-25 h-100">
          <img src="../../logo.png" alt="" className="h-50 w-25" />
          <Link
            to="/admin/dashboard"
            className="text-decoration-none d-flex flex-row justify-content-evenly"
          >
            <h1>Dakshina</h1>
          </Link>
        </div>
        <div id="buttonDiv">
          <button
            onClick={() => {
              navigate("/admin/dashboard");
            }}
            className="btn btn-warning text-white"
          >
            Dashboard
          </button>
          <button onClick={logout} className="btn btn-danger text-white">
            {" "}
            Log Out
          </button>
        </div>
      </nav>
      <div
        id="mainRemainingDiv"
        className=" vh-100 d-flex justify-content-center mt-5"
      >
        <div
          id="remainingDiv"
          className="d-flex flex-column h-75 justify-content-evenly align-items-center w-50 border border-danger"
        >
          <div id="rollnoDiv">
            <p className="text-white">Enter the roll number of the student:</p>
            <input
              type="text"
              id="rollno"
              value={rollno}
              onChange={(e) => {
                setRollno(e.target.value);
              }}
            />
          </div>
          <div id="recordDiv">
            <p className="text-white">
              Enter the discipline report of the student:
            </p>
            <input
              type="text"
              value={record}
              onChange={(e) => {
                setRecord(e.target.value);
              }}
            />
          </div>
          <div id="datediv">
            <p className="text-white">Enter the date of the offence:</p>
            <input
              type="date"
              id="date"
              value={dateofoffence}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div id="suggestionsDiv">
            <p className="text-white">Suggestions for the student:</p>
            <input
              type="text"
              id="suggestions"
              value={suggestionsgiven}
              onChange={(e) => {
                setSuggestions(e.target.value);
              }}
            />
          </div>
          <div id="actionsDiv">
            <p className="text-white">
              Enter the actions taken against the student:
            </p>
            <input
              type="text"
              id="actions"
              value={actionstaken}
              onChange={(e) => {
                setActions(e.target.value);
              }}
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSendReport;
