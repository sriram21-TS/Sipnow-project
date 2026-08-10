import { useMemo, useState } from "react";
import PageHero from "../../components/PageHero.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";
import Reveal from "../../components/Reveal.jsx";
import WineFilters from "./WineFilters.jsx";
import { useAddToCartFeedback } from "../../hooks/useAddToCartFeedback.js";
import { parsePrice } from "../../utils/productHelpers.js";
import { wineCategories } from "../../data/wineCategories.js";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const PRICE_RANGES = {
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

export default function WineSubcategoryPage({
  wineType,
  onAddToCart,
  onBack,
  products = [],
}) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryProducts = useMemo(
    () => wineCategories[wineType] || [],
    [wineType]
  );

  const wineProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGES[priceRange];
    const minRating = RATING_THRESHOLDS[rating];

    const filtered = products.filter((product) => {
      if (product.categoryGroup !== "wine") return false;
      if (!categoryProducts.includes(product.name)) return false;

      const price = parsePrice(product.price);

      if (price < minPrice || price > maxPrice) return false;
      if (product.rating < minRating) return false;

      return true;
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
  }, [products, categoryProducts, priceRange, rating, sort]);

  const clearFilters = () => {
    setPriceRange("all");
    setRating("all");
  };

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description={`Explore our collection of ${wineType.toLowerCase()} wines.`}
        onBack={onBack}
        tag="Wine"
        title={wineType}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <aside
            className={`lg:w-72 shrink-0 ${filtersOpen ? "block" : "hidden"} lg:block mb-6 lg:mb-0`}
          >
            <div className="lg:sticky lg:top-32">
              <WineFilters
                onClearAll={clearFilters}
                onPriceRangeChange={setPriceRange}
                onRatingChange={setRating}
                priceRange={priceRange}
                rating={rating}
                resultCount={wineProducts.length}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                Showing {wineProducts.length} of {categoryProducts.length}{" "}
                products
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
              emptyMessage={`New ${wineType.toLowerCase()} wines are on the way. Check back soon.`}
              onAddToCart={handleAddToCart}
              products={wineProducts}
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
