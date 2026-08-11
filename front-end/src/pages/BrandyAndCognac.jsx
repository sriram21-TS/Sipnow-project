import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function BrandyAndCognac({
  products = [],
  onAddToCart,
  onBack,
}) {
  return (
    <SpiritCategoryPage
      title="Brandy & Cognac"
      description="Explore our curated selection of brandy and cognac, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}
