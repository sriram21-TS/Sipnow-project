import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
    subtitle: "Explore our collection of zero alcohol wines.",
    emptyMessage: "No zero % alcohol wine products found.",
    bannerTag: "Zero Alcohol Cellar",
    description:
      "Explore our premium range of non-alcoholic wines, crafted for rich taste without the alcohol.",
  },
  beer: {
    title: "Zero % Alcohol Beer",
    keyword: "beer",
    subtitle: "Explore our collection of zero alcohol beers.",
    emptyMessage: "No zero % alcohol beer products found.",
    bannerTag: "Zero Alcohol Brews",
    description:
      "Refresh yourself with crisp, non-alcoholic craft and classic beers.",
  },
  spirits: {
    title: "Zero % Alcohol Spirits",
    keyword: "spirits",
    subtitle: "Explore our collection of zero alcohol spirits.",
    emptyMessage: "No zero % alcohol spirits products found.",
    bannerTag: "Zero Alcohol Spirits",
    description:
      "Sophisticated non-alcoholic botanical spirits and alternatives for mixology.",
  },
  premix: {
    title: "Zero % Alcohol Premix",
    keyword: "premix",
    subtitle: "Explore our collection of zero alcohol premix drinks.",
    emptyMessage: "No zero % alcohol premix products found.",
    bannerTag: "Zero Alcohol Premix & RTD",
    description:
      "Convenient, ready-to-drink zero alcohol cocktails and mixed drinks.",
  },
  cider: {
    title: "Zero % Alcohol Cider",
    keyword: "cider",
    subtitle: "Explore our collection of zero alcohol ciders.",
    emptyMessage: "No zero % alcohol cider products found.",
    bannerTag: "Zero Alcohol Ciders",
    description:
      "Fruity and crisp zero alcohol ciders packed with natural flavours.",
  },
};

