import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import Reveal from "../components/Reveal.jsx";

const WINE_PAGES = {
  "sparkling-wine": {
    title: "Sparkling Wine",
    description: "Discover sparkling wine for every celebration.",
  },
  champagne: {
    title: "Champagne",
    description: "Explore our Champagne collection.",
  },
  prosecco: {
    title: "Prosecco",
    description: "Explore bright and refreshing Prosecco.",
  },
  "sparkling-white-wine": {
    title: "Sparkling White Wine",
    description: "Explore sparkling white wine.",
  },
  "sparkling-rose-wine": {
    title: "Sparkling Rosé Wine",
    description: "Explore sparkling rosé wine.",
  },
  "other-sparkling-wine": {
    title: "Other Sparkling Wine",
    description: "Explore more sparkling wine styles.",
  },
  "fortified-wine": {
    title: "Fortified Wine",
    description: "Explore fortified wine.",
  },
  "zero-alcohol-wine": {
    title: "Zero% Alcohol Wine",
    description: "Explore zero-alcohol wine.",
  },
};

export default function WineCategory({ category, onBack }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("featured");
  const details = WINE_PAGES[category] || WINE_PAGES["sparkling-wine"];
  const filterProducts = [{ categoryGroup: "wine", category: details.title }];
  const clearFilters = () => {
    setSelectedSubtypes([]);
    setPriceRange("all");
    setRating("all");
  };
  const toggleSubtype = (subtype) =>
    setSelectedSubtypes((current) =>
      current.includes(subtype)
        ? current.filter((item) => item !== subtype)
        : [...current, subtype]
    );

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description={details.description}
        onBack={onBack}
        tag="Wine collection"
        title={details.title}
      />
      <Reveal className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <button
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 px-4 py-3 text-sm uppercase tracking-widest glass-panel lg:hidden"
          onClick={() => setFiltersOpen((open) => !open)}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          {filtersOpen ? "Hide filters" : "Show filters"}
        </button>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside
            className={`shrink-0 lg:block lg:w-72 ${filtersOpen ? "block" : "hidden"}`}
          >
            <div className="lg:sticky lg:top-32">
              <ProductFilters
                onClearAll={clearFilters}
                onPriceRangeChange={setPriceRange}
                onRatingChange={setRating}
                onToggleSubtype={toggleSubtype}
                priceRange={priceRange}
                products={filterProducts}
                rating={rating}
                resultCount={0}
                selectedSubtypes={selectedSubtypes}
              />
            </div>
          </aside>
          <section className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                Products coming soon
              </p>
              <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                Sort by
                <select
                  className="rounded-lg border border-primary/20 bg-surface-container-high px-3 py-1.5 text-sm text-on-surface focus:border-primary focus:outline-none"
                  onChange={(event) => setSort(event.target.value)}
                  value={sort}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </label>
            </div>
            <div
              aria-label={`${details.title} product grid`}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  aria-label="Product placeholder"
                  className="h-56 rounded-xl border border-primary/15 bg-surface-container-high/70"
                  key={index}
                />
              ))}
            </div>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
