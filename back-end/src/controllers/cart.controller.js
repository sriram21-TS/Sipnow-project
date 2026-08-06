const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
}

async function getCart(req, res) {
  const cart = await getOrCreateCart(req.user._id);
  res.json({ cart });
}

async function addItem(req, res) {
  const { productId, quantity = 1, packSize = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const cart = await getOrCreateCart(req.user._id);
  const existing = cart.items.find(
    (item) => item.product._id.toString() === productId && item.packSize === packSize
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, packSize });
  }

  await cart.save();
  await cart.populate("items.product");
  res.status(201).json({ cart });
}

async function updateItem(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.find((item) => item.product._id.toString() === productId);
  if (!item) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.product._id.toString() !== productId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  await cart.populate("items.product");
  res.json({ cart });
}

async function removeItem(req, res) {
  const { productId } = req.params;
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((item) => item.product._id.toString() !== productId);
  await cart.save();
  await cart.populate("items.product");
  res.json({ cart });
}

async function clearCart(req, res) {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json({ cart });
}

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
