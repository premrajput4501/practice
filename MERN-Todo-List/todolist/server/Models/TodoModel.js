const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
  },
  todoDesc: {
    type: String,
  },
  completionDate: {
    type: Date,
  },
  added: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  of: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "User",
  },
});

const TodoModel = mongoose.model("Todos", TodoSchema);
module.exports = TodoModel;
