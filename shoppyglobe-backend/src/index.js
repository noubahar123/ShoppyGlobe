import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "ShoppyGlobe API up" }));

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);


// To diagnose product data
app.get("/__diag", async (req, res) => {
  const dbName = mongoose.connection.name;
  const host = mongoose.connection.host;
  const coll = Product.collection.name; // should be "products"
  const count = await Product.countDocuments();
  res.json({ dbName, host, collection: coll, productCount: count });
});
app.use(notFound);
app.use(errorHandler);




const PORT = 5000;
const MONGODB_URI = "mongodb+srv://shoppyglobe:shoppyglobe123@cluster0.d6xr0h5.mongodb.net/shoppyglobe?retryWrites=true&w=majority&appName=Cluster0"; 


// Test DB :- mongodb+srv://shoppyglobe:shoppyglobe123@cluster0.d6xr0h5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// shoppyglobe DB :-mongodb+srv://shoppyglobe:shoppyglobe123@cluster0.d6xr0h5.mongodb.net/shoppyglobe?retryWrites=true&w=majority&appName=Cluster0


if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment (.env)");
  process.exit(1);
}

connectDB(MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
