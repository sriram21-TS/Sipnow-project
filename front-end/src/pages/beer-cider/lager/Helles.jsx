import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function Helles({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Helles"
      description="Explore our Helles collection."
      subtypes={["Helles"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default Helles;