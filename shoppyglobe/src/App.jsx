import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'



// Adding lazyload to load them later instead of immediately loading it
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const Categories = lazy(() => import('./pages/Categories.jsx'))
const CategoryView = lazy(() => import('./pages/CategoryView.jsx'))

export default function App(){
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-3 py-6">
        <Suspense fallback={<div className="text-center py-10">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:name" element={<CategoryView />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
  