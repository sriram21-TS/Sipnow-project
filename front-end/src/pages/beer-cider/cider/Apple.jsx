import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function Apple({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Apple"
      description="Explore our Apple Cider collection."
      subtypes={["Apple"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default Apple;