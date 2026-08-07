const mongoose = require("mongoose");

const navMenuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    columns: [
      {
        _id: false,
        heading: { type: String, required: true },
        items: { type: [String], default: [] },
      },
    ],
    featured: {
      type: { type: String, enum: ["image", "icon", "image-only"] },
      image: { type: String },
      icon: { type: String },
      tag: { type: String },
      title: { type: String },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NavMenu", navMenuSchema);
