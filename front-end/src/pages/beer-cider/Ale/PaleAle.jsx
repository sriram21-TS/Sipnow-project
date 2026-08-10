import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function PaleAle({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Pale Ale"
      description="Explore our Pale Ale collection."
      subtypes={["Pale Ale"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default PaleAle;