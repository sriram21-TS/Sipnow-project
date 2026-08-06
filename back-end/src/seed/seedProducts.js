require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const productsData = require("./products.data");

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(productsData);
  console.log(`Seeded ${productsData.length} products.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
