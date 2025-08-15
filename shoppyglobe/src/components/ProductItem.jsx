import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../utils/cartSlice.js'

export default function ProductItem({ product }){
  const dispatch = useDispatch()
  const { id, title, price, thumbnail, rating, brand } = product

  return (
    <div className="card p-3 flex flex-col">
      <Link to={`/product/${id}`} className="group relative block overflow-hidden rounded-md">
        <img src={thumbnail} alt={title} className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.03]" />
      </Link>
      <div className="mt-3 flex-1">
        <h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">{brand}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">₹{(price * 83).toFixed(0)}</span>
          <span className="text-xs text-amber-600">★ {rating}</span>
        </div>
      </div>
      <button className="btn-primary mt-3" onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  )
}
