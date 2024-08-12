import { createSlice } from '@reduxjs/toolkit'

export const followerSlice = createSlice({
  name: 'followers',
  initialState: {
    value: [],
    navOpacity:1
  },
  reducers: {
    setFollowers: (state, action) => {
      state.value = action.payload
    },
    setOpacity: (state,action)=>{
      state.navOpacity=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFollowers, setOpacity } = followerSlice.actions

export default followerSlice.reducer