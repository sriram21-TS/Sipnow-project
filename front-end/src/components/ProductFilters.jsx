import { getSubtype, products } from "../data/products.js";

const GROUP_LABELS = { wine: "Wine", spirits: "Spirits", beer: "Beer" };
const GROUP_ORDER = ["wine", "spirits", "beer"];

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

function buildTypeTree() {
  const tree = new Map();
  for (const product of products) {
    if (!tree.has(product.categoryGroup)) {
      tree.set(product.categoryGroup, new Map());
    }
    const group = tree.get(product.categoryGroup);
    const subtype = getSubtype(product);
    group.set(subtype, (group.get(subtype) ?? 0) + 1);
  }
  return tree;
}

const TYPE_TREE = buildTypeTree();

/** Left-hand filter sidebar for ShopAll: alcohol type/subtype, price and rating. */
export default function ProductFilters({
  selectedSubtypes,
  onToggleSubtype,
  priceRange,
  onPriceRangeChange,
  rating,
  onRatingChange,
  onClearAll,
  resultCount,
}) {
  const hasActiveFilters =
    selectedSubtypes.length > 0 || priceRange !== "all" || rating !== "all";

  return (
    <div className="glass-panel glow-border rounded-2xl p-6 space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            className="text-[11px] uppercase tracking-widest text-primary hover:underline"
            onClick={onClearAll}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-5">
        <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
          Type of Alcohol
        </p>
        {GROUP_ORDER.map((groupKey) => {
          const subtypes = TYPE_TREE.get(groupKey);
          if (!subtypes) return null;
          return (
            <div className="space-y-2" key={groupKey}>
              <p className="text-sm font-medium text-on-surface">
                {GROUP_LABELS[groupKey]}
              </p>
              <div className="space-y-1.5 pl-1">
                {[...subtypes.entries()].map(([subtype, count]) => (
                  <label
                    className="flex items-center gap-2.5 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
                    key={subtype}
                  >
                    <input
                      checked={selectedSubtypes.includes(subtype)}
                      className="w-4 h-4 rounded border-primary/30 bg-transparent accent-primary"
                      onChange={() => onToggleSubtype(subtype)}
                      type="checkbox"
                    />
                    <span className="flex-1">{subtype}</span>
                    <span className="text-xs text-on-surface-variant/60">
                      {count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-px bg-primary/10" />

      <div className="space-y-3">
        <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
          Price
        </p>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((option) => (
            <label
              className="flex items-center gap-2.5 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
              key={option.key}
            >
              <input
                checked={priceRange === option.key}
                className="w-4 h-4 accent-primary"
                name="price-range"
                onChange={() => onPriceRangeChange(option.key)}
                type="radio"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-primary/10" />

      <div className="space-y-3">
        <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
          Rating
        </p>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((option) => (
            <label
              className="flex items-center gap-2.5 text-sm text-on-surface-variant hover:text-on-surface cursor-pointer"
              key={option.key}
            >
              <input
                checked={rating === option.key}
                className="w-4 h-4 accent-primary"
                name="rating"
                onChange={() => onRatingChange(option.key)}
                type="radio"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {typeof resultCount === "number" && (
        <p className="text-xs text-on-surface-variant/70 pt-3 border-t border-primary/10">
          {resultCount} product{resultCount === 1 ? "" : "s"} found
        </p>
      )}
    </div>
  );
}
