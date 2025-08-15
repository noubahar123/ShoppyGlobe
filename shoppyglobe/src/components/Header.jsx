import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartTotals } from '../utils/cartSlice.js'

export default function Header(){
  const { qty } = useSelector(selectCartTotals)

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-3 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Shoppy<span className="text-gray-500">Globe</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold' : 'text-gray-700 hover:text-black'}>
            Home
          </NavLink>
          <NavLink to="/categories" className={({isActive}) => isActive ? 'font-semibold' : 'text-gray-700 hover:text-black'}>
            Categories
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'font-semibold' : 'text-gray-700 hover:text-black'}>
            <span className="relative inline-flex items-center gap-2">
              Cart
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-xs font-semibold text-white">
                {qty}
              </span>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
