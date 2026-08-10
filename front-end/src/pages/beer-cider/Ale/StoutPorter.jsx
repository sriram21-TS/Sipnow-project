import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function StoutPorter({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Stout & Porter"
      description="Explore our Stout & Porter collection."
      subtypes={["Stout & Porter"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default StoutPorter;