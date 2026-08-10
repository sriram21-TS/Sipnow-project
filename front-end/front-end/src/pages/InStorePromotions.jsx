import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { useInStorePromotions } from "../hooks/useContent.js";

export default function InStorePromotions({ onAddToCart, onBack }) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);
  const { data: inStorePromotions } = useInStorePromotions();

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description="Exclusive discounts available at your local SipNow store this week. Prices shown apply in-store only and are subject to stock on hand."
        onBack={onBack}
        tag="Offers & Services"
        title={
          <>
            In-Store <span className="italic text-primary">Promotions</span>
          </>
        }
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="New promotions are on the way. Check back soon."
          onAddToCart={handleAddToCart}
          products={inStorePromotions}
        />
      </Reveal>
    </div>
  );
}
