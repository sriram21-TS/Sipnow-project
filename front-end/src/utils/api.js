export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN || "http://localhost:5001";
export const API_URL = `${API_ORIGIN}/api`;

/** Product images come back as either an absolute URL or a backend-relative path (e.g. "/assets/products/campo.png"). */
export function resolveImageUrl(image) {
  if (!image) return image;
  return image.startsWith("/") ? `${API_ORIGIN}${image}` : image;
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to load products (${res.status})`);
  }
  const { products } = await res.json();
  return products.map((product) => ({
    ...product,
    id: product._id,
    image: resolveImageUrl(product.image),
  }));
}
