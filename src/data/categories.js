import {
  BEER_FEATURED_URL,
  WINE_FEATURED_URL,
  SPIRITS_FEATURED_URL,
  ZERO_PROOF_URL,
} from "./images.js";
import premix from "../assets/products/cooper.png";

export const categories = [
  {
    key: "beer",
    name: "Beer",
    tag: "Artisanal & Craft",
    image: BEER_FEATURED_URL,
  },
  {
    key: "wine",
    name: "Wine",
    tag: "Old World Classics",
    image: WINE_FEATURED_URL,
  },
  {
    key: "spirits",
    name: "Spirits",
    tag: "Global Selection",
    image: SPIRITS_FEATURED_URL,
  },
  {
    key: "zero-proof",
    name: "Zero Proof",
    tag: "Mindful Excellence",
    image: ZERO_PROOF_URL,
  },
  { key: "premix", name: "Premix", tag: "Ready to Pour", image: premix },
];
