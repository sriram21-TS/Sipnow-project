import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { useInStorePromotions } from "../hooks/useContent.js";

export default function Clearance({ onAddToCart, onBack, products = [] }) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);
  const { data: inStorePromotions = [] } = useInStorePromotions();

  const sectionProducts = products.filter(
    (p) => p.section === "clearance" || p.categoryGroup === "offers"
  );
  const displayProducts =
    sectionProducts.length > 0
      ? sectionProducts
      : inStorePromotions.map((p) => ({
          ...p,
          badgeText: p.badgeText || "Clearance",
        }));

  return (
    <>
      <PageHero
        description="Shop selected products at special clearance prices while stocks last."
        onBack={onBack}
        tag="Offers & Services"
        title="Clearance"
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="New clearance products are on the way. Check back soon."
          isInStorePromotion={true}
          onAddToCart={handleAddToCart}
          products={displayProducts}
        />
      </Reveal>
    </>
  );
}
