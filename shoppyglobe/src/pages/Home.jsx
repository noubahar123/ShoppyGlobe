import React, { useMemo, useState } from 'react'
import useProducts from '../hooks/useProducts.js'
import ProductItem from '../components/ProductItem.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryPills from '../components/CategoryPills.jsx'

export default function Home(){
  const { products, loading, error } = useProducts()
  const [q, setQ] = useState('')


  // For categories

  const categories = useMemo(() => {
    const set = new Set()
    for(const p of products){ if(p.category) set.add(p.category) }
    return Array.from(set).sort((a,b)=>a.localeCompare(b))
  }, [products])



  // For search
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if(!s) return products
    return products.filter(p =>
      (p.title?.toLowerCase().includes(s)) ||
      (p.brand?.toLowerCase().includes(s)) ||
      (p.category?.toLowerCase().includes(s))
    )
  }, [q, products])

  if(loading) return <div className="py-10 text-center">Loading products…</div>
  if(error) return <div className="py-10 text-center text-red-600">Error: {error}</div>

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome to ShoppyGlobe</h1>
        <p className="mt-1 text-sm text-gray-200">
          Discover trending products at unbeatable prices.
        </p>
      </section>

      <SearchBar value={q} onChange={setQ} />

      <CategoryPills categories={categories} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map(p => <ProductItem key={p.id} product={p} />)}
      </div>
    </div>
  )
}
