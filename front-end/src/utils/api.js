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

async function getJson(path) {
  const res = await fetch(`${API_URL}/content/${path}`);
  if (!res.ok) {
    throw new Error(`Failed to load ${path} (${res.status})`);
  }
  return res.json();
}

export async function fetchCategories() {
  const { categories } = await getJson("categories");
  return categories.map((category) => ({
    ...category,
    image: resolveImageUrl(category.image),
  }));
}

export async function fetchFooterColumns() {
  const { footerColumns } = await getJson("footer-columns");
  return footerColumns;
}

export async function fetchHeroSlides() {
  const { heroSlides } = await getJson("hero-slides");
  return heroSlides.map((slide) => ({
    ...slide,
    bgImage: resolveImageUrl(slide.bgImage),
    card: { ...slide.card, image: resolveImageUrl(slide.card.image) },
  }));
}

export async function fetchInStorePromotions() {
  const { inStorePromotions } = await getJson("in-store-promotions");
  return inStorePromotions.map((promo) => ({
    ...promo,
    image: resolveImageUrl(promo.image),
  }));
}

export async function fetchNavMenus() {
  const { navMenus } = await getJson("nav-menus");
  return navMenus.map((menu) => ({
    ...menu,
    featured: menu.featured?.type
      ? { ...menu.featured, image: resolveImageUrl(menu.featured.image) }
      : undefined,
  }));
}

export async function fetchQuiz() {
  const { quizQuestions, quizResults } = await getJson("quiz");
  return { quizQuestions, quizResults };
}

export async function fetchSiteAssets() {
  const { siteAssets } = await getJson("site-assets");
  return Object.fromEntries(
    Object.entries(siteAssets).map(([key, url]) => [key, resolveImageUrl(url)])
  );
}
