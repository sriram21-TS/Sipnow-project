import { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchFooterColumns,
  fetchHeroSlides,
  fetchInStorePromotions,
  fetchNavMenus,
  fetchQuiz,
  fetchSiteAssets,
} from "../utils/api.js";

/** Loads a piece of backend-hosted site content once on mount. */
function useContent(fetcher, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}

export function useCategories() {
  return useContent(fetchCategories, []);
}

export function useFooterColumns() {
  return useContent(fetchFooterColumns, []);
}

export function useHeroSlides() {
  return useContent(fetchHeroSlides, []);
}

export function useInStorePromotions() {
  return useContent(fetchInStorePromotions, []);
}

export function useNavMenus() {
  return useContent(fetchNavMenus, []);
}

export function useQuiz() {
  return useContent(fetchQuiz, { quizQuestions: [], quizResults: {} });
}

export function useSiteAssets() {
  return useContent(fetchSiteAssets, {});
}
