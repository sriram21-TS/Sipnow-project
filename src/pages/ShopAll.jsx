import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { products } from "../data/products.js";

export default function ShopAll({ onAddToCart, onBack }) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description="Every bottle and can in our cellar, in one place."
        onBack={onBack}
        tag="Full Collection"
        title="All Products"
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage="New arrivals are on the way. Check back soon."
          onAddToCart={handleAddToCart}
          products={products}
        />
      </Reveal>
    </div>
  );
}
