import { createSlice } from "@reduxjs/toolkit";

export const addSlice = createSlice({
  name: 'addSlice',
  initialState: {
    eventName: "",
    product_name: "",
    product_id: "",
    bitrix_event_id:"",
    bitrix_product_id: "",
    plateformName: "",
    gooldgoose: "",
    price: "",
    event_date: '',
    desc: "",
    event_html: "",
    dynamicdata: '',
  },
  reducers: {
    setAddEventSlice: (state, action) => {
      state = action.payload
      // console.log(state);
      return state
    },
  }
})

export const { setAddEventSlice } = addSlice.actions
export default addSlice.reducer