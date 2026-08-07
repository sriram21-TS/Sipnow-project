const mongoose = require("mongoose");

// Shared, named image URLs referenced by multiple pages/components
// (logo, category/brand feature images) that don't belong to any single collection.
const siteAssetSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteAsset", siteAssetSchema);
