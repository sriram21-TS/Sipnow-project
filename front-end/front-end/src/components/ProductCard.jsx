import { useState } from "react";
import StarRating from "./StarRating.jsx";
import {
  DEFAULT_PACK_SIZES,
  formatCurrency,
  formatPackSize,
  parsePrice,
} from "../utils/productHelpers.js";

const SIZE = {
  card: "rounded-xl p-3 space-y-3",
  imageWrap: "rounded-lg",
  badgePos: "top-2 left-2",
  badgePad: "px-2 py-1",
  badgeIcon: "text-[11px]",
  badgeText: "text-[9px]",
  plainBadgePad: "px-2 py-0.5",
  plainBadgeText: "text-[8px]",
  addBtnPos: "bottom-2.5 right-2.5",
  addBtnSize: "h-9 w-9 hover:w-[128px]",
  addIcon: "text-[14px]",
  category: "text-[12px]",
  name: "text",
  price: "text",
};

const zeroCounts = (packSizes) =>
  Object.fromEntries(packSizes.map((qty) => [qty, 0]));

/** Single product tile used by BestSellers, ShopAll, CategoryPage and InStorePromotions. */
export default function ProductCard({
  product,
  isAdded,
  onAdd,
  className = "",
}) {
  const s = SIZE;
  const isGlowBadge = product.badgeStyle === "glow";
  const packSizes = product.packSizes ?? DEFAULT_PACK_SIZES;
  const unitPrice = parsePrice(product.price);

  const [expanded, setExpanded] = useState(false);
  const [counts, setCounts] = useState(() => zeroCounts(packSizes));

  const totalUnits = packSizes.reduce((sum, qty) => sum + counts[qty] * qty, 0);
  const subtotal = packSizes.reduce(
    (sum, qty) => sum + counts[qty] * qty * unitPrice,
    0
  );

  const updateCount = (qty, delta) => {
    setCounts((current) => ({
      ...current,
      [qty]: Math.max(0, current[qty] + delta),
    }));
  };

  const cancelPicker = (e) => {
    e.stopPropagation();
    setCounts(zeroCounts(packSizes));
    setExpanded(false);
  };

  const confirmAdd = (e) => {
    e.stopPropagation();
    if (totalUnits > 0) onAdd(product, totalUnits);
    setCounts(zeroCounts(packSizes));
    setExpanded(false);
  };

  return (
    <div
      className={`group glass-panel glow-border shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${s.card} ${className}`}
    >
      <div
        className={`relative ${expanded ? "" : "aspect-square"} ${s.imageWrap}`}
      >
        {expanded ? (
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-surface-container-high p-3.5 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-on-surface line-clamp-2 pr-1">
                {product.name}
              </p>
              <button
                aria-label="Close quantity picker"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/15 hover:text-primary transition-colors"
                onClick={cancelPicker}
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">
                  close
                </span>
              </button>
            </div>

            <div className="space-y-2">
              {packSizes.map((qty) => (
                <div
                  className="flex items-center justify-between gap-2 rounded-lg bg-surface-container-highest/50 px-2.5 py-2"
                  key={qty}
                >
                  <p className="text-xs font-medium text-on-surface">
                    {formatCurrency(unitPrice * qty)}{" "}
                    <span className="text-on-surface-variant font-normal lowercase">
                      {qty <= 1 ? "each" : `case (${qty})`}
                    </span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button
                      aria-label={`Decrease ${formatPackSize(qty)} quantity`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      disabled={counts[qty] === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCount(qty, -1);
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        remove
                      </span>
                    </button>
                    <span className="w-5 text-center text-sm font-medium text-on-surface">
                      {counts[qty]}
                    </span>
                    <button
                      aria-label={`Increase ${formatPackSize(qty)} quantity`}
                      className="flex h-7 w-7 items-center justify-center rounded-full primary-gradient text-white transition-transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateCount(qty, 1);
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        add
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-primary/10 pt-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <button
                className="w-full rounded-lg primary-gradient py-2 text-[11px] uppercase tracking-wide text-white shadow-lg transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={totalUnits === 0}
                onClick={confirmAdd}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className={`absolute inset-0 overflow-hidden bg-surface-container-high ${s.imageWrap}`}
            >
              <img
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1s]"
                src={product.image}
              />
            </div>
            {isGlowBadge ? (
              <div
                className={`badge-glow absolute z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-sm font-bold uppercase tracking-wide shadow-lg ${s.badgePos} ${s.badgePad} ${s.badgeText}`}
              >
                <span
                  className={`material-symbols-outlined ${s.badgeIcon}`}
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {product.icon}
                </span>
                {product.badgeText}
              </div>
            ) : (
              <div
                className={`absolute rounded-full bg-primary text-on-primary font-label-sm uppercase tracking-widest ${s.badgePos} ${s.plainBadgePad} ${s.plainBadgeText}`}
              >
                {product.badgeText}
              </div>
            )}
            <button
              aria-label={`Add ${product.name} to cart`}
              className={`group/cart absolute z-20 flex items-center rounded-full primary-gradient text-white shadow-2xl overflow-hidden opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out pl-[10px] gap-1.5 ${s.addBtnPos} ${s.addBtnSize}`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(true);
              }}
              type="button"
            >
              <span
                className={`material-symbols-outlined shrink-0 ${s.addIcon}`}
              >
                {isAdded ? "check" : "add_shopping_cart"}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide opacity-0 group-hover/cart:opacity-100 transition-opacity duration-200">
                {isAdded ? "Added" : "Add to Cart"}
              </span>
            </button>
          </>
        )}
      </div>
      <div className="flex justify-between items-start px-1">
        <div className="space-y-0.5">
          <p
            className={`text-on-surface-variant uppercase tracking-[0.2em] ${s.category}`}
          >
            {product.category}
          </p>
          <h4
            className={`font-headline-md group-hover:text-primary transition-colors ${s.name}`}
          >
            {product.name}
          </h4>
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          {product.promoLabel && (
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest pt-1">
              {product.promoLabel}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className={`font-headline-md text-primary ${s.price}`}>
            {product.price}
          </p>
          {product.originalPrice && (
            <p className="text-on-surface-variant text-xs line-through">
              {product.originalPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
