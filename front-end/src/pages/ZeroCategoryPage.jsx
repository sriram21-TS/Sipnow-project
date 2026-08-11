import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
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

const ZERO_CATEGORY_FILTERS = [
  { key: "wine", label: "Zero % Wine" },
  { key: "beer", label: "Zero % Beer" },
  { key: "spirits", label: "Zero % Spirits" },
  { key: "premix", label: "Zero % Premix" },
  { key: "cider", label: "Zero % Cider" },
];

const SUBCATEGORIES = {
  all: {
    key: "all",
    title: "Zero % Alcohol",
    keyword: "all",
    subtitle:
      "Explore our complete collection of non-alcoholic wines, beers, spirits, premixes, and ciders.",
    emptyMessage:
      "No zero % alcohol products found matching your filter criteria.",
    bannerTag: "Zero Alcohol Collection",
    description:
      "Enjoy your favourite drinks with zero alcohol. Explore our complete selection of non-alcoholic wines, beers, spirits, premixes, and ciders.",
  },
  wine: {
    key: "wine",
    title: "Zero % Alcohol Wine",
    keyword: "wine",
    subtitle: "Explore our collection of zero alcohol wines.",
    emptyMessage: "No zero % alcohol wine products found.",
    bannerTag: "Zero Alcohol Cellar",
    description:
      "Explore our premium range of non-alcoholic wines, crafted for rich taste without the alcohol.",
  },
  beer: {
    key: "beer",
    title: "Zero % Alcohol Beer",
    keyword: "beer",
    subtitle: "Explore our collection of zero alcohol beers.",
    emptyMessage: "No zero % alcohol beer products found.",
    bannerTag: "Zero Alcohol Brews",
    description:
      "Refresh yourself with crisp, non-alcoholic craft and classic beers.",
  },
  spirits: {
    key: "spirits",
    title: "Zero % Alcohol Spirits",
    keyword: "spirits",
    subtitle: "Explore our collection of zero alcohol spirits.",
    emptyMessage: "No zero % alcohol spirits products found.",
    bannerTag: "Zero Alcohol Spirits",
    description:
      "Sophisticated non-alcoholic botanical spirits and alternatives for mixology.",
  },
  premix: {
    key: "premix",
    title: "Zero % Alcohol Premix",
    keyword: "premix",
    subtitle: "Explore our collection of zero alcohol premix drinks.",
    emptyMessage: "No zero % alcohol premix products found.",
    bannerTag: "Zero Alcohol Premix & RTD",
    description:
      "Convenient, ready-to-drink zero alcohol cocktails and mixed drinks.",
  },
  cider: {
    key: "cider",
    title: "Zero % Alcohol Cider",
    keyword: "cider",
    subtitle: "Explore our collection of zero alcohol ciders.",
    emptyMessage: "No zero % alcohol cider products found.",
    bannerTag: "Zero Alcohol Ciders",
    description:
      "Fruity and crisp zero alcohol ciders packed with natural flavours.",
  },
};

const FALLBACK_ZERO_PRODUCTS = [
  {
    name: "McGuigan Zero Shiraz 750mL",
    category: "Zero % Wine · 750mL",
    categoryGroup: "wine",
    type: "wine",
    price: "$11.99",
    originalPrice: "$14.99",
    rating: 4.6,
    reviewCount: 94,
    badgeText: "20% Off",
    image: "https://media.sipnow.com.au/sipnow/products/jacob-greek.png",
  },
  {
    name: "Heineken 0.0 Zero Alcohol Beer 6x330mL",
    category: "Zero % Beer · 6x330mL",
    categoryGroup: "beer",
    type: "beer",
    price: "$13.49",
    rating: 4.8,
    reviewCount: 156,
    badgeText: "Popular Brew",
    image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
  },
  {
    name: "Lyre's Dry London Spirit 700mL",
    category: "Zero % Spirits · 700mL",
    categoryGroup: "spirits",
    type: "spirits",
    price: "$34.99",
    rating: 4.7,
    reviewCount: 82,
    badgeText: "Award Winner",
    image:
      "https://vinosamerica.com/cdn/shop/products/Absolut-Vodka-750ml-Front-Standard-Transparent-Background-LR_1024x1024.png?v=1685321172",
  },
  {
    name: "Naked Life Non-Alcoholic G&T 4x250mL",
    category: "Zero % Premix · 4x250mL",
    categoryGroup: "premix",
    type: "premix",
    price: "$14.99",
    rating: 4.5,
    reviewCount: 43,
    badgeText: "Sugar Free",
    image: "https://media.sipnow.com.au/sipnow/products/001.webp",
  },
  {
    name: "Somersby 0.0% Apple Cider 4x330mL",
    category: "Zero % Cider · 4x330mL",
    categoryGroup: "cider",
    type: "cider",
    price: "$12.99",
    rating: 4.4,
    reviewCount: 67,
    badgeText: "Crisp & Fruity",
    image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
  },
  {
    name: "Edenvale Premium Reserve Sparkling Shiraz 750mL",
    category: "Zero % Wine · 750mL",
    categoryGroup: "wine",
    type: "wine",
    price: "$16.50",
    rating: 4.9,
    reviewCount: 110,
    badgeText: "Cellar Choice",
    image: "https://media.sipnow.com.au/sipnow/products/901870-1.png",
  },
];

