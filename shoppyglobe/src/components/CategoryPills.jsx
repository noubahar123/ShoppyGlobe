import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CategoryPills({ categories = [] }){
  const nav = useNavigate()
  if(!categories.length) return null

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => nav(`/category/${encodeURIComponent(c)}`)}
          className="whitespace-nowrap rounded-full border bg-white px-3 py-1 text-sm hover:bg-gray-50"
          title={`View ${c}`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
