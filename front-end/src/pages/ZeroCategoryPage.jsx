import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { parsePrice } from "../utils/productHelpers.js";

const PRICE_RANGES = [
  { key: "all", label: "All Prices" },
  { key: "under10", label: "Under $10" },
  { key: "10to20", label: "$10 – $20" },
  { key: "20to30", label: "$20 – $30" },
  { key: "over30", label: "$30 & Above" },
];

const RATING_OPTIONS = [
  { key: "all", label: "All Ratings" },
  { key: "4", label: "4 Stars & Up" },
  { key: "3", label: "3 Stars & Up" },
];

const PRICE_BOUNDS = {
  all: [0, Infinity],
  under10: [0, 10],
  "10to20": [10, 20],
  "20to30": [20, 30],
  over30: [30, Infinity],
};

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
  { key: "top-rated", label: "Top Rated" },
];

const SUBCATEGORIES = {
  wine: {
    title: "Zero % Alcohol Wine",
    keyword: "wine",
    emptyMessage: "No zero % alcohol wine products found.",
    bannerTag: "Zero Alcohol Cellar",
    description: "Explore our premium range of non-alcoholic wines, crafted for rich taste without the alcohol.",
  },
  beer: {
    title: "Zero % Alcohol Beer",
    keyword: "beer",
    emptyMessage: "No zero % alcohol beer products found.",
    bannerTag: "Zero Alcohol Brews",
    description: "Refresh yourself with crisp, non-alcoholic craft and classic beers.",
  },
  spirits: {
    title: "Zero % Alcohol Spirits",
    keyword: "spirits",
    emptyMessage: "No zero % alcohol spirits products found.",
    bannerTag: "Zero Alcohol Spirits",
    description: "Sophisticated non-alcoholic botanical spirits and alternatives for mixology.",
  },
  premix: {
    title: "Zero % Alcohol Premix",
    keyword: "premix",
    emptyMessage: "No zero % alcohol premix products found.",
    bannerTag: "Zero Alcohol Premix & RTD",
    description: "Convenient, ready-to-drink zero alcohol cocktails and mixed drinks.",
  },
  cider: {
    title: "Zero % Alcohol Cider",
    keyword: "cider",
    emptyMessage: "No zero % alcohol cider products found.",
    bannerTag: "Zero Alcohol Ciders",
    description: "Fruity and crisp zero alcohol ciders packed with natural flavours.",
  },
};

export default function ZeroCategoryPage({
  subcategory: subcategoryProp,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const params = useParams();
  const rawSubcategory = subcategoryProp || params.subcategory || params.categoryKey || "wine";
  
  const subKey = rawSubcategory
    .toLowerCase()
    .replace("zero-alcohol-", "")
    .replace("zero-", "")
    .trim();

  const config = SUBCATEGORIES[subKey] || {
    title: `Zero % Alcohol ${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`,
    keyword: subKey,
    emptyMessage: `No zero % alcohol ${subKey} products found.`,
    bannerTag: "Zero % Collection",
    description: `Discover our selection of zero % alcohol ${subKey}.`,
  };

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  /* CLOSE SORT DROPDOWN WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSort =
    SORT_OPTIONS.find((option) => option.key === sortBy) || SORT_OPTIONS[0];

  /* FILTER + SORT PRODUCTS */
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_BOUNDS[priceRange];

    const filtered = products.filter((product) => {
      const text = `${product.name || ""} ${product.category || ""} ${product.categoryGroup || ""}`.toLowerCase();

      if (!text.includes("zero")) {
        return false;
      }

      if (config.keyword === "spirits") {
        if (!text.includes("spirit") && !text.includes("spirits")) {
          return false;
        }
      } else if (!text.includes(config.keyword)) {
        return false;
      }

      const price = parsePrice(product.price);
      if (price < minPrice || price > maxPrice) {
        return false;
      }

      const minimumRating = rating === "all" ? 0 : Number(rating);
      return (product.rating || 0) >= minimumRating;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") {
        return parsePrice(a.price) - parsePrice(b.price);
      }
      if (sortBy === "price-high") {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      if (sortBy === "top-rated") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [products, config.keyword, priceRange, rating, sortBy]);

  const activeFilterCount =
    (priceRange !== "all" ? 1 : 0) + (rating !== "all" ? 1 : 0);

  const clearFilters = () => {
    setPriceRange("all");
    setRating("all");
    setSortBy("featured");
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* TOP BAR / BACK NAVIGATION */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              onClick={onBack}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-primary/40 text-sm font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back to Home
            </button>

            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">
              {config.bannerTag}
            </span>
          </div>
        </Reveal>

        {/* HERO HEADER */}
        <Reveal delay={100}>
          <div className="glass-panel border border-outline-variant/30 rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                0% ABV Collection
              </span>

              <h1 className="text-3xl md:text-5xl font-bold font-headline text-on-surface mb-4">
                {config.title}
              </h1>

              <p className="text-on-surface-variant text-base md:text-lg">
                {config.description}
              </p>
            </div>
          </div>
        </Reveal>

        {/* CONTROLS BAR: FILTERS + SORTING */}
        <Reveal delay={200}>
          <div className="glass-panel border border-outline-variant/30 rounded-2xl p-4 md:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* PRICE & RATING FILTERS */}
            <div className="flex flex-wrap items-center gap-3">
              {/* PRICE DROPDOWN */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  {PRICE_RANGES.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>

              {/* RATING DROPDOWN */}
              <div className="relative">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="appearance-none bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  {RATING_OPTIONS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>

              {/* CLEAR FILTERS */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  type="button"
                  className="text-xs text-primary font-semibold hover:underline px-2 py-1"
                >
                  Clear Filters ({activeFilterCount})
                </button>
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm font-medium text-on-surface hover:border-primary/40 transition-colors w-full md:w-auto justify-between md:justify-start"
              >
                <span className="text-on-surface-variant">Sort by:</span>
                <span className="font-semibold">{selectedSort.label}</span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  expand_more
                </span>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-xl py-2 z-30">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        setSortBy(option.key);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortBy === option.key
                          ? "text-primary font-bold bg-primary/10"
                          : "text-on-surface hover:bg-primary/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* PRODUCT GRID SECTION */}
        <Reveal delay={300}>
          <ProductGrid
            addedProduct={addedProduct}
            emptyMessage={config.emptyMessage}
            loading={productsLoading}
            onAddToCart={handleAddToCart}
            products={filteredProducts}
          />
        </Reveal>
      </div>
    </div>
  );
}
