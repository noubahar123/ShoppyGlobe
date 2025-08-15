import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItemsArray,
  selectCartTotals,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart
} from '../utils/cartSlice.js'
import { Link } from 'react-router-dom'

// helper: format numbers into INR
const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)

export default function Cart(){
  const items = useSelector(selectCartItemsArray)
  const { qty, price } = useSelector(selectCartTotals) // price in USD
  const dispatch = useDispatch()

  // convert subtotal to INR
  const subtotalINR = price * 83

  if(items.length === 0){
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Browse products and add your favorites.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Go shopping</Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      {/* Cart Items */}
      <div className="space-y-4">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="card flex items-center gap-4 p-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-20 w-24 rounded object-cover"
            />
            <div className="mr-auto">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500">
                {formatINR(product.price * 83)} • {product.brand}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn-outline px-3"
                onClick={() => dispatch(decrementQty(product.id))}
              >
                -
              </button>
              <span className="min-w-8 text-center">{qty}</span>
              <button
                className="btn-outline px-3"
                onClick={() => dispatch(incrementQty(product.id))}
              >
                +
              </button>
            </div>
            <button
              className="btn-outline"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <aside className="card p-4 h-max sticky top-28">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{qty}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatINR(subtotalINR)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatINR(0)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatINR(subtotalINR)}</span>
          </div>
        </div>
        <Link to="/checkout" className="btn-primary mt-4 block text-center">
          Proceed to Checkout
        </Link>
        <button
          className="btn-outline mt-2 w-full"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </aside>
    </div>
  )
}
  