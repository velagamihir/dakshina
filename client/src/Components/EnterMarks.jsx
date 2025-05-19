import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const EnterMarks = () => {
  const [rollno, setrollno] = useState("");
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
  const [check, setCheck] = useState("false");
  const handleCheck = async () => {
    try {
      if (!rollno) {
        const err = new Error("Enter all the Roll Number");
        err.status = 400;
        throw err;
      }
      setCheck("true");
      console.log(check);
      const results = await axios.post(
        "http://localhost:3002/admin/marks/update",
        {
          rollno,
          check: "true",
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
    }
  };
  const handleSubmit = async () => {
    try {
      if (
        !rollno ||
        !oneone ||
        !onetwo ||
        !twoone ||
        !twotwo ||
        !threeone ||
        !threetwo ||
        !fourone ||
        !fourtwo ||
        !cgpa ||
        !backlogs
      ) {
        const err = new Error("Enter all the fields");
        throw err;
      }
      setCheck("false");
      console.log(twotwo);
      const results = await axios.post(
        "http://localhost:3002/admin/marks/update",
        {
          rollno,
          check: "false",
          oneone,
          onetwo,
          twoone,
          twotwo,
          threeone,
          threetwo,
          fourone,
          fourtwo,
          cgpa,
          backlogs,
        }
      );
    } catch (err) {
      const message =
        err.response?.data?.message || err.messag || "Unknown Error";
      alert(`Error: ${message}`);
    }
  };
  return (
    <div>
      <dib id="bigDiv">
        <input
          type="text"
          value={rollno}
          onChange={(e) => {
            setrollno(e.target.value);
          }}
        />
        <button className="btn btn-success" onClick={handleCheck}>
          Check
        </button>
      </dib>
      <div id="smallDiv">
        <div id="mainDiv1" className="  h-50">
          <div id="oneoneDiv">
            <p className="text-white">1-1</p>
            <input
              type="text"
              value={oneone}
              className="text-danger"
              onChange={(e) => {
                setoneone(e.target.value);
              }}
              id="oneone"
            />
          </div>
          <div id="onetwoDiv">
            <p className="text-white">1-2</p>
            <input
              type="text"
              value={onetwo}
              onChange={(e) => {
                setonetwo(e.target.value);
              }}
              className="text-danger"
            />
          </div>
          <div id="twooneDiv">
            <p className="text-white">2-1</p>
            <input
              type="text"
              value={twoone}
              onChange={(e) => {
                settwoone(e.target.value);
              }}
              className="text-danger"
            />
          </div>
          <div id="twotwoDiv">
            <p className="text-white">2-2</p>
            <input
              type="text"
              value={twotwo}
              onChange={(e) => {
                settwotwo(e.target.value);
              }}
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
              onChange={(e) => {
                setthreeone(e.target.value);
              }}
              className="text-danger"
            />
          </div>
          <div id="threetwoDiv">
            <p className="text-white">3-2</p>
            <input
              type="text"
              value={threetwo}
              onChange={(e) => {
                setthreetwo(e.target.value);
              }}
              className="text-danger"
            />
          </div>
          <div id="fouroneDiv">
            <p className="text-white ">4-1</p>
            <input
              type="text"
              value={fourone}
              onChange={(e) => {
                setfourone(e.target.value);
              }}
              className="text-danger"
            />
          </div>
          <div id="fourTwoDiv">
            <p className="text-white">4-2</p>
            <input
              type="text"
              value={fourtwo}
              onChange={(e) => {
                setfourtwo(e.target.value);
              }}
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
            onChange={(e) => {
              setBacklogs(e.target.value);
            }}
            className="text-danger"
          />
        </div>
        <button className="btn btn-primary mt-5" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EnterMarks;
