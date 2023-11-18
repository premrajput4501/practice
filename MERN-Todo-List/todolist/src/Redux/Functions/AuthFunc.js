const { createAsyncThunk } = require("@reduxjs/toolkit");

exports.login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response_raw = await fetch("http://localhost:3001/auth/login", {
      body: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await response_raw.json();

    console.log(response);

    return response;
  } catch (e) {
    throw e;
  }
});

exports.signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response_raw = await fetch("http://localhost:3001/auth/signup", {
      body: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await response_raw.json();

    console.log(response);

    return response;
  } catch (e) {
    throw e;
  }
});
