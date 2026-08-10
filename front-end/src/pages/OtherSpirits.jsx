import SpiritCategoryPage from "./SpiritCategoryPage.jsx";

export default function OtherSpirits({
  products = [],
  onAddToCart,
  onBack,
}) {
  return (
    <SpiritCategoryPage
      title="Other Spirits"
      description="Explore our curated selection of other spirits, handpicked for every occasion."
      products={products}
      onAddToCart={onAddToCart}
      onBack={onBack}
    />
  );
}