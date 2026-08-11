import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";

export default function GiftCards({ onAddToCart, onBack, products = [] }) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  return (
    <>
      <PageHero
        description="Give the gift of choice with SipNow gift cards for every occasion."
        onBack={onBack}
        tag="Offers & Services"
        title="Gift Cards"
      />

<<<<<<< HEAD
      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="Gift card products are coming soon."
          onAddToCart={handleAddToCart}
          products={products}
        />
      </Reveal>
    </>
=======
      <button
        type="button"
        onClick={() => navigate("/offers/gift-cards/products")}
        className="inline-block px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20 transition-colors font-label-md uppercase tracking-[0.2em] text-[11px] mb-8"
      >
        Full Collection
      </button>

      <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[56px] leading-tight mb-4">
        Gift Cards
      </h1>

      <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
        Give the gift of choice with SipNow gift cards for every occasion.
      </p>
    </div>
>>>>>>> 11ab939174429f8c1b9a049a0394e239f2fd8b85
  );
}
