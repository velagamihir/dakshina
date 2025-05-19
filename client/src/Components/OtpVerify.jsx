import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");
  const handleOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3002/signup/verify", {
        otp,
        email,
      });
      alert(JSON.stringify(response.data?.message));
      if (JSON.stringify(response?.data?.message) == "verification done") {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message === "OTP Wrong") {
        alert("OTP wrong\nPlease Register again");
        navigate('/register')
      }
      console.log(err.response?.data?.message);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column w-25 h-50 justify-content-around align-items-center">
        <div
          id="mainMainDiv"
          className="border border-danger d-flex flex-column align-items-center w-75"
        >
          <h1>OTP</h1>
          <div id="emailDiv">
            <p className="text-white">Email:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter the email provided during verification"
              className="h-100"
            />
          </div>
          <div id="otpDiv" className="mt-5">
            <p className="text-white">OTP:</p>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="OTP"
            />
          </div>
          <button onClick={handleOtp} className="mt-5">
            Verify
          </button>
          <Link
            to="/login"
            className="text-decoration-none text-white mt-5 cursor-pointer"
          >
            Verification Done? Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
