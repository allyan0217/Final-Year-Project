import { createSlice } from '@reduxjs/toolkit'
const initialState = []
export const BasketSlice = createSlice({
  name: 'BasketManagement',
  initialState,
  reducers: {
    AddBasket: (state, action) => {
      state.push(action.payload)
    },
    RemoveBasket: (state, action) => {
      const index=state.findIndex((object)=>{
         if(object.name===action.payload){
             return true
         }
      })
      state.splice(index,1)
    },
  },
})

// Action creators are generated for each case reducer function
export const {AddBasket,RemoveBasket} =BasketSlice.actions

export default BasketSlice.reducer