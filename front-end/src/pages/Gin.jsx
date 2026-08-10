import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Gin({
  products = [],
  onAddToCart,
  onBack,
}) {
  return (
    <SpiritCategoryPage
      title="Gin"
      description="Explore our curated selection of gin, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}