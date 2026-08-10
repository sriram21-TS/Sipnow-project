import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function FruitCider({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Fruit Cider"
      description="Explore our Fruit Cider collection."
      subtypes={["Fruit Cider"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default FruitCider;