import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../utils/cartSlice.js'

export default function ProductDetail(){
  const { id } = useParams()              // useParam to get product id parameter
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()


  // Here we would find individual product data from dummyjson
  useEffect(() => {
    let active = true
    async function run(){
      try{
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if(!res.ok) throw new Error('Failed to fetch product')
        const data = await res.json()
        if(active) setProduct(data)
      } catch (err){
        setError(err.message || 'Unknown error')
      } finally {
        if(active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [id])

  if(loading) return <div className="py-10 text-center">Loading product…</div>
  if(error) return <div className="py-10 text-center text-red-600">Error: {error}</div>
  if(!product) return null

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card overflow-hidden">
        <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="w-full object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center gap-6">
          <span className="text-3xl font-extrabold">₹{(product.price * 83).toFixed(0)}</span>
          <span className="text-sm text-amber-600">★ {product.rating}</span>
        </div>
        <div className="text-sm text-gray-500">Brand: {product.brand} • Category: {product.category}</div>
        <div className="flex items-center gap-3 pt-2">
          <button className="btn-primary" onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  )
}