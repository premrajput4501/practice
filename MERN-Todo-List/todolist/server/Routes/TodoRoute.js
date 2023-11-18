const express = require("express");
const {
  addtodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../Controllers/Todo");
const { VerifyUser } = require("../VerifyUser");
const Router = express.Router();

Router.route("/new").post(VerifyUser, addtodo);
Router.route("/all").get(VerifyUser, getTodos);
Router.route("/delete/:id").get(deleteTodo);
Router.route("/update").post(updateTodo);

module.exports = Router;
