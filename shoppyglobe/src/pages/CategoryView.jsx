import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductItem from '../components/ProductItem.jsx'

export default function CategoryView(){
  const { name } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  // Fetching the data through dummyjson 
  useEffect(() => {
    let active = true
    async function run(){
      try {
        setLoading(true)
        const res = await fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(name)}?limit=100`
        )
        if(!res.ok) throw new Error('Failed to fetch category')
        const data = await res.json()
        if(active) setProducts(data.products || [])
      } catch (err){
        setError(err.message || 'Unknown error')
      } finally {
        if(active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [name])

  if(loading) return <div className="py-10 text-center">Loading {name}…</div>
  if(error) return <div className="py-10 text-center text-red-600">Error: {error}</div>


  // Mapping out the data
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold capitalize">{name}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map(p => <ProductItem key={p.id} product={p} />)}
      </div>
    </div>
  )
}
