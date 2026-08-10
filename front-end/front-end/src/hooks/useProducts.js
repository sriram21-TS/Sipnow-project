import { products } from "../data/products.js";

/** Product catalog is bundled with the front-end as static data. */
export function useProducts() {
  return { products, loading: false, error: null };
}
