# ShoppyGlobe (React + Vite + Redux Toolkit + Tailwind)

A basic e‑commerce app built per the assignment spec. It uses **Tailwind CSS** for styling, a custom hook for fetching products, **Redux Toolkit** for cart state, and **React Router** for navigation with lazy loaded pages.

## Quickstart

```bash
# 1) Install
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## What to Install

- react, react-dom
- react-router-dom
- @reduxjs/toolkit, react-redux
- vite (dev)
- tailwindcss, postcss, autoprefixer (dev)

## Folder Structure

```text
shoppyglobe/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ ProductItem.jsx
│  │  └─ SearchBar.jsx
│  ├─ hooks/
│  │  └─ useProducts.js
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ ProductDetail.jsx
│  │  ├─ Cart.jsx
│  │  ├─ Checkout.jsx
│  │  └─ NotFound.jsx
│  ├─ utils/             # Redux in utils as requested
│  │  ├─ cartSlice.js
│  │  └─ store.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## Features Checklist (per assignment)

- Component Structure: App, Header, ProductList (in **Home**), ProductItem, ProductDetail, Cart, CartItem (inline in Cart), NotFound.
- **Props**: ProductItem receives product via props.
- **Data Fetching**:
  - `hooks/useProducts.js` fetches `https://dummyjson.com/products?limit=100` on mount.
  - `pages/ProductDetail.jsx` fetches selected product by `id`.
  - Error states are handled and shown.
- **Redux (utils/)**:
  - `cartSlice.js` manages cart items, qty, totals with actions: add, remove, increment, decrement, clear.
  - Selectors to read cart data.
- **Search**: Search bar in Home filters by title/brand/category.
- **Event Handling**: Add to cart on ProductItem and ProductDetail; remove/increment/decrement in Cart.
- **Routing**: Home (`/`), Product Detail (`/product/:id`), Cart (`/cart`), Checkout (`/checkout`), NotFound (`*`).
- **Lists**: Products grid and cart items list have stable `key`s.
- **Performance**: Code-splitting + lazy loading for ProductDetail, Cart, Checkout.
- **Styling**: Tailwind used across the app with responsive layout.
- **Comments**: Key files include comments on intent.

## Notes
- Prices are shown in INR (approx) by multiplying DummyJSON USD price by 83 for display only.
- This is a learning scaffold—extend with pagination, auth, or persistent cart if needed.