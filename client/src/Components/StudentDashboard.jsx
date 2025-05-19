import React from "react";
import { Link, useNavigate } from "react-router-dom";
const StudentDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.setItem("loggedIn", false);
    navigate("/student/login");
  };
  return (
    <div className="overflow-auto">
      <nav className="d-flex justify-content-between vw-100">
        <div id="logoDiv" className="h-100">
          <img src="./../logo.png" alt="logo" className="w-25" />
          <Link
            to="/student/dashboard"
            className="text-white text-decoration-none"
          >
            <h1>DAKSHINA</h1>
          </Link>
        </div>
        <button className="btn btn-danger me-5" onClick={logout}>
          Logout
        </button>
      </nav>
      <br />
      <div
        id="features"
        className="vw-100 vh-100 d-flex flex-column justify-content-evenly "
      >
        <div id="mainDiv1" className="d-flex justify-content-evenly">
          <Link to="/student/feedback" className="text-decoration-none">
            <div
              id="studentFeedbackDiv"
              className="border border-danger vw-50 h-100 d-flex flex-column"
            >
              <img
                src="../feedback.png"
                alt="feedback logo"
                className="w-25 h-25 mt-2 align-self-center"
              />{" "}
              <br />
              <div id="remainingDiv">
                <p className="text-white">
                  <ol className="text-decoration-none">
                    <li className="text-decoration-none">
                      Click here to enter the feedback about various faculty.
                    </li>
                    <br />
                    <br />
                    <li className="text-decoration-none">
                      Remember that, your feedback is absolutely anonymous.
                    </li>
                    <br />
                    <br />
                    <li className="text-decoration-none">
                      The review can be viewed by that particular faculty only,
                      and the sender is anonymous
                    </li>
                  </ol>
                </p>
              </div>
            </div>
          </Link>
          <Link to="/student/kyf" className="text-decoration-none ml-5">
            <div
              id="kyfDiv"
              className="border border-danger d-flex flex-column h-100 vw-50 ml-5"
            >
              <img
                src="../faculty.png"
                alt="faculty"
                className="w-25 h-25 mt-2 align-self-center"
              />{" "}
              <br />
              <div id="remainingDiv">
                <p className="text-white">
                  <ol>
                    <li>Click here to identify the Staff Id of a faculty.</li>{" "}
                    <br />
                    <li>
                      You have to know the Electronic Mail of the particular
                      faculty to know his details
                    </li>{" "}
                    <br />
                    <li>
                      You can use this Staff Id to send a feedback to the
                      faculty.
                    </li>{" "}
                    <br />
                  </ol>
                </p>
              </div>
            </div>
          </Link>
          <br />
        </div>
        <div
          id="mainDiv2"
          className=" mt-5 d-flex flex-row justify-content-evenly"
        >
          <div
            id="requestDisciplineRecord"
            className="border border-danger vw-50 h-100 d-flex flex-column align-items-center"
          >
            <Link
              to="/student/request/disciplineRecord"
              className="text-decoration-none text-white align-items-center"
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src="../discipline.png"
                  alt="discipline record logo"
                  className="w-25 h-25 mt-2 align-self-center"
                />
                <br />
                <div id="remainingDiv">
                  <ol>
                    <li>You can request to change your discipline record.</li>
                    <br />
                    <li>
                      With each and every Discipline Record that you receive in
                      your mail, an unique id is generated.
                    </li>
                    <br />
                    <li>This Discipline Record can affect your career</li>
                    <br />{" "}
                  </ol>
                </div>
              </div>
            </Link>
          </div>
          <div id="viewMarksDiv" className="border border-danger w-50">
            <Link to="/student/marks/view" className="text-decoration-none text-white">
              <div id="remainingDiv" className="d-flex flex-column align-items-center">
                <img src="../../marks.png" alt="marksImg" className="w-25 mt-2"/><br />
                <ol>
                  <li>
                    Click here tow view all the marks consolidated obtained by
                    you.
                  </li>
                  <br />
                  <li>You can only view your own marks.</li>
                  <br />
                  <li>
                    Remember that trying to view the marks of other student can
                    get you suspended
                  </li>
                </ol>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
