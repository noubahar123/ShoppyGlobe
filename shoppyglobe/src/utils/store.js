import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice.js'


// Creating a store to manage cart 
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})