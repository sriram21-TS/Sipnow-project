const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
