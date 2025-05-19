import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import StudentRegister from "./Components/StudentRegister";
import AdminRegister from "./Components/AdminRegister";
import OtpVerify from "./Components/OtpVerify";
import StudentLogin from "./Components/StudentLogin";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import StudentProtectedRoute from "./Components/StudentProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import StudentFeedback from "./Components/StudentFeedback";
import KYF from "./Components/KYF";
import ChangeDisci from "./Components/ChangeDisci";
import AdminSendReport from "./Components/AdminSendReport";
import MarksViewStudent from "./Components/MarksViewStudent";
import EnterMarks from "./Components/EnterMarks";
const App = () => {
  return (
    <div>
      <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<StudentRegister />} path="/student/register"></Route>
          <Route element={<AdminRegister />} path="/admin/register"></Route>
          <Route element={<OtpVerify />} path="/signup/verify"></Route>
          <Route element={<StudentLogin />} path="/student/login"></Route>
          <Route element={<AdminLogin />} path="/admin/login"></Route>
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminDashboard />} path="/admin/dashboard"></Route>
          <Route element={<AdminSendReport />} path="/admin/send/disciplineReport"></Route>
          <Route element={<EnterMarks/>} path="/admin/marks/update"></Route>
        </Route>
        <Route element={<StudentProtectedRoute />}>
          <Route
            element={<StudentDashboard />}
            path="/student/dashboard"
          ></Route>
          <Route element={<StudentFeedback />} path="/student/feedback"></Route>
          <Route element={<KYF />} path="/student/kyf"></Route>
          <Route element={<ChangeDisci />} path="/student/request/disciplineRecord"></Route>
          <Route element={<MarksViewStudent/>} path="/student/marks/view"></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
