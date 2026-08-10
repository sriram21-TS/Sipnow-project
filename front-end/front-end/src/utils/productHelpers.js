/** Fallback quantity tiers offered in the add-to-cart picker (single unit,
 *  then a case); a product can override with its own `packSizes` array. */
export const DEFAULT_PACK_SIZES = [1, 6];

export function formatPackSize(quantity) {
  return quantity <= 1 ? "Each" : `Case of ${quantity}`;
}

export function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function parsePrice(price) {
  return typeof price === "number"
    ? price
    : Number.parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function getSubtype(product) {
  return product.category?.split("·")[0]?.trim() ?? "";
}
