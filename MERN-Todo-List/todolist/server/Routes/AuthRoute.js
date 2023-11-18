const express = require("express");
const { login, signup } = require("../Controllers/Auth");

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/signup").post(signup);

module.exports = Router;
