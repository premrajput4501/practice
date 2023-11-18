const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserModel);

module.exports = User;
