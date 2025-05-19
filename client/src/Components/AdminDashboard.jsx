import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.setItem("loggedIn", "false");
    navigate("/admin/login");
  };
  return (
    <div className="border border-primary">
      <nav className="">
        <div
          id="logodiv"
          className="d-flex flex-row h-100 w-25 align-items-center justify-content-evenly "
        >
          <img src="../logo.png" alt="src" className="w-25 h-50" />
          <Link to="/admin/dashboard" className="text-decoration-none">
            <h1>Dakshina</h1>
          </Link>
        </div>
        <div
          id="buttonsDiv"
          className=" h-100 w-50 d-flex flex-row justify-content-end align-items-center me-4"
        >
          <button onClick={logout} className="btn btn-danger">
            Log Out
          </button>
        </div>
      </nav>
      <div id="features" className="vh-100 border border-primary">
        <div id="mainDiv1" className="border border-warning h -50 d-flex flex-row justify-content-evenly w-100">
          <Link to="/admin/send/disciplineReport" className="text-decoration-none">
            <div
              id="addDisciplineRecord"
              className="h-100 w-75 border border-danger d-flex flex-column align-items-center "
            >
              <img src="../discipline.png" alt="" className="w-25" />
              <br />
              <ol className="text-white">
                <li>
                  Maintains a single, comprehensive discipline record per
                  student to track their overall behavioral summary.
                </li>
                <br />
                <li>
                  Only Faculty can update the discipline record of a student,
                  depending upon his/her behaviour in the college.
                </li>
                <br />
                <li>
                  The action was taken against the student is also mentioned in
                  the record.
                </li><br />
                <li>You can also update the discipline record of a student.</li>
                <br />
              </ol>
            </div>
          </Link>
          <Link to='/admin/marks/update' className="text-decoration-none text-white border border-danger w-50">
            <div className="border border-warning h-100 d-flex flex-column align-items-center justify-content-evenly">
              <img src="../../marks.png" alt="" className="w-25 mt-2"/>
              <ol>
                <li>Click here to update the marks of a particular student</li><br />
                <li>Press the check button to check if the records of the student exist.</li><br />
                <li>If exists type the marks that need to be updated then press update,<br /> else enter all the marks.</li>
              </ol>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
