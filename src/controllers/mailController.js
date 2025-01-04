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
  text: "Hi, This is test mail sent from node js",
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

module.exports = { sendMail };
