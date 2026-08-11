import React from "react";
import { useNavigate } from "react-router-dom";

const GeneralPromotions = () => {
  const navigate = useNavigate();

  return (
    <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-28 pb-16">
      {/* Back to Home */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
      >
        <span className="material-symbols-outlined text-[18px]">west</span>
        Back to home
      </button>

      {/* Full Collection */}
      <button
        type="button"
        onClick={() => navigate("/offers/general-promotions/products")}
        className="
          inline-block
          px-6
          py-3
          rounded-full
          bg-primary/10
          text-primary
          border
          border-primary/40
          hover:bg-primary/20
          transition-colors
          font-label-md
          uppercase
          tracking-[0.2em]
          text-[11px]
          mb-8
        "
      >
        Full Collection
      </button>

      {/* Title */}
      <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[56px] leading-tight mb-4">
        General Promotions
      </h1>

      {/* Description */}
      <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
        Discover our latest promotions, special offers, and exclusive deals.
      </p>
    </div>
  );
};

export default GeneralPromotions;
