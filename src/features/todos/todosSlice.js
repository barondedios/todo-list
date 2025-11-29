import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodosAPI, addTodoAPI, updateTodoAPI, deleteTodoAPI } from "./todosApi";

// Async Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const data = await fetchTodosAPI();
  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const data = await addTodoAPI(todo);
  return data;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    const data = await updateTodoAPI(id, { completed });
    return data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await deleteTodoAPI(id);
  return id;
});

// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
