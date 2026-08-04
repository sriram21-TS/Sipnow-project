import StarRating from "./StarRating.jsx";

const SIZES = {
  sm: {
    card: "rounded-xl p-2 space-y-2",
    imageWrap: "rounded-lg",
    badgePos: "top-2 left-2",
    badgePad: "px-2 py-1",
    badgeIcon: "text-[11px]",
    badgeText: "text-[9px]",
    plainBadgePad: "px-2 py-0.5",
    plainBadgeText: "text-[8px]",
    addBtnPos: "bottom-2 right-2",
    addBtnSize: "w-7 h-7",
    addIcon: "text-[16px]",
    category: "text-[8px]",
    name: "text-xs",
    price: "text-xs",
  },
  lg: {
    card: "rounded-2xl p-3 space-y-3",
    imageWrap: "rounded-xl",
    badgePos: "top-3 left-3",
    badgePad: "px-3 py-1.5",
    badgeIcon: "text-[13px]",
    badgeText: "text-[10px]",
    plainBadgePad: "px-2 py-0.5",
    plainBadgeText: "text-[8px]",
    addBtnPos: "bottom-3 right-3",
    addBtnSize: "w-9 h-9",
    addIcon: "text-[18px]",
    category: "text-[9px]",
    name: "text-sm",
    price: "text-sm",
  },
};

/** Single product tile used by BestSellers, ShopAll, CategoryPage and InStorePromotions. */
export default function ProductCard({
  product,
  size = "sm",
  isAdded,
  onAdd,
  className = "",
}) {
  const s = SIZES[size];
  const isGlowBadge = size === "lg" || product.badgeStyle === "glow";

  return (
    <div
      className={`group glass-panel glow-border shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${s.card} ${className}`}
    >
      <div
        className={`relative aspect-square overflow-hidden bg-surface-container-high ${s.imageWrap}`}
      >
        <img
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1s]"
          src={product.image}
        />
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
          className={`absolute rounded-full primary-gradient text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl ${s.addBtnPos} ${s.addBtnSize}`}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
        >
          <span className={`material-symbols-outlined ${s.addIcon}`}>
            {isAdded ? "check" : "add_shopping_cart"}
          </span>
        </button>
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
