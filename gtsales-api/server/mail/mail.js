const { Router } = require("express");
const mailRouter = Router();
const nodemailer = require("nodemailer");
var fs = require("fs");
const jsdom = require('jsdom');

mailRouter.post("/sendmail", (req, res) => {
  const { email } = req.body;
  sendMail(email, (info) => {
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
        console.log(html);
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

  /* let mailOptions = {
    from: "carlosngv99@gmail.com", // sender address
    to: email, // list of receivers
    subject: "¡Bienvenido a GTSales!", // Subject line
  }; */

  // send mail with defined transport object

}

module.exports = mailRouter;
