import {
  BEER_FEATURED_URL,
  WINE_FEATURED_URL,
  SPIRITS_FEATURED_URL,
  ZERO_PROOF_URL,
} from "./images.js";
import premix from "../assets/products/cooper.png";

export const categories = [
  { name: "Beer", tag: "Artisanal & Craft", image: BEER_FEATURED_URL },
  { name: "Wine", tag: "Old World Classics", image: WINE_FEATURED_URL },
  { name: "Spirits", tag: "Global Selection", image: SPIRITS_FEATURED_URL },
  { name: "Zero Proof", tag: "Mindful Excellence", image: ZERO_PROOF_URL },
  { name: "Premix", tag: "Ready to Pour", image: premix },
];
