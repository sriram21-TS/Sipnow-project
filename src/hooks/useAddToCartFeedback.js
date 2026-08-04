import { useState } from "react";

/** Adds a product to the cart and briefly flags it as "added" (for the check-mark button state). */
export function useAddToCartFeedback(onAddToCart) {
  const [addedProduct, setAddedProduct] = useState(null);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedProduct(product.name);
    setTimeout(
      () =>
        setAddedProduct((current) =>
          current === product.name ? null : current
        ),
      1200
    );
  };

  return { addedProduct, handleAddToCart };
}
