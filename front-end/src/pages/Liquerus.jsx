import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function Liquerus({
  products = [],
  onAddToCart,
  onBack,
}) {
  return (
    <SpiritCategoryPage
      title="Liqueurs"
      description="Explore our curated selection of liqueurs, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}