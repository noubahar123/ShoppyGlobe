# ShoppyGlobe Backend (Node.js + Express + MongoDB)

Backend APIs for the ShoppyGlobe e-commerce app with JWT auth and cart operations.

## 🔧 Tech
- Node.js, Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS, dotenv, morgan

## 🚀 Setup

1. **Install dependencies**
```bash
npm install
```

2. **Create `.env` from example**
```bash
cp .env.example .env
# Fill MONGODB_URI and JWT_SECRET
```

3. **Run (dev)**
```bash
npm run dev
```

4. **Seed products (optional)**
```bash
npm run seed
```

## 🧭 Routes

### Auth
- `POST /auth/register` — body: `{ name, email, password }`
- `POST /auth/login` — body: `{ email, password }`
> Returns `{ token, user }`

### Products
- `GET /products` — list products
- `GET /products/:id` — single product

### Cart (protected — send `Authorization: Bearer <token>`)
- `GET /cart` — current user's cart
- `POST /cart` — body: `{ productId, quantity }` (adds or increments)
- `PUT /cart/:id` — body: `{ quantity }` (set qty; qty<1 removes)
- `DELETE /cart/:id` — remove item

## 🧪 Thunder Client
Import `thunderclient/ShoppyGlobe_APIs.json` into VS Code Thunder Client.
Update the **Env** or **Auth header** with your JWT token after login.

## 🛡️ Validation & Errors
- Checks for Mongo ObjectId validity
- Verifies product existence and stock constraints
- Centralized 404 + error handler

## 📸 What to include in submission
- Thunder Client screenshots for each route (success + failure cases)
- MongoDB Atlas screenshots showing collections

## ✅ Notes
- Ensure your IP is allowed in MongoDB Atlas Network Access
- If using local MongoDB: set `MONGODB_URI=mongodb://127.0.0.1:27017/shoppyglobe`

Happy building!
