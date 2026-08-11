// import { useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductFilters from "../components/ProductFilters.jsx";
// import ProductGrid from "../components/ProductGrid.jsx";
// import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
// import { getSubtype, parsePrice } from "../utils/productHelpers.js";

// const SORT_OPTIONS = [
//   { key: "featured", label: "Featured" },
//   { key: "price-asc", label: "Price: Low to High" },
//   { key: "price-desc", label: "Price: High to Low" },
//   { key: "rating", label: "Top Rated" },
// ];

// const PRICE_RANGE_BOUNDS = {
//   all: [0, Infinity],
//   under10: [0, 10],
//   "10to20": [10, 20],
//   "20to30": [20, 30],
//   over30: [30, Infinity],
// };

// const RATING_THRESHOLDS = {
//   all: 0,
//   4: 4,
//   3: 3,
// };

// function formatWineName(value) {
//   if (!value) return "Wine";

//   return value
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (letter) => letter.toUpperCase());
// }

// export default function Wine({
//   title,
//   subtitle,
//   onAddToCart,
//   products = [],
//   productsLoading = false,
// }) {
//   const { wineType } = useParams();

//   const { addedProduct, handleAddToCart } =
//     useAddToCartFeedback(onAddToCart);

//   const [selectedSubtypes, setSelectedSubtypes] = useState([]);
//   const [priceRange, setPriceRange] = useState("all");
//   const [rating, setRating] = useState("all");
//   const [sort, setSort] = useState("featured");
//   const [filtersOpen, setFiltersOpen] = useState(false);

//   const toggleSubtype = (subtype) => {
//     setSelectedSubtypes((current) =>
//       current.includes(subtype)
//         ? current.filter((item) => item !== subtype)
//         : [...current, subtype]
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedSubtypes([]);
//     setPriceRange("all");
//     setRating("all");
//   };

//   const wineProducts = useMemo(() => {
//     const wineOnly = products.filter((product) => {
//       const category = String(product.category || "")
//         .trim()
//         .toLowerCase();

//       const categoryGroup = String(product.categoryGroup || "")
//         .trim()
//         .toLowerCase();

//       return (
//         category === "wine" ||
//         category.includes("wine") ||
//         categoryGroup === "wine"
//       );
//     });

//     if (!wineType) {
//       return wineOnly;
//     }

//     const searchValue = wineType
//       .trim()
//       .toLowerCase()
//       .replace(/-/g, " ");

//     return wineOnly.filter((product) => {
//       const name = String(product.name || "")
//         .trim()
//         .toLowerCase();

//       const subcategory = String(
//         product.subcategory ||
//           product.subCategory ||
//           product.wineType ||
//           product.type ||
//           ""
//       )
//         .trim()
//         .toLowerCase();

//       const subtype = String(getSubtype(product) || "")
//         .trim()
//         .toLowerCase();

//       const category = String(product.category || "")
//         .trim()
//         .toLowerCase();

//       return (
//         name.includes(searchValue) ||
//         subcategory.includes(searchValue) ||
//         subtype.includes(searchValue) ||
//         category.includes(searchValue)
//       );
//     });
//   }, [products, wineType]);

//   const filteredProducts = useMemo(() => {
//     const [minPrice, maxPrice] =
//       PRICE_RANGE_BOUNDS[priceRange];

//     const minRating = RATING_THRESHOLDS[rating];

//     const filtered = wineProducts.filter((product) => {
//       if (
//         selectedSubtypes.length > 0 &&
//         !selectedSubtypes.includes(getSubtype(product))
//       ) {
//         return false;
//       }

//       const price = parsePrice(product.price);

//       if (price < minPrice || price > maxPrice) {
//         return false;
//       }

//       return Number(product.rating || 0) >= minRating;
//     });

//     const sorted = [...filtered];

//     if (sort === "price-asc") {
//       sorted.sort(
//         (a, b) => parsePrice(a.price) - parsePrice(b.price)
//       );
//     } else if (sort === "price-desc") {
//       sorted.sort(
//         (a, b) => parsePrice(b.price) - parsePrice(a.price)
//       );
//     } else if (sort === "rating") {
//       sorted.sort(
//         (a, b) =>
//           Number(b.rating || 0) - Number(a.rating || 0)
//       );
//     }

//     return sorted;
//   }, [
//     wineProducts,
//     selectedSubtypes,
//     priceRange,
//     rating,
//     sort,
//   ]);

//   const pageTitle =
//     title ||
//     (wineType
//       ? formatWineName(wineType)
//       : "Wine");

//   const pageSubtitle =
//     subtitle ||
//     "Explore our curated selection of wines for every occasion.";

//   return (
//     <div className="pt-32 pb-16">
//       <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
//         <div className="mb-12">
//           <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
//             Wine
//           </p>

//           <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-4">
//             {pageTitle}
//           </h1>

//           <p className="text-on-surface-variant text-lg max-w-2xl">
//             {pageSubtitle}
//           </p>
//         </div>

