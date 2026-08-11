import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PageHero from "../components/PageHero.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { parsePrice } from "../utils/productHelpers.js";

// =====================================================
// PRICE RANGE
// =====================================================

const PRICE_RANGE_BOUNDS = {
  all: [0, Infinity],
  under10: [0, 10],
  "10to20": [10, 20],
  "20to30": [20, 30],
  over30: [30, Infinity],
};

// =====================================================
// RATING
// =====================================================

const RATING_THRESHOLDS = {
  all: 0,
  4: 4,
  3: 3,
};

// =====================================================
// DISPLAY NAMES
// =====================================================

const SPIRIT_NAMES = {
  gin: "Gin",
  rum: "Rum",
  vodka: "Vodka",
  bourbon: "Bourbon",
  tequila: "Tequila",
  tequilla: "Tequila",
  liquerus: "Liqueurs",
  liqueurs: "Liqueurs",
  "brandy & cognac": "Brandy & Cognac",
  "brandy-and-cognac": "Brandy & Cognac",
  "other spirits": "Other Spirits",
  "other-spirits": "Other Spirits",
};

// =====================================================
// COMPONENT
// =====================================================

export default function Spirits({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  // ===================================================
  // GET ?type= FROM URL
  // ===================================================

  const [searchParams] = useSearchParams();

  const selectedType = searchParams.get("type");

  // ===================================================
  // CART FEEDBACK
  // ===================================================

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  // ===================================================
  // FILTER STATE
  // ===================================================

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [priceRange, setPriceRange] = useState("all");

  const [rating, setRating] = useState("all");

  const [sort, setSort] = useState("featured");

  const [filtersOpen, setFiltersOpen] = useState(false);

  // ===================================================
  // CURRENT PAGE TITLE
  // ===================================================

  const normalizedSelectedType = selectedType?.toLowerCase().trim();

  const pageTitle = SPIRIT_NAMES[normalizedSelectedType] || "Spirits";

  // ===================================================
  // GET ALL SPIRIT PRODUCTS
  // ===================================================

  const spiritProducts = useMemo(() => {
    // Get only products whose
    // categoryGroup is "spirits"

    const allSpirits = products.filter(
      (product) => product.categoryGroup === "spirits"
    );

    // If user clicked only
    // "Spirits", show everything.

    if (!normalizedSelectedType) {
      return allSpirits;
    }

    // Convert URL value to
    // the same format as product.type

    const typeMap = {
      gin: "gin",
      rum: "rum",
      vodka: "vodka",
      bourbon: "bourbon",

      tequila: "tequilla",
      tequilla: "tequilla",

      liquerus: "liquerus",
      liqueurs: "liquerus",

      "brandy & cognac": "brandy & cognac",

      "brandy-and-cognac": "brandy & cognac",

      "other spirits": "other spirits",

      "other-spirits": "other spirits",
    };

    const wantedType =
      typeMap[normalizedSelectedType] || normalizedSelectedType;

    // Return only products
    // belonging to selected type

    return allSpirits.filter(
      (product) => product.type?.toLowerCase().trim() === wantedType
    );
  }, [products, normalizedSelectedType]);

  // ===================================================
  // TYPE FILTER
  // ===================================================

  const toggleType = (type) => {
    setSelectedTypes((current) => {
      if (current.includes(type)) {
        return current.filter((item) => item !== type);
      }

      return [...current, type];
    });
  };

  // ===================================================
  // CLEAR FILTERS
  // ===================================================

  const clearAllFilters = () => {
    setSelectedTypes([]);

    setPriceRange("all");

    setRating("all");
  };

  // ===================================================
  // FILTER + SORT PRODUCTS
  // ===================================================

  const filteredProducts = useMemo(() => {
    let result = [...spiritProducts];

    // ---------------------------------------------
    // TYPE FILTER
    // ---------------------------------------------

    if (selectedTypes.length > 0) {
      result = result.filter((product) => selectedTypes.includes(product.type));
    }

    // ---------------------------------------------
    // PRICE FILTER
    // ---------------------------------------------

    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];

    result = result.filter((product) => {
      const price = parsePrice(product.price);

      return price >= minPrice && price <= maxPrice;
    });

    // ---------------------------------------------
    // RATING FILTER
    // ---------------------------------------------

    const minRating = RATING_THRESHOLDS[rating];

    result = result.filter((product) => product.rating >= minRating);

    // ---------------------------------------------
    // SORT
    // ---------------------------------------------

    if (sort === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [spiritProducts, selectedTypes, priceRange, rating, sort]);

  // ===================================================
  // PAGE DESCRIPTION
  // ===================================================

  const pageDescription = normalizedSelectedType
    ? `Explore our curated selection of ${pageTitle.toLowerCase()}, handpicked for every occasion.`
    : "Explore our complete selection of spirits, including gin, rum, vodka, bourbon, tequila, liqueurs, brandy, cognac and more.";

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <>
      {/* =================================================
          PAGE HERO
      ================================================= */}

      <PageHero
        description={pageDescription}
        onBack={onBack}
        tag="Spirits"
        title={pageTitle}
      />

      {/* =================================================
          PRODUCTS SECTION
      ================================================= */}

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* ===============================================
            MOBILE FILTER BUTTON
        =============================================== */}

        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>

          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* ===============================================
            MAIN CONTENT
        =============================================== */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* =============================================
              FILTER SIDEBAR
          ============================================= */}

          <aside
            className={`lg:w-72 shrink-0 ${
              filtersOpen ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="lg:sticky lg:top-32">
              <ProductFilters
                onClearAll={clearAllFilters}

                onPriceRangeChange={setPriceRange}

                onRatingChange={setRating}

                onToggleSubtype={toggleType}

                priceRange={priceRange}

                products={spiritProducts}

                rating={rating}

                resultCount={filteredProducts.length}

                selectedSubtypes={selectedTypes}
                hideAlcoholType
              />
            </div>
          </aside>

          {/* =============================================
              PRODUCT AREA
          ============================================= */}

          <div className="flex-1 min-w-0">
            {/* =========================================
                RESULT COUNT + SORT
            ========================================= */}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} of ${spiritProducts.length} products`}
              </p>

              <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                Sort by
                <select
                  className="glass-panel rounded-lg px-3 py-1.5 text-sm text-on-surface bg-surface-container-high border border-primary/20 focus:outline-none focus:border-primary"

                  value={sort}

                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Featured</option>

                  <option value="price-asc">Price: Low to High</option>

                  <option value="price-desc">Price: High to Low</option>

                  <option value="rating">Top Rated</option>
                </select>
              </label>
            </div>

            {/* =========================================
                PRODUCT GRID
            ========================================= */}

            <ProductGrid
              addedProduct={addedProduct}

              emptyMessage={
                normalizedSelectedType
                  ? `No ${pageTitle.toLowerCase()} products are available right now.`
                  : "New spirits are on the way. Check back soon."
              }

              onAddToCart={handleAddToCart}

              products={filteredProducts}
            />
          </div>
        </div>
      </Reveal>
    </>
  );
}
