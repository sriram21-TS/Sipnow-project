import { useEffect, useMemo, useRef, useState } from "react";
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
  {
    key: "featured",
    label: "Featured",
  },
  {
    key: "price-low",
    label: "Price: Low to High",
  },
  {
    key: "price-high",
    label: "Price: High to Low",
  },
  {
    key: "top-rated",
    label: "Top Rated",
  },
];

export default function ZeroPremix({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const { addedProduct, handleAddToCart } =
    useAddToCartFeedback(onAddToCart);

  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");

  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  /* CLOSE SORT DROPDOWN WHEN CLICKING OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const selectedSort =
    SORT_OPTIONS.find(
      (option) => option.key === sortBy
    ) || SORT_OPTIONS[0];

  /* FILTER + SORT PRODUCTS */
  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] =
      PRICE_BOUNDS[priceRange];

    const filtered = products.filter((product) => {
      const text = `${product.name || ""} ${
        product.category || ""
      } ${product.categoryGroup || ""}`.toLowerCase();

      /*
       * ZERO % PREMIX
       */
      if (
        !text.includes("zero") ||
        !text.includes("premix")
      ) {
        return false;
      }

      /* PRICE FILTER */
      const price = parsePrice(product.price);

      if (
        price < minPrice ||
        price > maxPrice
      ) {
        return false;
      }

      /* RATING FILTER */
      const minimumRating =
        rating === "all"
          ? 0
          : Number(rating);

      return (
        (product.rating || 0) >=
        minimumRating
      );
    });

    /* SORT PRODUCTS */
    const sorted = [...filtered];

    if (sortBy === "price-low") {
      sorted.sort(
        (a, b) =>
          parsePrice(a.price) -
          parsePrice(b.price)
      );
    }

    if (sortBy === "price-high") {
      sorted.sort(
        (a, b) =>
          parsePrice(b.price) -
          parsePrice(a.price)
      );
    }

    if (sortBy === "top-rated") {
      sorted.sort(
        (a, b) =>
          (b.rating || 0) -
          (a.rating || 0)
      );
    }

    return sorted;
  }, [
    products,
    priceRange,
    rating,
    sortBy,
  ]);

  /* CLEAR FILTERS */
  const clearFilters = () => {
    setPriceRange("all");
    setRating("all");
    setSortBy("featured");
  };

  /* SORT CHANGE */
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
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10"
        >
          <span className="material-symbols-outlined">
            arrow_back
          </span>

          Back to home
        </button>

        {/* PAGE TITLE */}
        <div className="mb-14">

          <div className="inline-flex px-5 py-2 rounded-full border border-primary/40 text-primary text-xs uppercase tracking-[0.2em] mb-8">
            Full Collection
          </div>

          <h1 className="font-headline-lg text-5xl md:text-6xl text-on-surface">
            Zero % Alcohol Premix
          </h1>

          <p className="mt-5 text-lg text-on-surface-variant">
            Explore our collection of zero alcohol premix.
          </p>

        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* LEFT FILTERS */}
          <aside className="lg:w-72 shrink-0">

            <div className="lg:sticky lg:top-32 glass-panel rounded-2xl border border-primary/20 p-6">

              {/* FILTER HEADER */}
              <div className="flex items-center justify-between mb-8">

                <h2 className="font-headline-sm text-xl">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
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

                  {PRICE_RANGES.map(
                    (option) => (
                      <label
                        key={option.key}
                        className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                      >

                        <input
                          type="checkbox"
                          checked={
                            priceRange ===
                            option.key
                          }
                          onChange={() =>
                            setPriceRange(
                              option.key
                            )
                          }
                          className="w-4 h-4 rounded-sm border border-primary/40 bg-transparent accent-primary cursor-pointer"
                        />

                        <span>
                          {option.label}
                        </span>

                      </label>
                    )
                  )}

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

                  {RATING_OPTIONS.map(
                    (option) => (
                      <label
                        key={option.key}
                        className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                      >

                        <input
                          type="checkbox"
                          checked={
                            rating ===
                            option.key
                          }
                          onChange={() =>
                            setRating(
                              option.key
                            )
                          }
                          className="w-4 h-4 rounded-sm border border-primary/40 bg-transparent accent-primary cursor-pointer"
                        />

                        <span>
                          {option.label}
                        </span>

                      </label>
                    )
                  )}

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
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} products`}
              </p>

              {/* SORT */}
              <div
                ref={sortRef}
                className="relative flex items-center gap-3"
              >

                {/* SORT BY */}
                <span className="text-sm text-on-surface-variant whitespace-nowrap">
                  Sort by
                </span>

                {/* FEATURED BOX */}
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen(
                      (open) => !open
                    )
                  }
                  className="w-[216px] h-[50px] flex items-center justify-between gap-4 bg-[#1b181d] border border-primary/60 rounded-md px-4 text-sm text-on-surface hover:border-primary transition-colors"
                >

                  <span>
                    {selectedSort.label}
                  </span>

                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform ${
                      sortOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    expand_more
                  </span>

                </button>

                {/* DROPDOWN */}
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-[216px] z-50 bg-[#1b181d] border border-primary/40 rounded-md overflow-hidden shadow-2xl">

                    {SORT_OPTIONS.map(
                      (option) => {

                        const isSelected =
                          sortBy ===
                          option.key;

                        return (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() =>
                              handleSortChange(
                                option.key
                              )
                            }
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-[#1b181d] text-white hover:bg-primary/20"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      }
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* PRODUCT GRID */}
            <ProductGrid
              addedProduct={addedProduct}
              onAddToCart={handleAddToCart}
              products={filteredProducts}
              emptyMessage="No zero % alcohol premix products found."
            />

          </div>

        </div>

      </Reveal>
    </div>
  );
}