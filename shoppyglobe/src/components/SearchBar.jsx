import React from 'react'

export default function SearchBar({ value, onChange }){
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder="Search by title or author/brand…"
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 shadow-sm focus:border-black focus:outline-none"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">🔍</span>
    </div>
  )
}
