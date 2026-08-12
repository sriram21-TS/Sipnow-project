import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHero from "../../components/PageHero.jsx";
import ProductFilters from "../../components/ProductFilters.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";
import Reveal from "../../components/Reveal.jsx";
import { useAddToCartFeedback } from "../../hooks/useAddToCartFeedback.js";
import { useNavMenus } from "../../hooks/useContent.js";
import { getSubtype, parsePrice } from "../../utils/productHelpers.js";

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

const RATING_THRESHOLDS = { all: 0, 4: 4, 3: 3 };

// Slug -> proper display label, so URLs like /beer-cider/ipa or
// /beer-cider/stout-and-porter map back to the exact names shown in the
// navbar mega menu instead of a naive slug-to-words guess.
const SUBCATEGORY_LABELS = {
  pilsner: "Pilsner",
  "dark-lager": "Dark Lager",
  helles: "Helles",
  "pale-ale": "Pale Ale",
  ipa: "IPA",
  "stout-and-porter": "Stout & Porter",
  apple: "Apple",
  pear: "Pear",
  "fruit-cider": "Fruit Cider",
};

function humanizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Shared layout for the Beer & Cider section. The section-root page and
// every dedicated subcategory page (pilsner.jsx, ipa.jsx, ...) render this
// with a fixed `categoryKey`; a bare /beer-cider/:categoryKey URL still
// works by falling back to the route param.
export default function BeerCiderLayout({
  categoryKey: categoryKeyProp,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const { categoryKey: categoryKeyParam } = useParams();
  const categoryKey = categoryKeyProp || categoryKeyParam;

  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate("/"));

  const { data: navMenus = [] } = useNavMenus();
  const subcategoryGroups =
    navMenus.find((menu) => menu.label === "Beer & Cider")?.columns || [];

  const pageTitle = categoryKey
    ? SUBCATEGORY_LABELS[categoryKey] || humanizeSlug(categoryKey)
    : "Beer & Cider";

  const pageDescription = categoryKey
    ? `Explore our curated selection of ${pageTitle.toLowerCase()}, handpicked for every occasion.`
    : "From crisp lagers to hoppy ales and refreshing ciders, explore our full range of beer and cider.";

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

  const beerCiderProducts = useMemo(() => {
    const items = products.filter((product) => {
      const group = String(product.categoryGroup || "")
        .trim()
        .toLowerCase();
      return group === "beer" || group === "cider";
    });

    if (!categoryKey) {
      return items;
    }

    const searchValue = (
      SUBCATEGORY_LABELS[categoryKey] || humanizeSlug(categoryKey)
    ).toLowerCase();

    return items.filter((product) => {
      const name = String(product.name || "")
        .trim()
        .toLowerCase();
      const type = String(product.type || "")
        .trim()
        .toLowerCase();
      const category = String(product.category || "")
        .trim()
        .toLowerCase();

      return (
        name.includes(searchValue) ||
        type.includes(searchValue) ||
        category.includes(searchValue)
      );
    });
  }, [products, categoryKey]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];
    const minRating = RATING_THRESHOLDS[rating];

    const filtered = beerCiderProducts.filter((product) => {
      if (
        selectedSubtypes.length > 0 &&
        !selectedSubtypes.includes(getSubtype(product))
      ) {
        return false;
      }

      const price = parsePrice(product.price);
      if (price < minPrice || price > maxPrice) return false;

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
  }, [beerCiderProducts, selectedSubtypes, priceRange, rating, sort]);

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description={pageDescription}
        onBack={handleBack}
        tag="Beer & Cider"
        title={pageTitle}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* SUBCATEGORY QUICK LINKS */}
        {subcategoryGroups.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 pb-8 border-b border-primary/10">
            {subcategoryGroups.map((group) => (
              <div className="space-y-2" key={group.heading}>
                <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-primary">
                  {group.heading}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items?.map((item) => {
                    const itemSlug = item
                      .toLowerCase()
                      .trim()
                      .replace(/&/g, "and")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    const isActive = categoryKey === itemSlug;
                    return (
                      <button
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                          isActive
                            ? "bg-primary text-on-primary border-primary"
                            : "border-primary/20 text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
                        }`}
                        key={item}
                        onClick={() => navigate(`/beer-cider/${itemSlug}`)}
                        type="button"
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

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
                products={beerCiderProducts}
                rating={rating}
                resultCount={filteredProducts.length}
                selectedSubtypes={selectedSubtypes}
                hideAlcoholType
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} of ${beerCiderProducts.length} products`}
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
              emptyMessage={
                categoryKey
                  ? `New ${pageTitle.toLowerCase()} arrivals are on the way. Check back soon.`
                  : "New beer & cider arrivals are on the way. Check back soon."
              }
              onAddToCart={handleAddToCart}
              products={filteredProducts}
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
