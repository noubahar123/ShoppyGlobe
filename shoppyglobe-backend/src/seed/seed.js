import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

const uri = "mongodb+srv://shoppyglobe:shoppyglobe123@cluster0.d6xr0h5.mongodb.net/shoppyglobe?retryWrites=true&w=majority&appName=Cluster0";
if (!uri) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

const products = [
  { name: "Wireless Mouse", price: 799, description: "Ergonomic 2.4G mouse", stock: 50 },
  { name: "Mechanical Keyboard", price: 3499, description: "Blue switch, RGB", stock: 30 },
  { name: "USB-C Cable", price: 299, description: "1m fast charging", stock: 200 },
  { name: "Laptop Stand", price: 1299, description: "Aluminum adjustable", stock: 40 }
];

async function seed() {
  try {
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Seeded products:", products.length);
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
