import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Bourbon({ products = [], onAddToCart, onBack }) {
  return (
    <SpiritCategoryPage
      title="Bourbon"
      description="Explore our curated selection of bourbon, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}
