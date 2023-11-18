const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const db = require("./Config");

const AuthRoute = require("./Routes/AuthRoute");
const TodoRoute = require("./Routes/TodoRoute");

db();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/todos", TodoRoute);

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}/`);
});