export default function ZeroCategoryPage({
  subcategory: subcategoryProp,
  onAddToCart,
  onBack,
  products = [],
}) {
  const params = useParams();
  const location = useLocation();

  let rawSub =
    subcategoryProp || params.subcategory || params.categoryKey || "";
  if (!rawSub && location.pathname) {
    const parts = location.pathname.split("/").filter(Boolean);
    rawSub = parts[parts.length - 1] || "wine";
  }

  const subKey =
    (rawSub || "wine")
      .toLowerCase()
      .replace(/^zero-alcohol-?/, "")
      .replace(/^zero-?/, "")
      .trim() || "wine";

  const config = SUBCATEGORIES[subKey] || {
    title: `Zero % Alcohol ${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`,
    keyword: subKey,
    subtitle: `Explore our collection of zero alcohol ${subKey}.`,
    emptyMessage: `No zero % alcohol ${subKey} products found.`,
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

  /* STRICT ZERO % FILTERING - NO FALLBACK TO REGULAR ALCOHOLIC PRODUCTS */
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_BOUNDS[priceRange];

    const filtered = products.filter((product) => {
      const text =
        `${product.name || ""} ${product.category || ""} ${product.categoryGroup || ""}`.toLowerCase();

      const isZero =
        text.includes("zero") ||
        text.includes("0%") ||
        text.includes("non-alcoholic") ||
        text.includes("zeroproof");
      if (!isZero) return false;

      if (config.keyword === "spirits") {
        if (
          !text.includes("spirit") &&
          !text.includes("spirits") &&
          product.categoryGroup !== "spirits"
        )
          return false;
      } else if (
        !text.includes(config.keyword) &&
        product.categoryGroup !== config.keyword
      ) {
        return false;
      }

      const price = parsePrice(product.price);
      if (price < minPrice || price > maxPrice) return false;

      const minimumRating = rating === "all" ? 0 : Number(rating);
      return (product.rating || 0) >= minimumRating;
    });

    const sorted = [...filtered];

    if (sortBy === "price-low") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === "price-high") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    if (sortBy === "top-rated") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return sorted;
  }, [products, config.keyword, priceRange, rating, sortBy]);

  const clearFilters = () => {
    setPriceRange("all");
    setRating("all");
    setSortBy("featured");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setSortOpen(false);
  };

  return (
    <div className="min-h-screen px-margin-mobile md:px-margin-desktop pt-28 pb-16">
      <Reveal>
        {/* BACK TO HOME */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10 cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to home
        </button>

        {/* PAGE TITLE */}
        <div className="mb-14">
          <div className="inline-flex px-5 py-2 rounded-full border border-primary/40 text-primary text-xs uppercase tracking-[0.2em] mb-8">
            Full Collection
          </div>

          <h1 className="font-serif text-5xl md:text-6xl text-on-surface">
            {config.title}
          </h1>

          <p className="mt-5 text-lg text-on-surface-variant">
            {config.subtitle}
          </p>
        </div>

        {/* CONTENT AREA */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* LEFT FILTERS */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-32 glass-panel rounded-2xl border border-primary/20 p-6">
              {/* FILTER HEADER */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline-sm text-xl">Filters</h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* PRICE */}
              <div className="space-y-4">
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
                  Price
                </p>

                <div className="space-y-3">
                  {PRICE_RANGES.map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={priceRange === option.key}
                        onChange={() =>
                          setPriceRange(
                            priceRange === option.key ? "all" : option.key
                          )
                        }
                        className="w-4 h-4 rounded-sm border border-primary/40 bg-transparent accent-primary cursor-pointer"
                      />

                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-primary/10 my-7" />

              {/* RATING */}
              <div className="space-y-4">
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
                  Rating
                </p>

                <div className="space-y-3">
                  {RATING_OPTIONS.map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={rating === option.key}
                        onChange={() =>
                          setRating(rating === option.key ? "all" : option.key)
                        }
                        className="w-4 h-4 rounded-sm border border-primary/40 bg-transparent accent-primary cursor-pointer"
                      />

                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT AREA */}
          <div className="flex-1 min-w-0">
            {/* PRODUCT COUNT + SORT */}
            <div className="flex items-center justify-between mb-6">
              {/* PRODUCT COUNT */}
              <p className="text-sm text-on-surface-variant">
                Showing {filteredProducts.length} products
              </p>

              {/* SORT */}
              <div ref={sortRef} className="relative flex items-center gap-3">
                <span className="text-sm text-on-surface-variant whitespace-nowrap">
                  Sort by
                </span>

                <button
                  type="button"
                  onClick={() => setSortOpen((open) => !open)}
                  className="w-[216px] h-[50px] flex items-center justify-between gap-4 bg-[#1b181d] border border-primary/60 rounded-md px-4 text-sm text-on-surface hover:border-primary transition-colors cursor-pointer"
                >
                  <span>{selectedSort.label}</span>

                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-[216px] z-50 bg-[#1b181d] border border-primary/40 rounded-md overflow-hidden shadow-2xl">
                    {SORT_OPTIONS.map((option) => {
                      const isSelected = sortBy === option.key;

                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleSortChange(option.key)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-[#1b181d] text-white hover:bg-primary/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCT GRID OR BLANK GRID PLACEHOLDERS */}
            {filteredProducts.length === 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-64 rounded-2xl border border-primary/10 bg-surface-container-high/20 flex flex-col items-center justify-center p-6 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-primary/20 text-xl">
                          no_drinks
                        </span>
                      </div>
                      <div className="w-20 h-2.5 rounded bg-primary/10 mb-2" />
                      <div className="w-12 h-2 rounded bg-primary/5" />
                    </div>
                  ))}
                </div>
                <p className="text-on-surface-variant text-center py-4 text-sm font-medium">
                  {config.emptyMessage}
                </p>
              </div>
            ) : (
              <ProductGrid
                addedProduct={addedProduct}
                onAddToCart={handleAddToCart}
                products={filteredProducts}
                emptyMessage={config.emptyMessage}
              />
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
