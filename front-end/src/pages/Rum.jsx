import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Rum({ products = [], onAddToCart, onBack }) {
  return (
    <SpiritCategoryPage
      title="Rum"
      description="Explore our curated selection of rum, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}
