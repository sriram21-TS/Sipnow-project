import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";

export default function CategoryPage({ categoryKey, onAddToCart, onBack }) {
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);
  const category = categories.find((item) => item.key === categoryKey);
  const categoryProducts = products.filter(
    (product) => product.categoryGroup === categoryKey
  );
  const categoryName = category?.name ?? "Products";

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description={`Explore our curated selection of ${categoryName.toLowerCase()}, handpicked for every occasion.`}
        onBack={onBack}
        tag={category?.tag ?? "Our Range"}
        title={categoryName}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage={`New ${categoryName.toLowerCase()} arrivals are on the way. Check back soon.`}
          onAddToCart={handleAddToCart}
          products={categoryProducts}
        />
      </Reveal>
    </div>
  );
}
