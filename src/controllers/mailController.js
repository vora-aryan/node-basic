const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iamshital619@gmail.com",
    pass: "gnjw znqg tfcg dhbi",
  },
});

const mailOptions = {
  from: "iamshital619@gmail",
  subject: "Test mail",
  html: "<h1>Hi, This is test mail sent from node js<h1> <a href='https://www.google.com'>Google</a>",
};

function sendMail(req, res) {
  const userMail = req.body.email;

  if (!userMail || !req.file) {
    return res.json({ message: "Please enter all fields" });
  }

  console.log(req.file);

  mailOptions.to = userMail;
  mailOptions.attachments = [
    {
      filename: req.file.originalname,
      content: req.file.buffer,
    },
  ];

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
}

function sendMailUtil(userMail, token) {
  const mailOptions = {
    from: "iamshital619@gmail",
    subject: "Test mail",
    html: `<h1>Hi, This is test mail sent from node js<h1> <a href=${
      "http://localhost:3001/user/verify?token=" + token
    }>Google</a>`,
  };

  if (!userMail) {
    return res.json({ message: "Please enter all fields" });
  }

  mailOptions.to = userMail;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
}

module.exports = { sendMail, sendMailUtil };
