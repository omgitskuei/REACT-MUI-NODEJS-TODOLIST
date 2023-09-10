import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setTasklists: (state, action) => {
      if (state.user) {
        state.user.tasklists = action.payload.tasklists;
      } else {
        console.error("User tasklist non-existent");
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setTask: (state, action) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action.payload.task._id) {
          return action.payload.task;
        }
        return task;
      });
      state.tasks = updatedTasks;
    },
  },
});

export const { setLogin, setLogout, setTasklists, setTasks, setTask } =
  authSlice.actions;
export default authSlice.reducer;
