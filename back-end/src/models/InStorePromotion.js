const mongoose = require("mongoose");

const inStorePromotionSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    icon: { type: String, required: true },
    badgeText: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    originalPrice: { type: String, required: true },
    price: { type: String, required: true },
    promoLabel: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InStorePromotion", inStorePromotionSchema);
