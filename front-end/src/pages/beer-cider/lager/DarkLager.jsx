import BeerCiderCategoryPage from "../../../components/BeerCiderCategoryPage.jsx";

function DarkLager({
  onAddToCart,
  onBack,
  products = [],
  productsLoading = false,
}) {
  return (
    <BeerCiderCategoryPage
      title="Dark Lager"
      description="Explore our Dark Lager collection."
      subtypes={["Dark Lager"]}
      onAddToCart={onAddToCart}
      onBack={onBack}
      products={products}
      productsLoading={productsLoading}
    />
  );
}

export default DarkLager;