import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteTodo,
  getTodos,
  newtodo,
  updateTodo,
} from "../Functions/TodoFunc";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    errors: null,
    todoAdded: false,
  },
  reducers: {
    setTodoAdded: (state) => {
      state.todoAdded = !state.todoAdded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newtodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(newtodo.rejected, (state, action) => {
        state.loading = false;
        state.errors = action;
      })
      .addCase(newtodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.errors = action;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.msg.split("/")[0] === "success") {
          const newTodos = action.payload.todos;

          state.todos = [...state.todos, ...newTodos];

          console.log(state.todos);
        } else {
          state.errors = action.payload.msg.split("/")[1];
          console.log(state.errors);
        }
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.errors = action;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
export const { setTodoAdded } = todoSlice.actions;
