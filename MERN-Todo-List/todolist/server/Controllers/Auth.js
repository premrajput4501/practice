const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../Models/User");

const secret = process.env.SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  const exists = await User.findOne({ username: username });

  if (exists.length === 0) {
    return res.json({ msg: "error/User Not Found" });
  }

  try {
    const verify = await bcrypt.compare(password, exists.password);

    if (verify) {
      const token = jwt.sign({ id: exists.id }, secret);

      res.json({ msg: "success/login-success", token: token });
    } else {
      res.json({ msg: "error/Invalid Credentials" });
    }
  } catch (e) {
    res.json({ msg: "error/Internal Server Error" });

    console.log(e);
  }
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.find({ username: username });

  if (exists.length !== 0) {
    return res.json({ msg: "error/Username already exists" });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const nUser = new User({
    username: username,
    password: hash,
  });

  nUser
    .save()
    .then((nUser) => {
      const token = jwt.sign({ id: nUser.id }, secret);

      res.json({ msg: "success/user-created", token: token });
    })
    .catch((e) => {
      res.json({ msg: "error/server-error", e });
    });
};
