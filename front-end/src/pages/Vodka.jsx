import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Vodka({ products = [], onAddToCart, onBack }) {
  return (
    <SpiritCategoryPage
      title="Vodka"
      description="Explore our curated selection of vodka, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}
