const PRICE_RANGES = [
  { key: "all", label: "All Prices" },
  { key: "under10", label: "Under $10" },
  { key: "10to20", label: "$10 – $20" },
  { key: "20to30", label: "$20 – $30" },
  { key: "over30", label: "Over $30" },
];

const RATING_OPTIONS = [
  { key: "all", label: "All Ratings" },
  { key: "4", label: "4 Stars & Up" },
  { key: "3", label: "3 Stars & Up" },
];

export default function WineFilters({
  priceRange,
  onPriceRangeChange,
  rating,
  onRatingChange,
  onClearAll,
  resultCount,
}) {
  const hasActiveFilters = priceRange !== "all" || rating !== "all";

  return (
    <div className="glass-panel rounded-lg p-5 space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-label-md uppercase tracking-[0.15em] text-[11px] text-on-surface-variant">
          Filters
        </p>

        {hasActiveFilters && (
          <button
            className="text-xs text-primary hover:opacity-80 transition-opacity"
            onClick={onClearAll}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>

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
                name="wine-price-range"
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
                name="wine-rating"
                onChange={() => onRatingChange(option.key)}
                type="radio"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-primary/10">
        <p className="text-xs text-on-surface-variant/70">
          {resultCount} product{resultCount === 1 ? "" : "s"} found
        </p>
      </div>
    </div>
  );
}
