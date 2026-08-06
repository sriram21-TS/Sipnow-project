import ProductCard from "./ProductCard.jsx";

const GRID_CLASSES =
  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(var(--card-min-width),1fr))] gap-3";

/** Product grid with empty state, shared by ShopAll, CategoryPage and InStorePromotions. */
export default function ProductGrid({
  products,
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
    <div className={GRID_CLASSES}>
      {products.map((product) => (
        <ProductCard
          isAdded={addedProduct === product.name}
          key={product.name}
          onAdd={onAddToCart}
          product={product}
        />
      ))}
    </div>
  );
}
