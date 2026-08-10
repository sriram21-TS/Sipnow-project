import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function Pear({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Pear"
      description="Explore our Pear Cider collection."
      subtypes={["Pear"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default Pear;