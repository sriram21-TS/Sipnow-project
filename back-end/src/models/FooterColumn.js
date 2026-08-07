const mongoose = require("mongoose");

const footerColumnSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    links: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FooterColumn", footerColumnSchema);
