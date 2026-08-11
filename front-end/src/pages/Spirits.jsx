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
// SPIRIT TYPES
// =====================================================

const SPIRIT_TYPES = [
  "Gin",
  "Rum",
  "Vodka",
  "Bourbon",
  "Tequila",
  "Liqueurs",
  "Brandy & Cognac",
  "Other Spirits",
  "Whisky",
];

// =====================================================
// DUMMY PRODUCTS
// 10 PRODUCTS FOR EVERY SPIRIT TYPE
// =====================================================

const DUMMY_SPIRIT_PRODUCTS = SPIRIT_TYPES.flatMap((type) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: `dummy-${type.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,

    // Empty image = dummy product card
    image: "",

    badgeStyle: index === 0 ? "glow" : "plain",

    icon: "liquor",

    badgeText: `Best in ${type}`,

    category:
      type === "Brandy & Cognac"
        ? "Brandy & Cognac · 700mL"
        : `${type} · 700mL`,

    categoryGroup: "spirits",

    type: type,

    name: `${type} Dummy Product ${index + 1}`,

    rating: Number((4 + (index % 5) * 0.2).toFixed(1)),

    reviewCount: 25 + index * 15,

    price: `$${(12.99 + index * 3).toFixed(2)}`,
  }))
);

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

  whisky: "Whisky",
  whiskey: "Whisky",
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

  const normalizedSelectedType = selectedType?.toLowerCase().trim() || "";

  // ===================================================
  // CART
  // ===================================================

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  // ===================================================
  // FILTER STATE
  // ===================================================

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [priceRange, setPriceRange] = useState("all");

  const [rating, setRating] = useState("all");

  const [sort, setSort] = useState("featured");

  // ===================================================
  // PAGE TITLE
  // ===================================================

  const pageTitle = SPIRIT_NAMES[normalizedSelectedType] || "Spirits";

  // ===================================================
  // ALL SPIRIT PRODUCTS
  // ===================================================

  const spiritProducts = useMemo(() => {
    const existingSpirits = products.filter(
      (product) => product.categoryGroup === "spirits"
    );

    return [...existingSpirits, ...DUMMY_SPIRIT_PRODUCTS];
  }, [products]);

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
  // FILTER + SORT
  // ===================================================

  const filteredProducts = useMemo(() => {
    let result = [...spiritProducts];

    // ---------------------------------------------
    // URL TYPE FILTER
    // ---------------------------------------------

    if (normalizedSelectedType) {
      result = result.filter((product) => {
        const productType = product.type?.toLowerCase().trim();

        // Handle spelling variations
        if (
          normalizedSelectedType === "tequila" ||
          normalizedSelectedType === "tequilla"
        ) {
          return productType === "tequila" || productType === "tequilla";
        }

        if (
          normalizedSelectedType === "liquerus" ||
          normalizedSelectedType === "liqueurs"
        ) {
          return productType === "liquerus" || productType === "liqueurs";
        }

        if (
          normalizedSelectedType === "brandy & cognac" ||
          normalizedSelectedType === "brandy-and-cognac"
        ) {
          return (
            productType === "brandy & cognac" ||
            productType === "brandy-and-cognac"
          );
        }

        if (
          normalizedSelectedType === "other spirits" ||
          normalizedSelectedType === "other-spirits"
        ) {
          return (
            productType === "other spirits" || productType === "other-spirits"
          );
        }

        return productType === normalizedSelectedType;
      });
    }

    // ---------------------------------------------
    // SIDEBAR TYPE FILTER
    // ---------------------------------------------

    if (!normalizedSelectedType && selectedTypes.length > 0) {
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
  }, [
    spiritProducts,
    normalizedSelectedType,
    selectedTypes,
    priceRange,
    rating,
    sort,
  ]);

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
    <div className="min-h-screen px-margin-mobile md:px-margin-desktop pt-28 pb-16">
      <Reveal>
        {/* =========================================
          BACK TO HOME
      ========================================= */}

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10 cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to home
        </button>

        {/* =========================================
          PAGE TITLE
      ========================================= */}

        <div className="mb-14">
          {/* FULL COLLECTION */}

          <div className="inline-flex px-5 py-2 rounded-full border border-primary/40 text-primary text-xs uppercase tracking-[0.2em] mb-8">
            Full Collection
          </div>

          {/* TITLE */}

          <h1 className="font-serif text-5xl md:text-6xl text-on-surface">
            {pageTitle}
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-5 text-lg text-on-surface-variant">
            {pageDescription}
          </p>
        </div>

        {/* =========================================
          FILTER + PRODUCT AREA
      ========================================= */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* =====================================
            LEFT FILTER SIDEBAR
        ===================================== */}

          <aside className="lg:w-72 shrink-0">
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
              />
            </div>
          </aside>

          {/* =====================================
            RIGHT PRODUCT AREA
        ===================================== */}

          <div className="flex-1 min-w-0">
            {/* ===================================
              PRODUCT COUNT + SORT
          =================================== */}

            <div className="flex items-center justify-between mb-6">
              {/* PRODUCT COUNT */}

              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products..."
                  : `Showing ${filteredProducts.length} of ${filteredProducts.length} products`}
              </p>

              {/* SORT */}

              <label className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span>Sort by</span>

                <select
                  className="glass-panel rounded-lg px-4 py-2 text-sm text-on-surface bg-surface-container-high border border-primary/40 focus:outline-none focus:border-primary cursor-pointer"
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

            {/* ===================================
              PRODUCT GRID
          =================================== */}

            <ProductGrid
              addedProduct={addedProduct}
              onAddToCart={handleAddToCart}
              products={filteredProducts}
              emptyMessage={
                normalizedSelectedType
                  ? `No ${pageTitle} products found.`
                  : "New spirits are on the way. Check back soon."
              }
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
