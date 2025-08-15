import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){

  // Sample footer added to add more visibility 
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="container mx-auto px-3 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">ShoppyGlobe</h3>
          <p className="mt-2 text-sm text-gray-600">
            Demo e-commerce built with React + Tailwind. All products are from DummyJSON.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Company</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black">About</Link></li>
            <li><Link to="/" className="hover:text-black">Careers</Link></li>
            <li><Link to="/" className="hover:text-black">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Help</h4>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-black">Support</Link></li>
            <li><Link to="/" className="hover:text-black">Shipping</Link></li>
            <li><Link to="/" className="hover:text-black">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Newsletter</h4>
          <form className="mt-2 flex gap-2">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Email address"
            />
            <button className="btn-primary text-sm">Join</button>
          </form>
          <p className="mt-2 text-xs text-gray-500">Demo only—no emails sent.</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShoppyGlobe • Demo footer
      </div>
    </footer>
  )
}
