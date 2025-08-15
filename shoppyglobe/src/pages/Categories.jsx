import React, { useMemo } from 'react'
import useProducts from '../hooks/useProducts.js'
import { Link } from 'react-router-dom'

export default function Categories(){
  const { products, loading, error } = useProducts()


  // Adding categories here through useMemo so we do not need to render again and again
  const groups = useMemo(() => {
    const map = new Map()
    for(const p of products){
      const key = p.category || 'other'
      map.set(key, (map.get(key) || 0) + 1)
    }
    return Array.from(map.entries()).sort((a,b) => a[0].localeCompare(b[0]))
  }, [products])

  if(loading) return <div className="py-10 text-center">Loading categories…</div>
  if(error) return <div className="py-10 text-center text-red-600">Error: {error}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {groups.map(([name, count]) => (
          <Link
            key={name}
            to={`/category/${encodeURIComponent(name)}`}
            className="card p-4 hover:ring-gray-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold capitalize">{name}</h3>
              <span className="text-xs text-gray-500">{count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
