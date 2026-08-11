import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import ProductFilters from "./ProductFilters.jsx";
import ProductGrid from "./ProductGrid.jsx";
import Reveal from "./Reveal.jsx";
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

const KEY_ALIASES = {
  apple: "apple-cider",
  pear: "pear-cider",
  stout: "stout-porter",
  porter: "stout-porter",
  "stout-and-porter": "stout-porter",
  darklager: "dark-lager",
  paleale: "pale-ale",
  fruitcider: "fruit-cider",
};

const BEER_CIDER_SUBCATEGORIES = {
  all: {
    key: "all",
    title: "All Beer & Cider",
    group: "All",
    tag: "Beer & Cider Collection",
    description:
      "Explore our complete collection of craft lagers, rich ales, and refreshing ciders.",
    subtypes: [
      "Pilsner",
      "Dark Lager",
      "Helles",
      "Pale Ale",
      "IPA",
      "Stout & Porter",
      "Stout",
      "Porter",
      "Apple Cider",
      "Apple",
      "Pear Cider",
      "Pear",
      "Fruit Cider",
      "Lager",
      "Ale",
      "Beer",
      "Cider",
    ],
  },
  lager: {
    key: "lager",
    title: "Lager",
    group: "Lager",
    tag: "Lager Collection",
    description:
      "Crisp, refreshing, and golden lagers from classic German Helles to dark Czech Dunkels.",
    subtypes: ["Pilsner", "Dark Lager", "Helles", "Lager"],
  },
  ale: {
    key: "ale",
    title: "Ale",
    group: "Ale",
    tag: "Ale Collection",
    description:
      "Flavorful top-fermented craft ales spanning aromatic Pale Ales, bold IPAs, and rich Stouts.",
    subtypes: ["Pale Ale", "IPA", "Stout & Porter", "Stout", "Porter", "Ale"],
  },
  cider: {
    key: "cider",
    title: "Cider",
    group: "Cider",
    tag: "Cider Collection",
    description:
      "Juicy and refreshing hard ciders made from fresh apples, perry pears, and wild berries.",
    subtypes: [
      "Apple Cider",
      "Apple",
      "Pear Cider",
      "Pear",
      "Fruit Cider",
      "Cider",
    ],
  },
  pilsner: {
    key: "pilsner",
    title: "Pilsner",
    group: "Lager",
    tag: "Lager Collection",
    description:
      "Crisp, clean, and refreshingly golden lagers brewed with fine noble hops.",
    subtypes: ["Pilsner"],
  },
  "dark-lager": {
    key: "dark-lager",
    title: "Dark Lager",
    group: "Lager",
    tag: "Lager Collection",
    description:
      "Smooth roasted malt flavors with rich dark amber hues and balanced bitterness.",
    subtypes: ["Dark Lager"],
  },
  helles: {
    key: "helles",
    title: "Helles",
    group: "Lager",
    tag: "Lager Collection",
    description:
      "Bavarian-style light lagers with subtle malt sweetness and a clean finish.",
    subtypes: ["Helles"],
  },
  "pale-ale": {
    key: "pale-ale",
    title: "Pale Ale",
    group: "Ale",
    tag: "Ale Collection",
    description:
      "Aromatic hop-forward pale ales with bright citrus, pine, and floral notes.",
    subtypes: ["Pale Ale"],
  },
  ipa: {
    key: "ipa",
    title: "IPA",
    group: "Ale",
    tag: "Ale Collection",
    description:
      "Bold India Pale Ales bursting with tropical hop aromas, haziness, and character.",
    subtypes: ["IPA"],
  },
  "stout-porter": {
    key: "stout-porter",
    title: "Stout & Porter",
    group: "Ale",
    tag: "Ale Collection",
    description:
      "Deep, dark roasted malt brews featuring espresso, dark chocolate, and caramel notes.",
    subtypes: ["Stout & Porter", "Stout", "Porter"],
  },
  "apple-cider": {
    key: "apple-cider",
    title: "Apple Cider",
    group: "Cider",
    tag: "Cider Collection",
    description:
      "Crisp and juicy hard ciders crafted from freshly pressed heritage apples.",
    subtypes: ["Apple Cider", "Apple"],
  },
  "pear-cider": {
    key: "pear-cider",
    title: "Pear Cider",
    group: "Cider",
    tag: "Cider Collection",
    description:
      "Delicately sweet and aromatic Perry ciders made from premium Australian pears.",
    subtypes: ["Pear Cider", "Pear"],
  },
  "fruit-cider": {
    key: "fruit-cider",
    title: "Fruit Cider",
    group: "Cider",
    tag: "Cider Collection",
    description:
      "Vibrant ciders infused with wild berries, passionfruit, and summer garden fruits.",
    subtypes: ["Fruit Cider"],
  },
};

