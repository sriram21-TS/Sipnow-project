const Product = require("../models/Product");

async function getProducts(req, res) {
  const { categoryGroup, search, minPrice, maxPrice, minRating, sort } = req.query;
  const filter = {};

  if (categoryGroup) filter.categoryGroup = categoryGroup;
  if (search) filter.name = { $regex: search, $options: "i" };
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 },
  };

  const products = await Product.find(filter).sort(sortMap[sort] || { createdAt: -1 });
  res.json({ products });
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ product });
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ product });
}

async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(204).send();
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
