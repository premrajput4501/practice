const { createAsyncThunk } = require("@reduxjs/toolkit");

exports.newtodo = createAsyncThunk("todo/new", async (data, { getState }) => {
  try {
    const response_raw = await fetch("http://localhost:3001/todos/new", {
      body: JSON.stringify(data),
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getState().user.token || localStorage.getItem("token"),
      },
    });

    const response = await response_raw.json();

    return response;
  } catch (e) {
    throw e;
  }
});

exports.getTodos = createAsyncThunk("todo/get", async (data, { getState }) => {
  const response_raw = await fetch("http://localhost:3001/todos/all", {
    body: data,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getState().user.token || localStorage.getItem("token"),
    },
  });

  const response = await response_raw.json();

  return response;
});

exports.updateTodo = createAsyncThunk(
  "todo/update",
  async (data, { getState }) => {
    const response_raw = await fetch(`http://localhost:3001/todos/update`, {
      body:
        data.type === "COMPLETE"
          ? JSON.stringify({
              updateType: "COMPLETE",
              id: data.id,
            })
          : JSON.stringify(data),
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getState().user.token || localStorage.getItem("token"),
      },
    });

    const response = await response_raw.json();

    return response;
  }
);
