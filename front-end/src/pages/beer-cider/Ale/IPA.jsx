import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function IPA({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="IPA"
      description="Explore our IPA collection."
      subtypes={["IPA"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default IPA;