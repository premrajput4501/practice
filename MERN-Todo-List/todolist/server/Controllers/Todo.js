const TodoModel = require("../Models/TodoModel");
const User = require("../Models/User");

exports.addtodo = async (req, res) => {
  const { title, desc, completion } = req.body;

  const user = await User.findById(req.user.id);

  try {
    const newTodo = new TodoModel({
      todoTitle: title,
      todoDesc: desc,
      completionDate: completion,
      of: user.id,
    });

    newTodo.save();

    const todos = await TodoModel.find({ of: req.user.id });
    console.log(todos);

    res.json({ msg: "success/todo-added", todos: todos });
  } catch (e) {
    console.log(e);
    res.json({ msg: "error/Internal Server Error" });

    console.log(req.user.id);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({
      of: req.user.id,
    }).sort({ completionDate: -1 });

    return res.json({ msg: "success/todos", todos });
  } catch (e) {
    console.log(e);

    return res.json({ msg: "error/internal-server-error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const todoid = req.params.id;

  console.log(todoid);

  try {
    const del = await TodoModel.findOneAndDelete({ _id: todoid });

    res.redirect("http://localhost:3000");
  } catch (e) {
    console.log(e);
    res.json({ msg: "error/internal-server-error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { updateType, id } = req.body;

  if (updateType === "COMPLETE") {
    await TodoModel.findByIdAndUpdate(id, [
      {
        $set: {
          completed: true,
        },
      },
    ]);

    res.redirect("http://localhost:3000");
  } else {
    const { title, desc, date } = req.body;

    await TodoModel.findByIdAndUpdate(id, [
      {
        $set: {
          todoTitle: title,
          todoDesc: desc,
          completionDate: date,
        },
      },
    ]);

    res.redirect("http://localhost:3000");
  }
};
