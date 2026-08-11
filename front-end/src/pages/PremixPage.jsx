import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { getSubtype, parsePrice } from "../utils/productHelpers.js";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const PRICE_RANGE_BOUNDS = {
  all: [0, Infinity],
  under10: [0, 10],
  "10to20": [10, 20],
  "20to30": [20, 30],
  over30: [30, Infinity],
};

const RATING_THRESHOLDS = {
  all: 0,
  4: 4,
  3: 3,
};

/* -------------------------------------------------
   HELPERS
------------------------------------------------- */

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function slugify(value) {
  return normalize(value)
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function compactMixerSlug(value) {
  return slugify(value)
    .replace(/(^|-)and(?=-|$)/g, "$1")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function humanizeSlug(slug) {
  return String(slug || "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPremixTitle(value) {
  return humanizeSlug(value).replace(/\bAnd\b/g, "&");
}

/* -------------------------------------------------
   PREMIX SUBCATEGORY ALIASES
------------------------------------------------- */

const PREMIX_ALIASES = {
  premix: "all",

  "whiskey-cola": "whiskey-cola",
  "whiskey-and-cola": "whiskey-cola",
  whiskeycola: "whiskey-cola",
  "whisky-cola": "whiskey-cola",
  "whisky-and-cola": "whiskey-cola",
  whiskycola: "whiskey-cola",
  "wisky-cola": "whiskey-cola",
  "wisky-and-cola": "whiskey-cola",
  wiskycola: "whiskey-cola",

  "rum-ginger": "rum-ginger",
  "rum-and-ginger": "rum-ginger",
  rumginger: "rum-ginger",

  "vodka-mixers": "vodka-mixers",
  vodkamixers: "vodka-mixers",

  "hard-seltzer": "hard-seltzer",
  hardseltzer: "hard-seltzer",

  lemonade: "lemonade",

  margarita: "margarita",

  cocktails: "cocktails",

  "espresso-martini": "espresso-martini",
  espressomartini: "espresso-martini",

  "dark-spirits": "dark-spirits",
  darkspirits: "dark-spirits",
};

/* -------------------------------------------------
   GET ALL POSSIBLE CATEGORY VALUES FROM PRODUCT
------------------------------------------------- */

function getProductValues(product) {
  return [
    product?.name,
    product?.title,
    product?.category,
    product?.type,
    product?.subtype,
    product?.subCategory,
    product?.subcategory,
    product?.categoryName,
    product?.categoryGroup,
    product?.badgeText,
  ]
    .filter(Boolean)
    .map(normalize);
}

/* -------------------------------------------------
   CHECK WHETHER PRODUCT BELONGS TO SELECTED CATEGORY
------------------------------------------------- */

function productMatchesCategory(product, selectedCategory) {
  const category = normalize(selectedCategory);

  if (!category || category === "all" || category === "premix") {
    return true;
  }

  const selectedSlug = slugify(category);
  const selectedCompactSlug = compactMixerSlug(category);

  const productValues = getProductValues(product);

  return productValues.some((value) => {
    const valueSlug = slugify(value);
    const valueCompactSlug = compactMixerSlug(value);

    /* Exact text match */
    if (value === category) {
      return true;
    }

    /* Exact slug match */
    if (valueSlug === selectedSlug) {
      return true;
    }

    /*
     * Treat "Whiskey & Cola", "Whiskey and Cola",
     * and "whiskey-cola" as the same subcategory.
     * Same applies to "Rum & Ginger" / "rum-ginger".
     */
    if (
      valueCompactSlug === selectedCompactSlug ||
      valueCompactSlug.includes(selectedCompactSlug) ||
      selectedCompactSlug.includes(valueCompactSlug)
    ) {
      return true;
    }

    /* Alias match */
    const aliasValue = PREMIX_ALIASES[valueSlug];

    if (aliasValue === selectedSlug) {
      return true;
    }

    /*
     * Example:
     *
     * selected = whiskey-cola
     * product category =
     * Whiskey & Cola · 330mL
     */
    if (valueSlug.includes(selectedSlug) || selectedSlug.includes(valueSlug)) {
      return true;
    }

    /*
     * Handle "and" / "&"
     */
    const normalizedValue = value.replace(/\band\b/g, "&");

    const normalizedCategory = category.replace(/\band\b/g, "&");

    if (normalizedValue.includes(normalizedCategory)) {
      return true;
    }

    return false;
  });
}

/* -------------------------------------------------
   COMPONENT
------------------------------------------------- */

export default function PremixPage({
  title,
  subtitle,
  category,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const navigate = useNavigate();
  const { categoryKey } = useParams();

  /* -------------------------------------------------
     RESOLVE CATEGORY
  ------------------------------------------------- */

  const urlCategory = normalize(categoryKey);

  const propCategory = normalize(category);

  /*
   * If URL contains a specific category,
   * use that.
   *
   * Otherwise, if category prop is generic "premix",
   * use the title as the subcategory.
   */
  const resolvedCategory =
    urlCategory ||
    (propCategory && propCategory !== "premix"
      ? propCategory
      : title
        ? slugify(title)
        : "all");

  const activeCategory = PREMIX_ALIASES[resolvedCategory] || resolvedCategory;

  /* -------------------------------------------------
     PAGE TITLE
  ------------------------------------------------- */

  const resolvedTitle = title
    ? formatPremixTitle(title)
    : categoryKey
      ? formatPremixTitle(categoryKey)
      : "Premix";

  /* -------------------------------------------------
     PAGE DESCRIPTION
  ------------------------------------------------- */

  const resolvedSubtitle =
    subtitle ||
    `Explore our range of ${resolvedTitle.toLowerCase()} ready-to-drink favourites.`;

  /* -------------------------------------------------
     CART
  ------------------------------------------------- */

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  /* -------------------------------------------------
     FILTER STATES
  ------------------------------------------------- */

  const [selectedSubtypes, setSelectedSubtypes] = useState([]);

  const [priceRange, setPriceRange] = useState("all");

  const [rating, setRating] = useState("all");

  const [sort, setSort] = useState("featured");

  const [filtersOpen, setFiltersOpen] = useState(false);

  /* -------------------------------------------------
     SUBTYPE TOGGLE
  ------------------------------------------------- */

  const toggleSubtype = (subtype) => {
    setSelectedSubtypes((current) =>
      current.includes(subtype)
        ? current.filter((item) => item !== subtype)
        : [...current, subtype]
    );
  };

  /* -------------------------------------------------
     CLEAR FILTERS
  ------------------------------------------------- */

  const clearAllFilters = () => {
    setSelectedSubtypes([]);
    setPriceRange("all");
    setRating("all");
  };

  /* -------------------------------------------------
     GET PREMIX PRODUCTS
  ------------------------------------------------- */

  const premixProducts = useMemo(() => {
    /*
     * If this is the main Premix page,
     * show Premix products.
     */
    if (activeCategory === "all" || activeCategory === "premix") {
      return products.filter((product) => {
        const categoryGroup = normalize(product?.categoryGroup);

        const categoryName = normalize(product?.category);

        return categoryGroup === "premix" || categoryName.includes("premix");
      });
    }

    /*
     * Specific Premix subcategory.
     *
     * Example:
     * Whiskey & Cola
     * Rum & Ginger
     * Margarita
     */
    return products.filter((product) =>
      productMatchesCategory(product, activeCategory)
    );
  }, [products, activeCategory]);

  /* -------------------------------------------------
     APPLY FILTERS + SORT
  ------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];

    const minRating = RATING_THRESHOLDS[rating];

    const filtered = premixProducts.filter((product) => {
      /* SUBTYPE */
      if (
        selectedSubtypes.length > 0 &&
        !selectedSubtypes.includes(getSubtype(product))
      ) {
        return false;
      }

      /* PRICE */
      const price = parsePrice(product.price);

      if (price < minPrice || price > maxPrice) {
        return false;
      }

      /* RATING */
      return Number(product.rating || 0) >= minRating;
    });

    /* SORT */
    const sorted = [...filtered];

    if (sort === "price-asc") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }

    if (sort === "price-desc") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    if (sort === "rating") {
      sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    return sorted;
  }, [premixProducts, selectedSubtypes, priceRange, rating, sort]);

  /* -------------------------------------------------
     PAGE UI
  ------------------------------------------------- */

  return (
    <div className="pt-32 pb-24">
      {/* =============================================
          PAGE HERO
      ============================================= */}

      <PageHero
        description={resolvedSubtitle}
        onBack={onBack || (() => navigate("/"))}
        tag="Premix"
        title={resolvedTitle}
      />

      {/* =============================================
          CONTENT
      ============================================= */}

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* =========================================
            MOBILE FILTER BUTTON
        ========================================= */}

        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>

          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* =========================================
            FILTERS + PRODUCTS
        ========================================= */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* =======================================
              FILTER SIDEBAR
          ======================================= */}

          <aside
            className={`lg:w-72 shrink-0 ${
              filtersOpen ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="lg:sticky lg:top-32">
              <ProductFilters
                hideAlcoholType
                onClearAll={clearAllFilters}
                onPriceRangeChange={setPriceRange}
                onRatingChange={setRating}
                onToggleSubtype={toggleSubtype}
                priceRange={priceRange}
                products={premixProducts}
                rating={rating}
                resultCount={filteredProducts.length}
                selectedSubtypes={selectedSubtypes}
              />
            </div>
          </aside>

          {/* =======================================
              PRODUCT AREA
          ======================================= */}

          <div className="flex-1 min-w-0">
            {/* =====================================
                COUNT + SORT
            ===================================== */}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products..."
                  : `Showing ${filteredProducts.length} of ${premixProducts.length} products`}
              </p>

              <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span>Sort by</span>

                <select
                  className="glass-panel rounded-lg px-3 py-1.5 text-sm text-on-surface bg-surface-container-high border border-primary/20 focus:outline-none focus:border-primary"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* =====================================
                PRODUCT GRID
            ===================================== */}

            <ProductGrid
              addedProduct={addedProduct}
              emptyMessage={`No ${resolvedTitle} products match these filters. Try adjusting your selection.`}
              onAddToCart={handleAddToCart}
              products={filteredProducts}
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
