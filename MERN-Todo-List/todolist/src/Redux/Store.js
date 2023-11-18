import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/UserSlice";
import todoReducer from "./Slices/TodoSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});
