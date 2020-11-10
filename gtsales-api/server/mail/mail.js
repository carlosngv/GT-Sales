const { Router } = require("express");
const mailRouter = Router();
const nodemailer = require("nodemailer");
const generateHTML = require('./reports/orderMail');
var fs = require("fs");

mailRouter.post("/sendmail", (req, res) => {
  const { email } = req.body;
  sendMail(email, (info) => {
    res.send(info);
  });
});

mailRouter.post("/sendOrder", (req, res) => {
  const { email, details, total } = req.body;
  generateHTML(details, total);
   sendOrder(email, (info) => {
    res.send(info);
  }); 
});

async function sendMail(email, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "carlosngv99@gmail.com",
      pass: "amarilda7junio",
    },
  });
  fs.readFile("./verification.html", { encoding: "utf-8" }, async function (err, html) {
    if (err) {
      console.log(err);
    } else {
        html = html.replace('href="http://localhost:3100"', 'href="http://localhost:3000/clients/verify/'+ email + '"');
      var mailOptions = {
        from: "carlosngv99@gmail.com",
        to: email,
        subject: "Bienvenido a GTSales",
        html: html,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      let info = await transporter.sendMail(mailOptions);
      callback(info);
    }
  });
}

async function sendOrder(email, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "carlosngv99@gmail.com",
      pass: "amarilda7junio",
    },
  });
  fs.readFile("./public/orderMail.html", { encoding: "utf-8" }, async function (err, html) {
    if (err) {
      console.log(err);
    } else {
        console.log(html);
      var mailOptions = {
        from: "carlosngv99@gmail.com",
        to: email,
        subject: "Detalle de orden",
        html: html,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      let info = await transporter.sendMail(mailOptions);
      callback(info);
    }
  });
}

module.exports = mailRouter;
