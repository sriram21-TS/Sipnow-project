import jacobGreek from "../assets/products/jacob-greek.png";
import campo from "../assets/products/campo.png";
import cooper from "../assets/products/cooper.png";

export const products = [
  {
    image: jacobGreek,
    badgeStyle: "glow",
    icon: "wine_bar",
    badgeText: "Best in White Wine",
    category: "White Wine · 750mL",
    categoryGroup: "wine",
    name: "Jacob's Creek Cool Harvest Sauvignon Blanc",
    rating: 4.5,
    reviewCount: 128,
    price: "$10.13",
  },
  {
    image: campo,
    badgeStyle: "glow",
    icon: "wine_bar",
    badgeText: "Best in Red Wine",
    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    name: "Campo Viejo Tempranillo",
    rating: 4.0,
    reviewCount: 76,
    price: "$12.57",
  },
  {
    image:
      "https://media.sipnow.com.au/sipnow/products/GUEST_e307542d-1e91-4688-859b-9bbb0a78b3ce__1_.jpg",
    badgeStyle: "glow",
    icon: "liquor",
    badgeText: "Best in Vodka",
    category: "Vodka · 6 x 200mL",
    categoryGroup: "spirits",
    name: "Absolut Vodka 6 Pack",
    rating: 5.0,
    reviewCount: 203,
    price: "$17.98",
  },
  {
    image: cooper,
    badgeStyle: "glow",
    icon: "sports_bar",
    badgeText: "Best in Beer",
    category: "Beer · 750mL",
    categoryGroup: "beer",
    name: "Coopers Original Pale Ale Longneck",
    rating: 4.2,
    reviewCount: 94,
    price: "$6.09",
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/001.webp",
    badgeStyle: "glow",
    icon: "liquor",
    badgeText: "Best in Whiskey",
    category: "Whiskey · 10 x 375mL",
    categoryGroup: "spirits",
    name: "Jim Beam Double Serve 6.7%",
    rating: 4.6,
    reviewCount: 57,
    price: "$5.22",
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/180729-1.webp",
    badgeStyle: "plain",
    badgeText: "Best in Sparkling",
    category: "Sparkling · 750mL",
    categoryGroup: "wine",
    name: "Chandon Garden Spritz",
    rating: 4.9,
    reviewCount: 312,
    price: "$27.73",
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    badgeStyle: "plain",
    badgeText: "Best in Beer",
    category: "Beer · 355mL",
    categoryGroup: "beer",
    name: "Byron Bay Brewery Premium Lager",
    rating: 4.1,
    reviewCount: 68,
    price: "$2.83",
  },
  {
    image: "https://media.sipnow.com.au/sipnow/products/901870-1.png",
    badgeStyle: "plain",
    badgeText: "Best in Red Wine",
    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    name: "Grant Burge Miamba Shiraz",
    rating: 4.7,
    reviewCount: 145,
    price: "$15.51",
  },
  {
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600",
    BadgeStyle: "plain",
    BadgeText: "Best in Red Wine",
    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    name: "19 crimes Red Blend",
    rating: 4.3,
    reviewCount: 89,
    price: 31.99,
  },
  {
    image:
      "https://www.edsfinewines.com/wp-content/uploads/2021/02/Penfolds-Bin-600.jpg",
    BadgeStyle: "plain",
    BadgeText: "Best in Red Wine",
    category: "Red Wine · 750mL",
    categoryGroup: "wine",
    name: "Pepperjack Shiraz",
    rating: 4.3,
    reviewCount: 89,
    price: 31.99,
  },
];

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

export function getProductsByCategory(categoryText) {
  return products.filter((product) =>
    product.category?.toLowerCase().includes(categoryText.toLowerCase())
  );
}

export const redWineProducts = getProductsByCategory("Red Wine");
