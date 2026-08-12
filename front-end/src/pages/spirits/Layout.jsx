import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageHero from "../../components/PageHero.jsx";
import ProductFilters from "../../components/ProductFilters.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";
import Reveal from "../../components/Reveal.jsx";
import { useAddToCartFeedback } from "../../hooks/useAddToCartFeedback.js";
import { parsePrice } from "../../utils/productHelpers.js";

const PRICE_RANGE_BOUNDS = {
  all: [0, Infinity],
  under10: [0, 10],
  "10to20": [10, 20],
  "20to30": [20, 30],
  over30: [30, Infinity],
};

const RATING_THRESHOLDS = { all: 0, 4: 4, 3: 3 };

// slug -> { label, productType } — productType is matched case-insensitively
// against product.type in the catalog.
const SPIRIT_TYPES = {
  gin: { label: "Gin", productType: "gin" },
  rum: { label: "Rum", productType: "rum" },
  vodka: { label: "Vodka", productType: "vodka" },
  bourbon: { label: "Bourbon", productType: "bourbon" },
  tequilla: { label: "Tequila", productType: "tequilla" },
  liquerus: { label: "Liqueurs", productType: "liquerus" },
  "brandy-and-cognac": {
    label: "Brandy & Cognac",
    productType: "brandy & cognac",
  },
  "other-spirits": { label: "Other Spirits", productType: "other spirits" },
  "other-whisky": { label: "Other Whisky", productType: "other whisky" },
  "scotch-whisky": { label: "Scotch Whisky", productType: "scotch whisky" },
  "japanese-whisky": {
    label: "Japanese Whisky",
    productType: "japanese whisky",
  },
  "irish-whisky": { label: "Irish Whisky", productType: "irish whisky" },
  "american-whisky": {
    label: "American Whisky",
    productType: "american whisky",
  },
  "australian-whisky": {
    label: "Australian Whisky",
    productType: "australian whisky",
  },
};

// Shared layout for the Spirits section (and its Whisky sub-section). The
// section-root page and every dedicated subcategory page (gin.jsx,
// scotch-whisky.jsx, ...) render this with a fixed `categoryKey`; a bare
// /spirits/:categoryKey URL still works by falling back to the route param.
export default function SpiritsLayout({
  categoryKey: categoryKeyProp,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const { categoryKey: categoryKeyParam } = useParams();
  const categoryKey = (categoryKeyProp || categoryKeyParam || "")
    .toLowerCase()
    .trim();

  const spiritType = SPIRIT_TYPES[categoryKey];
  const pageTitle = spiritType?.label || "Spirits";

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const spiritProducts = useMemo(() => {
    const allSpirits = products.filter(
      (product) => product.categoryGroup === "spirits"
    );

    if (!spiritType) {
      return allSpirits;
    }

    return allSpirits.filter(
      (product) => product.type?.toLowerCase().trim() === spiritType.productType
    );
  }, [products, spiritType]);

  const toggleType = (type) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setPriceRange("all");
    setRating("all");
  };

  const filteredProducts = useMemo(() => {
    let result = [...spiritProducts];

    if (selectedTypes.length > 0) {
      result = result.filter((product) => selectedTypes.includes(product.type));
    }

    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];
    result = result.filter((product) => {
      const price = parsePrice(product.price);
      return price >= minPrice && price <= maxPrice;
    });

    const minRating = RATING_THRESHOLDS[rating];
    result = result.filter((product) => product.rating >= minRating);

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

  const pageDescription = spiritType
    ? `Explore our curated selection of ${pageTitle.toLowerCase()}, handpicked for every occasion.`
    : "Explore our complete selection of spirits, including gin, rum, vodka, bourbon, tequila, liqueurs, brandy, cognac and more.";

  return (
    <>
      <PageHero
        description={pageDescription}
        onBack={onBack}
        tag="Spirits"
        title={pageTitle}
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
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
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

            <ProductGrid
              addedProduct={addedProduct}
              emptyMessage={
                spiritType
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
