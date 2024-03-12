import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    email: "",
    password: "",
    token: "",
    card_status:false,
  },
  reducers: {
    setUserSlice: (state, action) => {
      state = action.payload
      return state
    },
    setToken: (state, action) => {
      state.token = action.payload
      return state
    },
  }
})

export const { setUserSlice, setToken } = authSlice.actions
export default authSlice.reducer