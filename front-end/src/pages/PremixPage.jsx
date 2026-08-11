import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
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

function humanizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PremixPage({
  title,
  subtitle,
  category,
  onAddToCart,
  products = [],
  productsLoading = false,
}) {
  const { categoryKey } = useParams();

  const resolvedTitle =
    title || (categoryKey ? humanizeSlug(categoryKey) : "Premix");
  const resolvedCategory = category ?? categoryKey ?? "premix";
  const resolvedSubtitle =
    subtitle ||
    `Explore our range of ${resolvedTitle.toLowerCase()} ready-to-drink favourites.`;

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSubtype = (subtype) => {
    setSelectedSubtypes((current) =>
      current.includes(subtype)
        ? current.filter((item) => item !== subtype)
        : [...current, subtype]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubtypes([]);
    setPriceRange("all");
    setRating("all");
  };

  const premixProducts = useMemo(() => {
    if (!resolvedCategory) {
      return products;
    }

    const searchValue = resolvedCategory.trim().toLowerCase();

    return products.filter((product) => {
      const name = String(product.name || "")
        .trim()
        .toLowerCase();

      const productCategory = String(product.category || "")
        .trim()
        .toLowerCase();

      return (
        name.includes(searchValue) || productCategory.includes(searchValue)
      );
    });
  }, [products, resolvedCategory]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];

    const minRating = RATING_THRESHOLDS[rating];

    const filtered = premixProducts.filter((product) => {
      if (
        selectedSubtypes.length > 0 &&
        !selectedSubtypes.includes(getSubtype(product))
      ) {
        return false;
      }

      const price = parsePrice(product.price);

      if (price < minPrice || price > maxPrice) {
        return false;
      }

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
  }, [premixProducts, selectedSubtypes, priceRange, rating, sort]);

  return (
    <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-32 pb-20">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Premix
        </p>

        <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-4">
          {resolvedTitle}
        </h1>

        <p className="text-on-surface-variant text-lg max-w-2xl">
          {resolvedSubtitle}
        </p>
      </div>

      {/* Mobile Filters */}
      <button
        className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
        onClick={() => setFiltersOpen((open) => !open)}
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">tune</span>

        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters + Products */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Filters */}
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

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-on-surface-variant">
              {productsLoading
                ? "Loading products..."
                : `Showing ${filteredProducts.length} of ${premixProducts.length} products`}
            </p>

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

          <ProductGrid
            addedProduct={addedProduct}
            emptyMessage="No products found in this collection."
            onAddToCart={handleAddToCart}
            products={filteredProducts}
          />
        </div>
      </div>
    </div>
  );
}
