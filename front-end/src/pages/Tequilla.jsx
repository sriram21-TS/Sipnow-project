import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Tequilla({
  products = [],
  onAddToCart,
  onBack,
}) {
  return (
    <SpiritCategoryPage
      title="Tequila"
      description="Explore our curated selection of tequila, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}