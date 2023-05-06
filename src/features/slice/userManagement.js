import { createSlice } from '@reduxjs/toolkit'
const initialState = {}
export const userSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    UserInfo: (state, action) => {
      state=action.payload
    },
  },
})
// Action creators are generated for each case reducer function
export const {UserInfo} =userSlice.actions

export default userSlice.reducer