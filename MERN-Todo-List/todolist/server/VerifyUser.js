const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.VerifyUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.json({ msg: "error/missing-token" });
  }

  const tokenMatch = jwt.verify(token, process.env.SECRET);

  if (!tokenMatch) {
    res.json({ msg: "error/invalid-token" });
  }

  req.user = tokenMatch;
  next();
};