//         <button
//           className="lg:hidden w-full flex items-center justify-center gap-2 glass-panel rounded-lg px-4 py-3 mb-6 text-sm font-label-md uppercase tracking-widest border border-primary/20"
//           onClick={() =>
//             setFiltersOpen((open) => !open)
//           }
//           type="button"
//         >
//           <span className="material-symbols-outlined text-[18px]">
//             tune
//           </span>

//           {filtersOpen
//             ? "Hide Filters"
//             : "Show Filters"}
//         </button>

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
//           <aside
//             className={`lg:w-72 shrink-0 ${
//               filtersOpen ? "block" : "hidden"
//             } lg:block mb-6 lg:mb-0`}
//           >
//             <div className="lg:sticky lg:top-32">
//               <ProductFilters
//                 onClearAll={clearAllFilters}
//                 onPriceRangeChange={setPriceRange}
//                 onRatingChange={setRating}
//                 onToggleSubtype={toggleSubtype}
//                 priceRange={priceRange}
//                 products={wineProducts}
//                 rating={rating}
//                 resultCount={filteredProducts.length}
//                 selectedSubtypes={selectedSubtypes}
//                 hideAlcoholType
//               />
//             </div>
//           </aside>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-sm text-on-surface-variant">
//                 {productsLoading
//                   ? "Loading products..."
//                   : `Showing ${filteredProducts.length} of ${wineProducts.length} products`}
//               </p>

//               <label className="flex items-center gap-2 text-sm text-on-surface-variant">
//                 Sort by

//                 <select
//                   className="glass-panel rounded-lg px-3 py-1.5 text-sm text-on-surface bg-surface-container-high border border-primary/20 focus:outline-none focus:border-primary"
//                   onChange={(e) =>
//                     setSort(e.target.value)
//                   }
//                   value={sort}
//                 >
//                   {SORT_OPTIONS.map((option) => (
//                     <option
//                       key={option.key}
//                       value={option.key}
//                     >
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>

//             <ProductGrid
//               addedProduct={addedProduct}
//               emptyMessage="No wine products found in this collection."
//               onAddToCart={handleAddToCart}
//               products={filteredProducts}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { getSubtype, parsePrice } from "../utils/productHelpers.js";
import { useParams } from "react-router-dom";

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

const WINE_PLACEHOLDERS = Array.from({ length: 6 }, (_, index) => ({
  id: `wine-placeholder-${index + 1}`,
  name: "Wine Selection",
  brand: "Wine",
  category: "Wine",
  price: 0,
  rating: 0,
  reviews: 0,
  stock: 0,
  image: "",
  isPlaceholder: true,
}));

export default function Wine({
  title = "Wine",
  subtitle = "Explore our curated selection of wines for every occasion.",
  onAddToCart,
  products = [],
  productsLoading = false,
}) {
  const { wineType } = useParams();

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

  const wineProducts = useMemo(() => {
    const wineItems = products.filter((product) => {
      const category = String(product.category || "")
        .trim()
        .toLowerCase();

      const categoryGroup = String(product.categoryGroup || "")
        .trim()
        .toLowerCase();

      return category === "wine" || categoryGroup === "wine";
    });

    if (!wineType) {
      return wineItems;
    }

    const searchValue = wineType.replace(/-/g, " ").trim().toLowerCase();

    return wineItems.filter((product) => {
      const name = String(product.name || "")
        .trim()
        .toLowerCase();

      const subcategory = String(
        product.subcategory || product.subCategory || product.wineType || ""
      )
        .trim()
        .toLowerCase();

      const subtype = String(getSubtype(product) || "")
        .trim()
        .toLowerCase();

      return (
        name.includes(searchValue) ||
        subcategory.includes(searchValue) ||
        subtype.includes(searchValue)
      );
    });
  }, [products, wineType]);

  const filteredProducts = useMemo(() => {
    const [minPrice, maxPrice] = PRICE_RANGE_BOUNDS[priceRange];

    const minRating = RATING_THRESHOLDS[rating];

    const filtered = wineProducts.filter((product) => {
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
  }, [wineProducts, selectedSubtypes, priceRange, rating, sort]);

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : WINE_PLACEHOLDERS;

  return (
    <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-32 pb-16">
      <div className="mb-12">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Wine
        </p>

        <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-4">
          {wineType
            ? wineType
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : title}
        </h1>

        <p className="text-on-surface-variant text-lg max-w-2xl">{subtitle}</p>
      </div>

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
              products={wineProducts}
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
                ? "Loading products..."
                : `Showing ${filteredProducts.length} of ${wineProducts.length} products`}
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

          {filteredProducts.length === 0 && !productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WINE_PLACEHOLDERS.map((product) => (
                <div
                  key={product.id}
                  className="glass-panel rounded-xl overflow-hidden border border-primary/10"
                >
                  <div className="h-64 flex items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
                      wine_bar
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">
                      Wine
                    </p>

                    <h3 className="text-lg font-semibold text-on-surface mb-3">
                      Wine Selection
                    </h3>

                    <div className="h-4 w-24 bg-on-surface/10 rounded mb-4" />

                    <div className="h-10 w-full bg-on-surface/10 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid
              addedProduct={addedProduct}
              emptyMessage=""
              onAddToCart={handleAddToCart}
              products={displayProducts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
