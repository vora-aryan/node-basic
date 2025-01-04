const jwt = require("jsonwebtoken");
const secret = "abc";

const verifyUser = (req, res, next) => {
  var token = req.headers.authorization;

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      try {
        jwt.verify(token, secret);
        next();
      } catch (err) {
        res.status(421).json({
          message: "User invalid.",
        });
      }
    } else {
      res.status(421).json({
        message: "only bearer token accept.",
      });
    }
  } else {
    res.status(421).json({
      message: "token required *",
    });
  }
};
module.exports = verifyUser;
