import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { useCategories } from "../hooks/useContent.js";
import { useParams } from "react-router-dom";

const SPECIAL_CATEGORIES = {
  "general-promotions": {
    name: "General Promotions",
    tag: "Offers & Services",
    description:
      "Discover our latest promotions, special offers, and exclusive deals.",
  },

  "gift-cards": {
    name: "Gift Cards",
    tag: "Offers & Services",
    description:
      "Give the gift of choice with SipNow gift cards for every occasion.",
  },

  members: {
    name: "Members",
    tag: "Offers & Services",
    description:
      "Enjoy exclusive benefits, offers, and rewards available to SipNow members.",
  },

  clearance: {
    name: "Clearance",
    tag: "Offers & Services",
    description:
      "Shop selected products at special clearance prices while stocks last.",
  },
};

export default function CategoryPage({
  categoryKey: categoryKeyProp,
  onAddToCart,
  onBack,
  products = [],
}) {
  const { categoryKey: categoryKeyParam } = useParams();

  // Use App.jsx prop first, otherwise get it from the URL.
  const categoryKey = categoryKeyProp || categoryKeyParam;

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const { data: categories = [] } = useCategories();

  // Normal category
  const normalCategory = categories.find((item) => item.key === categoryKey);

  // Special Offers & Services category
  const specialCategory = SPECIAL_CATEGORIES[categoryKey];

  const categoryName =
    specialCategory?.name || normalCategory?.name || "Products";

  const categoryTag =
    specialCategory?.tag || normalCategory?.tag || "Our Range";

  const categoryDescription =
    specialCategory?.description ||
    `Explore our curated selection of ${categoryName.toLowerCase()}, handpicked for every occasion.`;

  // ============================================
  // PRODUCT FILTERING
  // ============================================

  const categoryProducts = products.filter((product) => {
    // Offers & Services
    if (specialCategory) {
      return (
        product.categoryGroup === "offers" && product.section === categoryKey
      );
    }

    // Normal categories
    return product.categoryGroup === categoryKey;
  });

  return (
    <>
      <PageHero
        description={categoryDescription}
        onBack={onBack}
        tag={categoryTag}
        title={categoryName}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage={
            categoryProducts.length === 0
              ? `New ${categoryName.toLowerCase()} arrivals are on the way. Check back soon.`
              : ""
          }
          onAddToCart={handleAddToCart}
          products={categoryProducts}
        />
      </Reveal>
    </>
  );
}
