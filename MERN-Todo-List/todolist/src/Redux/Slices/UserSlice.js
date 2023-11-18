const { createSlice } = require("@reduxjs/toolkit");
const { login, signup } = require("../Functions/AuthFunc");

const userslice = createSlice({
  name: "user",
  initialState: {
    token: null,
    errors: null,
    loading: false,
  },
  reducers: {
    tokenAction: (state, action) => {
      switch (action.type) {
        case "SET":
          state.token = action.payload;
          break;
        case "REMOVE":
          state.token = null;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.msg.split("/")[0] !== "error") {
          state.loading = false;
          state.errors = null;
          state.token = action.payload.token;

          localStorage.setItem("token", state.token);
        } else {
          state.loading = false;
          state.errors = action.payload.msg.split("/")[1];
        }
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.msg.split("/")[0] !== "error") {
          state.loading = false;
          state.errors = null;
          state.token = action.payload.token;

          localStorage.setItem("token", state.token);
        } else {
          state.loading = false;
          state.errors = action.payload.msg.split("/")[1];

          console.log(state.errors);
        }
      });
  },
});

export default userslice.reducer;
export const { tokenAction } = userslice.actions;
