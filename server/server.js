const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const db = require("./database");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT;
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mihirvelaga21144@gmail.com",
    pass: "dwlu ibmh jszw mkmj",
  },
});
app.use(morgan("dev"));
app.use(cors());
let number;
app.post("/student/register", async (req, res) => {
  try {
    number = Math.floor(100000 + Math.random() * 900000);
    const results = await db.query(
      "insert into student (rollno, password, email,year,sem,department) values(lower($1),$2,lower($3),$4,$5,lower($6))",
      [
        req.body.rollno,
        req.body.password,
        req.body.email,
        req.body.year,
        req.body.sem,
        req.body.department,
      ]
    );
    let response = await db.query(
      "insert into otp(email,otp,designation) values (lower($1),$2,$3)",
      [req.body.email, number, "student"]
    );
    res.status(200).send({
      status: "success",
      message: "Student registered successfully",
    });
  } catch (err) {
    let message = err.message || "Internal Server Error";
    let status = err.statusCode || 500;
    console.log(err);
    if (err.code === "23505") {
      message = "Duplicate Record";
      status = 404;
    }
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
  transporter.sendMail({
    from: '"Dakshina" <mihirvelaga21144@gmail.com>',
    to: req.body.email,
    subject: "OTP Verification",
    text: `Hi ${req.body.rollno}! This is your otp: ${number}`,
  });
});
app.post("/signup/verify", async (req, res) => {
  try {
    number = await number;
    console.log(number);
    if (req.body.otp != number) {
      let results = await db.query("delete from otp where email=lower($1)", [
        req.body.email,
      ]);
      results = await db.query("delete from admin where email=lower($1)", [
        req.body.email,
      ]);
      results = await db.query("delete from student where email=lower($1)", [
        req.body.email,
      ]);
      const err = new Error("OTP Wrong");
      err.statusCode = 400;
      throw err;
    }
    res.status(200).send({
      status: "success",
      message: "verification done",
    });
  } catch (err) {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/admin/login", async (req, res) => {
  try {
    const results = await db.query(
      "select password from admin where staffid=lower($1)",
      [req.body.staffid]
    );
    if (results.rows.length === 0) {
      const err = new Error("No Admin Found");
      err.status = 404;
      throw err;
    }
    if (results.rows[0].password !== req.body.password) {
      const err = new Error("Wrong Password");
      err.status = 401;
      throw err;
    }
    res.status(200).send({
      status: "success",
      message: "login successful",
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.statusCode || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/admin/register", async (req, res) => {
  try {
    number = Math.floor(100000 + Math.random() * 900000);
    const results = await db.query(
      "insert into admin(staffid,password,department,designation,email) values (lower($1),$2,lower($3),lower($4),lower($5))",
      [
        req.body.staffid,
        req.body.password,
        req.body.department,
        req.body.designation,
        req.body.email,
      ]
    );
    res.status(200).send({
      status: "success",
      message: "Admin Registered Successfully",
    });
  } catch (err) {
    const message = err.message || "Unknown Error";
    const status = err.statusCode || 500;
    console.log(err);
  }
  transporter.sendMail({
    from: '"Dakshina" <mihirvelaga21144@gmail.com>',
    to: req.body.email,
    subject: "OTP Verification",
    text: `Hi ${req.body.staffid}! This is your otp: ${number}`,
  });
});
app.post("/student/login", async (req, res) => {
  try {
    const results = await db.query(
      "select password from student where rollno=lower($1)",
      [req.body.rollno]
    );
    if (results.rows.length === 0) {
      const err = new Error("No user found");
      err.statusCode = 400;
      throw err;
    }
    if (results.rows[0].password !== req.body.password) {
      const err = new Error("Wrong Password");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).send({
      status: "success",
      message: "login successful",
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/student/feedback", async (req, res) => {
  try {
    let results = await db.query(
      "insert into feedback(rollno,feedback) values (lower($1),lower($2))",
      [req.body.rollno, req.body.feedback]
    );
    results = await db.query(
      "delete from feedback where feedbackdate != current_date"
    );
    results = await db.query("select email from admin where staffid=$1", [
      req.body.staffid,
    ]);
    const email = results.rows[0].email;
    transporter.sendMail({
      to: email,
      from: '"Dakshina" <mihirvelaga21144@gmail.com>',
      subject: "Feedback Received",
      text: `Hi ${req.body.staffid}! There is a new feedback about you from a student.\n"${req.body.feedback}"`,
    });
    res.status(200).send({
      status: "ok",
      message: "feedback successfully sent",
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/student/kyf", async (req, res) => {
  try {
    const results = await db.query(
      "select staffid from admin where email=lower($1)",
      [req.body.email]
    );
    if (results.rows.length === 0) {
      const err = new Error("Faculty with the email does not exist");
      err.statusCode = 400;
      throw err;
    }
    console.log(results.rows[0].staffid);
    res.status(200).send({
      status: "success",
      staffid: results.rows[0].staffid,
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.statusCode || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/admin/send/disciplineReport", async (req, res) => {
  try {
    let results = await db.query(
      "select * from disciplineRecord where rollno=lower($1)",
      [req.body.rollno]
    );
    if (results.rows.length === 0) {
      results = await db.query(
        "insert into disciplinerecord(rollno,record,staffid,dateofoffence,suggestionsgiven,actiontaken) values(lower($1),lower($2),lower($3),$4,lower($5),lower($6))",
        [
          req.body.rollno,
          req.body.record,
          req.body.staffid,
          req.body.dateofoffence,
          req.body.suggestionsgiven,
          req.body.actionstaken,
        ]
      );
    } else {
      results = await db.query(
        "update disciplinerecord set record=lower($1) ,staffid=$2 where rollno=lower($3)",
        [req.body.record, req.body.staffid, req.body.rollno]
      );
    }
    let emailResult = await db.query(
      "select email from student where rollno=lower($1)",
      [req.body.rollno]
    );
    let email = emailResult.rows[0].email;
    res.status(200).send({
      status: "success",
      message: "record updation successful",
    });
    let idresults = await db.query(
      "select id from disciplinerecord where rollno=lower($1)",
      [req.body.rollno]
    );
    const id = idresults.rows[0].id;
    transporter.sendMail({
      from: '"Dakshina" <mihirvelaga21144@gmail.com>',
      to: email,
      subject: "Discipline Report Received",
      text: `You have a new update on your discipline record\n\n"${req.body.record}" with the Id: ${id}\nPlease save this "ID" for future reference or corrections `,
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/student/request/disciplineRecord", async (req, res) => {
  try {
    let results = await db.query(
      "select rollno,staffid from disciplinerecord where id=$1",
      [req.body.id]
    );
    const staffid = results.rows[0].staffid;
    const rollno = results.rows[0].rollno;
    results = await db.query("select email from admin where staffid=$1", [
      staffid,
    ]);
    const adminEmail = results.rows[0].email;
    transporter.sendMail({
      to: adminEmail,
      from: '"Dakshina" <mihirvelaga21144@gmail.com>',
      subject: "Request for Change in the Discipline Record",
      text: `The student with the Roll Number: ${rollno} has requested to change the Discipline Record with the Id: ${req.body.id}`,
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;
    console.log(err);
    res.status(status).send({
      status: "error",
      message: message,
    });
  }
});
app.post("/student/marks/view", async (req, res) => {
  try {
    const results = await db.query(
      "select * from marks where rollno=lower($1)",
      [req.body.rollno]
    );
    const cgpaCal = (marks) => {
      let sum = 0;
      let cgpa = 0;
      let count = 0;
      for (let i = 0; i < marks.length; i++) {
        if (isNaN(marks[i])) {
          continue;
        } else {
          sum += marks[i];
          count += 1;
        }
      }
      cgpa = sum / count;
      return cgpa.toFixed(2);
    };
    const marks = [
      Number(results.rows[0].oneone),
      Number(results.rows[0].onetwo),
      Number(results.rows[0].twoone),
      Number(results.rows[0].twotwo),
      Number(results.rows[0].threeone),
      Number(results.rows[0].threetwo),
      Number(results.rows[0].fourone),
      Number(results.rows[0].fourtwo),
    ];
    console.log(marks);
    res.status(200).send({
      status: "success",
      oneone: results.rows[0].oneone,
      onetwo: results.rows[0].onetwo,
      twoone: results.rows[0].twoone,
      twotwo: results.rows[0].twotwo,
      threeone: results.rows[0].threeone,
      threetwo: results.rows[0].threetwo,
      fourone: results.rows[0].fourone,
      fourtwo: results.rows[0].fourtwo,
      backlogs: results.rows[0].backlogs,
      cgpa: cgpaCal(marks),
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/admin/marks/update", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.check === "true") {
      let results = await db.query(
        "select * from marks where rollno=lower($1)",
        [req.body.rollno]
      );
      if (results.rows.length === 1) {
        console.log(results.rows[0]);
        const marks = [
          Number(results.rows[0].oneone),
          Number(results.rows[0].onetwo),
          Number(results.rows[0].twoone),
          Number(results.rows[0].twotwo),
          Number(results.rows[0].threeone),
          Number(results.rows[0].threetwo),
          Number(results.rows[0].fourone),
          Number(results.rows[0].fourtwo),
        ];
        const cgpaCal = (marks) => {
          let sum = 0;
          let cgpa = 0;
          let count = 0;
          for (let i = 0; i < marks.length; i++) {
            if (isNaN(marks[i])) {
              continue;
            } else {
              sum += marks[i];
              count += 1;
            }
          }
          cgpa = sum / count;
          return cgpa.toFixed(2);
        };
        res.status(200).send({
          status: "success",
          oneone: results.rows[0].oneone,
          onetwo: results.rows[0].onetwo,
          twoone: results.rows[0].twoone,
          twotwo: results.rows[0].twotwo,
          threeone: results.rows[0].threeone,
          threetwo: results.rows[0].threetwo,
          fourone: results.rows[0].fourone,
          fourtwo: results.rows[0].fourtwo,
          backlogs: results.rows[0].backlogs,
          cgpa: cgpaCal(marks),
        });
        results = await db.query(
          "update marks set cgpa=$1 where rollno=lower($2)",
          [cgpaCal(marks), req.body.rollno]
        );
      } else if (results.rows.length === 0) {
        res.status(200).send({
          status: "success",
          oneone: "NA",
          onetwo: "NA",
          twoone: "NA",
          twotwo: "NA",
          threeone: "NA",
          threetwo: "NA",
          fourone: "NA",
          fourtwo: "NA",
          backlogs: "NA",
          cgpa: cgpaCal(marks),
        });
      }
    } else if (req.body.check === "false") {
      console.log("oh yeah!");
      let results=await db.query('select * from marks where rollno=lower($1)',[req.body.rollno])
      if (results.rows.length === 0) {
        const marks = [
          Number(req.body.oneone),
          Number(req.body.onetwo),
          Number(req.body.twoone),
          Number(req.body.twotwo),
          Number(req.body.threeone),
          Number(req.body.threetwo),
          Number(req.body.fourone),
          Number(req.body.fourtwo),
        ];
        const cgpaCal = (marks) => {
          let sum = 0;
          let cgpa = 0;
          let count = 0;
          for (let i = 0; i < marks.length; i++) {
            if (isNaN(marks[i])) {
              continue;
            } else {
              sum += marks[i];
              count += 1;
            }
          }
          cgpa = sum / count;
          return cgpa.toFixed(2);
        };
         results = await db.query(
          "insert into marks values (lower($1),$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
          [
            req.body.rollno,
            req.body.oneone,
            req.body.onetwo,
            req.body.twoone,
            req.body.twotwo,
            req.body.threeone,
            req.body.threetwo,
            req.body.fourone,
            req.body.fourtwo,
            req.body.cgpa,
            req.body.backlogs,
          ]
        );
      }
      if (results.rows.length === 1) {
        console.log(req.body);
        const marks = [
          Number(req.body.oneone),
          Number(req.body.onetwo),
          Number(req.body.twoone),
          Number(req.body.twotwo),
          Number(req.body.threeone),
          Number(req.body.threetwo),
          Number(req.body.fourone),
          Number(req.body.fourtwo),
        ];
        console.log(marks);
        const cgpaCal = (marks) => {
          let sum = 0;
          let cgpa = 0;
          let count = 0;
          for (let i = 0; i < marks.length; i++) {
            if (isNaN(marks[i])) {
              continue;
            } else {
              sum += marks[i];
              count += 1;
            }
          }
          cgpa = sum / count;
          return cgpa.toFixed(2);
        };
        console.log(req.body.twotwo);
        let results = await db.query(
          "update marks set oneone=$1,onetwo=$2,twoone=$3,twotwo=$4,threeone=$5,threetwo=$6,fourone=$7,fourtwo=$8,cgpa=$9,backlogs=$10 where rollno=$11",
          [
            req.body.oneone,
            req.body.onetwo,
            req.body.twoone,
            req.body.twotwo,
            req.body.threeone,
            req.body.threetwo,
            req.body.fourone,
            req.body.fourtwo,
            req.body.cgpa,
            req.body.backlogs,
            req.body.rollno,
          ]
        );
        results = await db.query("select * from marks where rollno=lower($1)", [
          req.body.rollno,
        ]);
        res.status(200).send({
          status: "success",
          oneone: results.rows[0].oneone,
          onetwo: results.rows[0].onetwo,
          twoone: results.rows[0].twoone,
          twotwo: results.rows[0].twotwo,
          threeone: results.rows[0].threeone,
          threetwo: results.rows[0].threetwo,
          fourone: results.rows[0].fourone,
          fourtwo: results.rows[0].fourtwo,
          backlogs: results.rows[0].backlogs,
          cgpa: cgpaCal(marks),
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`server up and listening on ${port}`);
});
