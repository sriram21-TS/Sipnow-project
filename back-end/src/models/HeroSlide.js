const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    bgImage: { type: String, required: true },
    bgAlt: { type: String, required: true },
    badge: { type: String, required: true },
    titleLines: { type: [String], default: [] },
    description: { type: String, required: true },
    primaryCta: { type: String, required: true },
    secondaryCta: { type: String, required: true },
    card: {
      image: { type: String, required: true },
      tag: { type: String, required: true },
      title: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
