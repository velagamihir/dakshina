import React from "react";
import styles from '../CSS/Home.css'
import { Link, Route, Routes, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="mainDiv">
      <nav>
        <div id="logoDiv">
          <img src="./logo.png" alt="logo" id="logoNavBar" />
          <h1 id="mainHeading">
            <Link to="/">Dakshina</Link>
          </h1>
        </div>
        <div id="buttonDiv">
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Signup
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </nav>
      <div id="featuresDiv">
        <div id="feature1" className="features">
          <div id="logo">
            <img
              src="/userauthentication.png"
              alt="userauthentication"
              id="userauthentication"
              className="featureLogos"
            />
            <ol>
              <li>
                Dakshina has user authentication feature that allows users to
                access sensitive content with utmost security.
              </li>
              <br />
              <li>
                The user authentication of <i>Dakshina</i> safeguards user data
                and maintains integrity of the platform, providing a secure and
                seamless login experience.
              </li>
              <br />
              <li>
                A smooth registration process helps new users sign up with ease
                while maintaining security checks.
              </li>
              <br />
              <li>
                Sessions are efficiently managed to prevent unauthorized access
                and ensure a smooth experience for returning users.
              </li>
            </ol>
          </div>
        </div>
        <div id="feature2" className="features">
          <div id="logo">
            <img
              src="/rbac.png"
              alt="rbac"
              className="featureLogos"
              id="rbac"
            />
            <ol>
              <li>
                <i>Dakshina</i> distinguishes between Students, Teachers and
                Admins, assigning each a specific set of permissions.
              </li>
              <br />
              <li>
                Each user only sees and interacts with the modules that they are
                authorized for, ensuring data privacy and clarity.
              </li>
              <br />
              <li>
                Teachers can enter and manage marks, track student behaviour,
                and view subject-related dashboards.
              </li>
              <br />
              <li>
                RBAC limits the risk of unauthorized changes or data exposure by
                enforcing strict boundaries across user roles.
              </li>
            </ol>
          </div>
        </div>
        <div id="feature3" className="features">
          <div id="logo">
            <img
              src="/academicCalender.png"
              alt="academic calender"
              id="academicCalender"
              className="featureLogos"
            />
            <ol>
              <li>
                A unified view of important academic events like exams, results
                dates, assignment submissions, and holidays.
              </li>
              <br />
              <li>
                Students and Teachers receive clear indicators for upcoming
                tasks, helping them stay organized and punctual.
              </li>
              <br />
              <li>
                Teachers can add, edit, or remove events and set custom
                deadlines for marks entry, discipline records, updates etc.
              </li>
              <br />
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
