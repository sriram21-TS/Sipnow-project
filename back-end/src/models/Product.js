const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true }, // e.g. "Red Wine · 750mL"
    categoryGroup: {
      type: String,
      required: true,
      enum: ["wine", "spirits", "beer", "zero-proof", "premix"],
    },
    icon: { type: String },
    badgeStyle: { type: String, enum: ["glow", "plain"], default: "plain" },
    badgeText: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    packSizes: { type: [Number], default: [1, 6] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
