import React from 'react'

export default function Checkout(){
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-gray-600">This is a demo page. Implement your payment flow here.</p>
      <form className="card space-y-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="First name" />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Last name" />
          <input className="sm:col-span-2 rounded-md border border-gray-300 px-3 py-2" placeholder="Email" />
          <input className="sm:col-span-2 rounded-md border border-gray-300 px-3 py-2" placeholder="Address" />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="City" />
          <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Postal code" />
        </div>
        <button className="btn-primary w-full">Place Order</button>
      </form>
    </div>
  )
}