const TEMPORARY_FALLBACK_PRODUCTS = {
  pilsner: [
    {
      name: "Trumer Pils Pilsner 330mL",
      category: "Pilsner · 330mL",
      categoryGroup: "beer",
      price: "$4.99",
      rating: 4.7,
      reviewCount: 92,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Best Pilsner",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Pilsner Urquell 330mL Bottled",
      category: "Pilsner · 330mL",
      categoryGroup: "beer",
      price: "$5.50",
      rating: 4.8,
      reviewCount: 140,
      badgeStyle: "plain",
      badgeText: "Czech Classic",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
    {
      name: "Bitburger Premium Pils 500mL Can",
      category: "Pilsner · 500mL",
      categoryGroup: "beer",
      price: "$6.20",
      rating: 4.5,
      reviewCount: 78,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Imported",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
  ],
  "dark-lager": [
    {
      name: "Köstritzer Schwarzbier Dark Lager 500mL",
      category: "Dark Lager · 500mL",
      categoryGroup: "beer",
      price: "$6.80",
      rating: 4.6,
      reviewCount: 64,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Top Dark Lager",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
    {
      name: "Weltenburger Kloster Dunkel 500mL",
      category: "Dark Lager · 500mL",
      categoryGroup: "beer",
      price: "$7.20",
      rating: 4.7,
      reviewCount: 45,
      badgeStyle: "plain",
      badgeText: "Traditional",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
  ],
  helles: [
    {
      name: "Augustiner Helles Lager 500mL",
      category: "Helles · 500mL",
      categoryGroup: "beer",
      price: "$6.90",
      rating: 4.9,
      reviewCount: 180,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Bavarian Choice",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Paulaner Munchner Helles 500mL",
      category: "Helles · 500mL",
      categoryGroup: "beer",
      price: "$6.40",
      rating: 4.7,
      reviewCount: 112,
      badgeStyle: "plain",
      badgeText: "Classic Helles",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
  ],
  "pale-ale": [
    {
      name: "Coopers Original Pale Ale 750mL",
      category: "Pale Ale · 750mL",
      categoryGroup: "beer",
      price: "$6.09",
      rating: 4.6,
      reviewCount: 142,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Aussie Icon",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
    {
      name: "Sierra Nevada Pale Ale 355mL",
      category: "Pale Ale · 355mL",
      categoryGroup: "beer",
      price: "$5.80",
      rating: 4.8,
      reviewCount: 210,
      badgeStyle: "plain",
      badgeText: "Craft Favorite",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
  ],
  ipa: [
    {
      name: "Stone IPA India Pale Ale 355mL",
      category: "IPA · 355mL",
      categoryGroup: "beer",
      price: "$6.50",
      rating: 4.8,
      reviewCount: 195,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Top Rated IPA",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Balter Hazy IPA Can 375mL",
      category: "IPA · 375mL",
      categoryGroup: "beer",
      price: "$7.10",
      rating: 4.9,
      reviewCount: 230,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Hazy Favorite",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
  ],
  "stout-porter": [
    {
      name: "Guinness Extra Stout 375mL Can",
      category: "Stout & Porter · 375mL",
      categoryGroup: "beer",
      price: "$5.90",
      rating: 4.9,
      reviewCount: 310,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Irish Legend",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
    {
      name: "Coopers Best Extra Stout 375mL",
      category: "Stout & Porter · 375mL",
      categoryGroup: "beer",
      price: "$6.20",
      rating: 4.7,
      reviewCount: 88,
      badgeStyle: "plain",
      badgeText: "Rich & Dark",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
  ],
  "apple-cider": [
    {
      name: "Somersby Apple Cider 330mL",
      category: "Apple Cider · 330mL",
      categoryGroup: "cider",
      price: "$4.50",
      rating: 4.6,
      reviewCount: 160,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Best Apple Cider",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Strongbow Crisp Apple Cider 355mL",
      category: "Apple Cider · 355mL",
      categoryGroup: "cider",
      price: "$4.80",
      rating: 4.5,
      reviewCount: 125,
      badgeStyle: "plain",
      badgeText: "Crisp Finish",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
  ],
  "pear-cider": [
    {
      name: "Somersby Pear Cider 330mL",
      category: "Pear Cider · 330mL",
      categoryGroup: "cider",
      price: "$4.60",
      rating: 4.7,
      reviewCount: 140,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Top Pear Cider",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Rekorderlig Pear Cider 500mL",
      category: "Pear Cider · 500mL",
      categoryGroup: "cider",
      price: "$7.50",
      rating: 4.8,
      reviewCount: 190,
      badgeStyle: "plain",
      badgeText: "Swedish Craft",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
  ],
  "fruit-cider": [
    {
      name: "Rekorderlig Wild Berries Cider 500mL",
      category: "Fruit Cider · 500mL",
      categoryGroup: "cider",
      price: "$7.80",
      rating: 4.9,
      reviewCount: 220,
      badgeStyle: "glow",
      icon: "sports_bar",
      badgeText: "Wild Berry",
      image: "https://media.sipnow.com.au/sipnow/products/60281-1.png",
    },
    {
      name: "Somersby Blackberry Fruit Cider 330mL",
      category: "Fruit Cider · 330mL",
      categoryGroup: "cider",
      price: "$4.75",
      rating: 4.6,
      reviewCount: 98,
      badgeStyle: "plain",
      badgeText: "Refreshing",
      image: "https://media.sipnow.com.au/sipnow/products/cooper.png",
    },
  ],
};

// Aliases for fallback products
TEMPORARY_FALLBACK_PRODUCTS.apple = TEMPORARY_FALLBACK_PRODUCTS["apple-cider"];
TEMPORARY_FALLBACK_PRODUCTS.pear = TEMPORARY_FALLBACK_PRODUCTS["pear-cider"];
TEMPORARY_FALLBACK_PRODUCTS.stout = TEMPORARY_FALLBACK_PRODUCTS["stout-porter"];
TEMPORARY_FALLBACK_PRODUCTS.porter =
  TEMPORARY_FALLBACK_PRODUCTS["stout-porter"];
TEMPORARY_FALLBACK_PRODUCTS["stout-and-porter"] =
  TEMPORARY_FALLBACK_PRODUCTS["stout-porter"];

export default function BeerCiderCategoryPage({
  categoryKey: categoryKeyProp,
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  const { categoryKey: categoryKeyParam } = useParams();

  // Normalize key from param or prop
  const rawKey = (categoryKeyProp || categoryKeyParam || "all")
    .toLowerCase()
    .trim();

  const activeSubcategoryKey = KEY_ALIASES[rawKey] || rawKey;

  const activeConfig =
    BEER_CIDER_SUBCATEGORIES[activeSubcategoryKey] ||
    BEER_CIDER_SUBCATEGORIES[rawKey] ||
    BEER_CIDER_SUBCATEGORIES.all;

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

  // Base products for Beer & Cider
  const categoryProducts = useMemo(() => {
    const isAll = activeSubcategoryKey === "all";
    const allowedSubtypes = activeConfig.subtypes || [];

    // Filter real products from store/db
    const matched = products.filter((product) => {
      const isBeerOrCider =
        product.categoryGroup === "beer" || product.categoryGroup === "cider";

      if (!isBeerOrCider) return false;
      if (isAll) return true;

      const subtype = getSubtype(product);

      return allowedSubtypes.some(
        (st) => st.toLowerCase() === subtype.toLowerCase()
      );
    });

    // If matching products are empty, incorporate temporary sample products
    const fallbacks =
      TEMPORARY_FALLBACK_PRODUCTS[activeSubcategoryKey] ||
      TEMPORARY_FALLBACK_PRODUCTS[rawKey] ||
      [];

    if (matched.length === 0) {
      return fallbacks;
    }

    return matched;
  }, [products, activeSubcategoryKey, rawKey, activeConfig]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];
    const minRating = RATING_THRESHOLDS[rating];

    const filtered = categoryProducts.filter((product) => {
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
  }, [categoryProducts, selectedSubtypes, priceRange, rating, sort]);

  return (
    <div className="pt-32 pb-24">
      {/* PAGE HERO */}
      <PageHero
        description={activeConfig.description}
        onBack={onBack}
        tag={activeConfig.tag}
        title={activeConfig.title}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* MOBILE FILTER TOGGLE BUTTON */}
        <button
          className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
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
            <div className="lg:sticky lg:top-32">
              <ProductFilters
                onClearAll={clearAllFilters}
                onPriceRangeChange={setPriceRange}
                onRatingChange={setRating}
                onToggleSubtype={toggleSubtype}
                priceRange={priceRange}
                products={categoryProducts}
                rating={rating}
                resultCount={filteredProducts.length}
                selectedSubtypes={selectedSubtypes}
                hideAlcoholType={false}
              />
            </div>
          </aside>

          {/* MAIN PRODUCT LIST & CONTROLS */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                {productsLoading
                  ? "Loading products…"
                  : `Showing ${filteredProducts.length} of ${categoryProducts.length} ${activeConfig.title} products`}
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
              emptyMessage={`No ${activeConfig.title} products match these filters. Try adjusting your selection.`}
              onAddToCart={handleAddToCart}
              products={filteredProducts}
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