export default function ZeroCategoryPage({
  subcategory: subcategoryProp,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const params = useParams();
  const location = useLocation();

  let rawSub =
    subcategoryProp || params.subcategory || params.categoryKey || "";
  if (!rawSub && location.pathname) {
    const parts = location.pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1] || "all";
    rawSub =
      lastPart === "zero-alcohol" || lastPart === "zero" ? "all" : lastPart;
  }

  const cleanSub = (rawSub || "all")
    .toLowerCase()
    .replace(/^zero-alcohol-?/, "")
    .replace(/^zero-percent-?/, "")
    .replace(/^zero-?/, "")
    .trim();

  const subKey =
    cleanSub === "" || cleanSub === "alcohol" || cleanSub === "all"
      ? "all"
      : cleanSub;

  const config = SUBCATEGORIES[subKey] || SUBCATEGORIES.all;

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const toggleCategory = (catKey) => {
    setSelectedCategories((current) =>
      current.includes(catKey)
        ? current.filter((k) => k !== catKey)
        : [...current, catKey]
    );
  };

  /* ZERO % ALCOHOL PRODUCTS MATCHING */
  const baseProducts = useMemo(() => {
    const matched = products.filter((product) => {
      const text =
        `${product.name || ""} ${product.category || ""} ${product.categoryGroup || ""}`.toLowerCase();

      return (
        text.includes("zero") ||
        text.includes("0%") ||
        text.includes("non-alcoholic") ||
        text.includes("zeroproof")
      );
    });

    if (matched.length === 0) {
      return FALLBACK_ZERO_PRODUCTS;
    }

    return matched;
  }, [products]);

  /* FILTER & SORT */
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_BOUNDS[priceRange];
    const minRating = rating === "all" ? 0 : Number(rating);

    const filtered = baseProducts.filter((product) => {
      const text =
        `${product.name || ""} ${product.category || ""} ${product.categoryGroup || ""} ${product.type || ""}`.toLowerCase();

      // Check subcategory from route (if not 'all')
      if (config.keyword !== "all") {
        if (config.keyword === "spirits") {
          if (
            !text.includes("spirit") &&
            !text.includes("spirits") &&
            product.categoryGroup !== "spirits" &&
            product.type !== "spirits"
          )
            return false;
        } else if (
          !text.includes(config.keyword) &&
          product.categoryGroup !== config.keyword &&
          product.type !== config.keyword
        ) {
          return false;
        }
      }

      // Check sidebar selected categories filter
      if (selectedCategories.length > 0) {
        const matchesAnyCat = selectedCategories.some((cat) => {
          if (cat === "spirits") {
            return (
              text.includes("spirit") ||
              product.categoryGroup === "spirits" ||
              product.type === "spirits"
            );
          }
          return (
            text.includes(cat) ||
            product.categoryGroup === cat ||
            product.type === cat
          );
        });
        if (!matchesAnyCat) return false;
      }

      // Check price
      const price = parsePrice(product.price);
      if (price < minPrice || price > maxPrice) return false;

      // Check rating
      if ((product.rating || 0) < minRating) return false;

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "top-rated") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return sorted;
  }, [
    baseProducts,
    config.keyword,
    selectedCategories,
    priceRange,
    rating,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange("all");
    setRating("all");
    setSortBy("featured");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setSortOpen(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange !== "all" || rating !== "all";

  return (
    <div className="pt-32 pb-24">
      {/* PAGE HERO */}
      <PageHero
        description={config.description}
        onBack={onBack}
        tag={config.bannerTag}
        title={config.title}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* MOBILE FILTER TOGGLE BUTTON */}
        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20 cursor-pointer"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* LAYOUT CONTAINER: SIDEBAR + PRODUCT GRID */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* SIDEBAR FILTERS */}
          <aside
            className={`lg:w-72 shrink-0 ${
              filtersOpen ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="lg:sticky lg:top-32 glass-panel rounded-2xl border border-primary/20 p-6 space-y-6">
              {/* FILTER HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-xl text-on-surface">
                  Filters
                </h2>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* ZERO % CATEGORY FILTER */}
              <div className="space-y-4">
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
                  Category
                </p>

                <div className="space-y-2.5">
                  {ZERO_CATEGORY_FILTERS.map((cat) => (
                    <label
                      key={cat.key}
                      className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.key)}
                        onChange={() => toggleCategory(cat.key)}
                        className="w-4 h-4 rounded-sm border border-primary/40 bg-transparent accent-primary cursor-pointer"
                      />

                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-primary/10 my-2" />

              {/* PRICE */}
              <div className="space-y-4">
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
                  Price
                </p>

                <div className="space-y-2.5">
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
              <div className="h-px bg-primary/10 my-2" />

              {/* RATING */}
              <div className="space-y-4">
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
                  Rating
                </p>

                <div className="space-y-2.5">
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

          {/* MAIN PRODUCT AREA */}
          <div className="flex-1 min-w-0">
            {/* PRODUCT COUNT + SORT */}
            <div className="flex items-center justify-between mb-6">
              {/* PRODUCT COUNT */}
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} of ${baseProducts.length} ${config.title} products`}
              </p>

              {/* SORT DROPDOWN */}
              <div ref={sortRef} className="relative flex items-center gap-3">
                <span className="text-sm text-on-surface-variant whitespace-nowrap">
                  Sort by
                </span>

                <button
                  type="button"
                  onClick={() => setSortOpen((open) => !open)}
                  className="w-[216px] h-[50px] flex items-center justify-between gap-4 bg-[#1b181d] border border-primary/60 rounded-md px-4 text-sm text-on-surface hover:border-primary transition-colors cursor-pointer"
                >
                  <span className="truncate">{selectedSort.label}</span>

                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 transition-transform ${
                      sortOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 sm:w-[216px] z-50 bg-[#1b181d] border border-primary/40 rounded-md overflow-hidden shadow-2xl">
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

            {/* PRODUCT GRID OR BLANK CARDS WHEN EMPTY */}
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
