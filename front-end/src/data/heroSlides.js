import {
  BEER_FEATURED_URL,
  WINE_FEATURED_URL,
  SPIRITS_FEATURED_URL,
  CELLAR_HIGHLIGHT_URL,
  PENFOLDS_URL,
  YAMAZAKI_URL,
  PRESTIGE_COLLECTION_URL,
} from "./images.js";

export const heroSlides = [
  {
    bgImage: CELLAR_HIGHLIGHT_URL,
    bgAlt: "Rare vintage wine cellar",
    badge: "Rare Vintage Selection",
    titleLines: ["Elevate Your", "Midnight Hour."],
    description:
      "Curated excellence from the world's most prestigious cellars, delivered with artisanal precision to your doorstep.",
    primaryCta: "Explore Collections",
    secondaryCta: "Rare Finds",
    card: {
      image: CELLAR_HIGHLIGHT_URL,
      tag: "Cellar Highlight",
      title: "Vintage Krug Selection",
    },
  },
  {
    bgImage: WINE_FEATURED_URL,
    bgAlt: "Old world red wine",
    badge: "Old World Classics",
    titleLines: ["Uncork The", "Finest Reserve."],
    description:
      "Benchmark wines from a legacy that began in 1844 — handpicked vintages with a spirit of innovation and quality.",
    primaryCta: "Shop Wine Collection",
    secondaryCta: "View Cellar",
    card: {
      image: PENFOLDS_URL,
      tag: "Best Seller · $135.00",
      title: "Penfolds St Henri Shiraz",
    },
  },
  {
    bgImage: SPIRITS_FEATURED_URL,
    bgAlt: "Global spirits selection",
    badge: "Global Spirits Selection",
    titleLines: ["Discover Rare", "Single Malts."],
    description:
      "From Japanese craftsmanship to Scottish tradition — an exceptional spirits collection for the discerning palate.",
    primaryCta: "Shop Spirits",
    secondaryCta: "Find Rare Malts",
    card: {
      image: YAMAZAKI_URL,
      tag: "Rare Single Malt · $289.00",
      title: "Yamazaki 12 Year Old",
    },
  },
  {
    bgImage: BEER_FEATURED_URL,
    bgAlt: "Craft beer collection",
    badge: "Artisanal & Craft",
    titleLines: ["Cool Down With", "Craft Perfection."],
    description:
      "Independent brewers, bold flavours, small batches — the season's most awarded craft beer, curated for you.",
    primaryCta: "Shop Craft Beer",
    secondaryCta: "View Range",
    card: {
      image: PRESTIGE_COLLECTION_URL,
      tag: "Seasonal Curations",
      title: "2024 Prestige Collection",
    },
  },
];
