import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";

export default function GiftCards({
  onAddToCart,
  onBack,
  products = [],
}) {
  const {
    addedProduct,
    handleAddToCart,
  } = useAddToCartFeedback(onAddToCart);

  return (
    <>
      <PageHero
        description="Give the gift of choice with SipNow gift cards for every occasion."
        onBack={onBack}
        tag="Offers & Services"
        title="Gift Cards"
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="Gift card products are coming soon."
          onAddToCart={handleAddToCart}
          products={products}
        />
      </Reveal>
    </>
  );
}