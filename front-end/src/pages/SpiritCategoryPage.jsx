import { useMemo, useState } from "react";

import PageHero from "../components/PageHero.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { getSubtype, parsePrice } from "../utils/productHelpers.js";

const SORT_OPTIONS = [
  {
    key: "featured",
    label: "Featured",
  },
  {
    key: "price-asc",
    label: "Price: Low to High",
  },
  {
    key: "price-desc",
    label: "Price: High to Low",
  },
  {
    key: "rating",
    label: "Top Rated",
  },
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

export default function SpiritCategoryPage({
  title,
  description,
  products = [],
  onAddToCart,
  onBack,
  productsLoading = false,
}) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const [selectedSubtypes, setSelectedSubtypes] = useState([]);

  const [priceRange, setPriceRange] = useState("all");

  const [rating, setRating] = useState("all");

  const [sort, setSort] = useState("featured");

  const [filtersOpen, setFiltersOpen] = useState(false);

  // =========================================
  // SUBTYPE FILTER
  // =========================================

  const toggleSubtype = (subtype) => {
    setSelectedSubtypes((current) =>
      current.includes(subtype)
        ? current.filter((item) => item !== subtype)
        : [...current, subtype]
    );
  };

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearAllFilters = () => {
    setSelectedSubtypes([]);
    setPriceRange("all");
    setRating("all");
  };

  // =========================================
  // FILTER + SORT PRODUCTS
  // =========================================

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];

    const minRating = RATING_THRESHOLDS[rating];

    const filtered = products.filter((product) => {
      // Subtype
      if (
        selectedSubtypes.length > 0 &&
        !selectedSubtypes.includes(getSubtype(product))
      ) {
        return false;
      }

      // Price
      const price = parsePrice(product.price);

      if (price < minPrice || price > maxPrice) {
        return false;
      }

      // Rating
      return product.rating >= minRating;
    });

    const sorted = [...filtered];

    if (sort === "price-asc") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [products, selectedSubtypes, priceRange, rating, sort]);

  return (
    <>
      {/* =====================================
          PAGE HERO
      ===================================== */}

      <PageHero
        title={title}
        tag="Spirits"
        description={
          description ||
          `Explore our curated selection of ${title.toLowerCase()}, handpicked for every occasion.`
        }
        onBack={onBack}
      />

      {/* =====================================
          PRODUCTS
      ===================================== */}

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* MOBILE FILTER BUTTON */}

        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>

          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* =====================================
              FILTER SIDEBAR
          ===================================== */}

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
                onToggleSubtype={toggleSubtype}
                priceRange={priceRange}
                products={products}
                rating={rating}
                resultCount={filteredProducts.length}
                selectedSubtypes={selectedSubtypes}
              />
            </div>
          </aside>

          {/* =====================================
              PRODUCT SECTION
          ===================================== */}

          <div className="flex-1 min-w-0">
            {/* SECTION HEADER */}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} of ${products.length} ${title} products`}
              </p>

              {/* SORT */}

              <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                Sort by
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
              emptyMessage={`New ${title} arrivals are on the way. Check back soon.`}
              onAddToCart={handleAddToCart}
              products={filteredProducts}
            />
          </div>
        </div>
      </Reveal>
    </>
  );
}
