import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const result = await axios.get('/todos');
  return result.data;
})

export const addTodo = createAsyncThunk('todos/addTodo', async (args) => {
  const result = await axios.post('/todos', { ...args });
  return result.data;
})

export const delTodo = createAsyncThunk('todos/delTodo', async (id) => {
  await axios.delete(`/todos/${id}`);
  return id;
})

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: true
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    },
    [addTodo.pending]: (state) => {
      state.loading = true
    },
    [addTodo.fulfilled]: (state, { payload }) => {
      state.todos.push(payload);
      state.loading = false;
    },
    [delTodo.pending]: (state) => {
      state.loading = true;
    },
    [delTodo.fulfilled]: (state, { payload }) => {
      state.todos = state.todos.filter(todo => todo.id !== payload)
      state.loading = false;
    }
  }
})

export default todoSlice.reducer;