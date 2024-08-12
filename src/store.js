import { configureStore } from '@reduxjs/toolkit'
import followersReducer from './followersSlice'
export default configureStore({
  reducer: {
    followers:followersReducer
  },
})