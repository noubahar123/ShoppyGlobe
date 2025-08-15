import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link className="btn-primary mt-6 inline-block" to="/">Go Home</Link>
    </div>
  )
}