import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function Pilsner({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Pilsner"
      description="Explore our Pilsner collection."
      subtypes={["Pilsner"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default Pilsner;