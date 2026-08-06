const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// Product management — protected for now; add an admin-role check before shipping.
router.post("/", requireAuth, createProduct);
router.put("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

module.exports = router;
