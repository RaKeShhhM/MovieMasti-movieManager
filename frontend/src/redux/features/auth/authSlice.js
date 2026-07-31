import { createSlice } from "@reduxjs/toolkit";

// The initial state of the auth slice is set to either the userInfo stored in localStorage (if it exists) or null. This allows the application to persist user authentication state across page reloads.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

//setting the expiration time of the userInfo in localStorage to 30 days from the current time. If the current time exceeds the expiration time, it will clear the localStorage and set userInfo to null. 
const authSlice = createSlice({
  name: "auth",
  initialState,
  //reducers are functions that specify how the state should change in response to actions. In this case, there are two reducers: setCredentials and logout. The setCredentials reducer updates the userInfo in the state and localStorage when a user logs in, while the logout reducer clears the userInfo from both the state and localStorage when a user logs out. state is the current state of the slice, and action is an object that contains information about the action being dispatched, including any payload data.
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
