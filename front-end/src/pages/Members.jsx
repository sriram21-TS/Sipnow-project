import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";

export default function Members({
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
        description="Enjoy exclusive benefits, offers, and rewards available to SipNow members."
        onBack={onBack}
        tag="Offers & Services"
        title="Members"
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="Exclusive member offers are coming soon."
          onAddToCart={handleAddToCart}
          products={products}
        />
      </Reveal>
    </>
  );
}