import { categories } from "../data/categories.js";
import { footerColumns } from "../data/footerLinks.js";
import { heroSlides } from "../data/heroSlides.js";
import { inStorePromotions } from "../data/inStorePromotions.js";
import { navMenus } from "../data/navigation.js";
import { quizQuestions, quizResults } from "../data/quiz.js";
import {
  LOGO_URL,
  BEER_FEATURED_URL,
  WINE_FEATURED_URL,
  SPIRITS_FEATURED_URL,
  ZERO_PROOF_URL,
  CELLAR_HIGHLIGHT_URL,
  PENFOLDS_URL,
  YAMAZAKI_URL,
  PRESTIGE_COLLECTION_URL,
} from "../data/images.js";

const siteAssets = {
  LOGO_URL,
  BEER_FEATURED_URL,
  WINE_FEATURED_URL,
  SPIRITS_FEATURED_URL,
  ZERO_PROOF_URL,
  CELLAR_HIGHLIGHT_URL,
  PENFOLDS_URL,
  YAMAZAKI_URL,
  PRESTIGE_COLLECTION_URL,
};

/** Site content is bundled with the front-end as static data, so these are synchronous. */
export function useCategories() {
  return { data: categories, loading: false, error: null };
}

export function useFooterColumns() {
  return { data: footerColumns, loading: false, error: null };
}

export function useHeroSlides() {
  return { data: heroSlides, loading: false, error: null };
}

export function useInStorePromotions() {
  return { data: inStorePromotions, loading: false, error: null };
}

export function useNavMenus() {
  return { data: navMenus, loading: false, error: null };
}

export function useQuiz() {
  return { data: { quizQuestions, quizResults }, loading: false, error: null };
}

export function useSiteAssets() {
  return { data: siteAssets, loading: false, error: null };
}
