import { createSlice } from "@reduxjs/toolkit";

export const baseUrlSlice = createSlice({
  name: 'baseUrlSlice',
  initialState: {
    baseUrl: 'https://ggoose.successresources.com/backend/admin',
  },
  reducers: {
   
  }
})

export const {  } = baseUrlSlice.actions
export default baseUrlSlice.reducer