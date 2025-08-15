// src/utils/cartSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  items: {}, // { [id]: { product, qty } }
  totalQty: 0,
  totalPrice: 0,
}


// In the cart we would have reducers to add, remove, increase and decrease quantity
const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      const p = action.payload
      const existing = state.items[p.id]
      if(existing){
        existing.qty += 1
      } else {
        state.items[p.id] = { product: p, qty: 1 }
      }
      state.totalQty += 1
      state.totalPrice += p.price
    },
    removeFromCart(state, action){
      const id = action.payload
      const entry = state.items[id]
      if(!entry) return
      state.totalQty -= entry.qty
      state.totalPrice -= entry.product.price * entry.qty
      delete state.items[id]
    },
    decrementQty(state, action){
      const id = action.payload
      const entry = state.items[id]
      if(!entry) return
      entry.qty -= 1
      state.totalQty -= 1
      state.totalPrice -= entry.product.price
      if(entry.qty <= 0){
        delete state.items[id]
      }
    },
    incrementQty(state, action){
      const id = action.payload
      const entry = state.items[id]
      if(!entry) return
      entry.qty += 1
      state.totalQty += 1
      state.totalPrice += entry.product.price
    },
    clearCart(state){
      state.items = {}
      state.totalQty = 0
      state.totalPrice = 0
    }
  }
})

export const { addToCart, removeFromCart, decrementQty, incrementQty, clearCart } = slice.actions
export default slice.reducer

// ---------- Selectors ----------

// Base selectors
const selectCart = (state) => state.cart
const selectItemsMap = (state) => state.cart.items
const selectTotalQty = (state) => state.cart.totalQty
const selectTotalPrice = (state) => state.cart.totalPrice

// Memoized selectors (stable references unless inputs change)
export const selectCartTotals = createSelector(
  [selectTotalQty, selectTotalPrice],
  (qty, price) => ({ qty, price })
)

export const selectCartItemsArray = createSelector(
  [selectItemsMap],
  (itemsMap) => Object.values(itemsMap)
)
