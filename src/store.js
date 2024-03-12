import { configureStore } from '@reduxjs/toolkit'
import authSlice from './redux/slices/authSlice'
import baseUrlSlice from './redux/slices/baseUrlSlice'
import addSlice from './redux/slices/addSlice'


export const store = configureStore({
  reducer: {
    authSlice,
    baseUrlSlice,
    addSlice,
  },
})
