import { useState } from "react";
import Reveal from "./Reveal.jsx";
import StarRating from "./StarRating.jsx";
import { inStorePromotions } from "../data/inStorePromotions.js";

export default function InStorePromotions({ onAddToCart, onBack }) {
  const [addedProduct, setAddedProduct] = useState(null);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedProduct(product.name);
    setTimeout(
      () =>
        setAddedProduct((current) =>
          current === product.name ? null : current
        ),
      1200
    );
  };

  return (
    <div className="pt-32 pb-24">
      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
        <button
          className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
          onClick={onBack}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">west</span>
          Back to home
        </button>
        <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-label-md uppercase tracking-[0.2em] text-[10px] mb-6">
          Offers &amp; Services
        </div>
        <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[56px] leading-tight mb-4">
          In-Store <span className="italic text-primary">Promotions</span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Exclusive discounts available at your local SipNow store this week.
          Prices shown apply in-store only and are subject to stock on hand.
        </p>
      </Reveal>

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inStorePromotions.map((product) => (
            <div
              className="group glass-panel glow-border rounded-2xl p-3 space-y-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              key={product.name}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-high">
                <img
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1s]"
                  src={product.image}
                />
                <div className="badge-glow absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-sm text-[10px] font-bold uppercase tracking-wide shadow-lg">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {product.icon}
                  </span>
                  {product.badgeText}
                </div>
                <button
                  aria-label={`Add ${product.name} to cart`}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-full primary-gradient text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedProduct === product.name
                      ? "check"
                      : "add_shopping_cart"}
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-start px-1">
                <div className="space-y-0.5">
                  <p className="text-on-surface-variant text-[9px] uppercase tracking-[0.2em]">
                    {product.category}
                  </p>
                  <h4 className="font-headline-md text-sm group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <StarRating
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                  />
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-widest pt-1">
                    {product.promoLabel}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-headline-md text-sm text-primary">
                    {product.price}
                  </p>
                  <p className="text-on-surface-variant text-xs line-through">
                    {product.originalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
