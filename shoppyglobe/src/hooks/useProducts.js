import { useEffect, useState } from 'react'

// Used custom hook to fetch the product
export default function useProducts(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    async function run(){
      try {
        setLoading(true)
        const res = await fetch('https://dummyjson.com/products?limit=100')
        if(!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        if(active){
          setProducts(data.products || [])
        }
      } catch (err){
        setError(err.message || 'Unknown error')
      } finally {
        if(active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [])

  return { products, loading, error }
}