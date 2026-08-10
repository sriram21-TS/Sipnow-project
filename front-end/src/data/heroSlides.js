import { inStorePromotions } from "./inStorePromotions.js";
import {
  WINE_FEATURED_URL,
  CELLAR_HIGHLIGHT_URL,
  PENFOLDS_URL,
  SIPNOW_HERO_BANNER_URL,
} from "./images.js";

export const heroSlides = [
  {
    bgImage: SIPNOW_HERO_BANNER_URL,
    bgAlt: "SipNow brand banner",
    imageOnly: true,
    badge: "",
    titleLines: ["", ""],
    description: "",
    primaryCta: "",
    secondaryCta: "",
    card: {
      image: SIPNOW_HERO_BANNER_URL,
      tag: "",
      title: "SipNow Brand Banner",
    },
  },
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
    promotions: inStorePromotions.slice(0, 4),
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
    quiz: true,
  },
];
