import ProductCard from "./ProductCard.jsx";

const GRID_CLASSES = {
  sm: "grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2",
  lg: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6",
};

/** Product grid with empty state, shared by ShopAll, CategoryPage and InStorePromotions. */
export default function ProductGrid({
  products,
  size = "sm",
  emptyMessage,
  addedProduct,
  onAddToCart,
}) {
  if (products.length === 0) {
    return (
      <p className="text-on-surface-variant text-center py-16">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={GRID_CLASSES[size]}>
      {products.map((product) => (
        <ProductCard
          isAdded={addedProduct === product.name}
          key={product.name}
          onAdd={onAddToCart}
          product={product}
          size={size}
        />
      ))}
    </div>
  );
}
