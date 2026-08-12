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
    emptyMessage: "New promotions are on the way. Check back soon.",
  },

  "gift-cards": {
    name: "Gift Cards",
    tag: "Offers & Services",
    description:
      "Give the gift of choice with SipNow gift cards for every occasion.",
    emptyMessage: "Gift card products are coming soon.",
  },

  members: {
    name: "Members",
    tag: "Offers & Services",
    description:
      "Enjoy exclusive benefits, offers, and rewards available to SipNow members.",
    emptyMessage: "Exclusive member offers are coming soon.",
  },

  clearance: {
    name: "Clearance",
    tag: "Offers & Services",
    description:
      "Shop selected products at special clearance prices while stocks last.",
    emptyMessage: "New clearance products are on the way. Check back soon.",
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

  // Check normal categories first.
  const normalCategory = categories.find((item) => item.key === categoryKey);

  // Check our special Offers & Services pages.
  const specialCategory = SPECIAL_CATEGORIES[categoryKey];

  const categoryName =
    specialCategory?.name || normalCategory?.name || "Products";

  const categoryTag =
    specialCategory?.tag || normalCategory?.tag || "Our Range";

  const categoryDescription =
    specialCategory?.description ||
    `Explore our curated selection of ${categoryName.toLowerCase()}, handpicked for every occasion.`;

  // Offers & Services sub-pages key products off `section`; everything
  // else keys off `categoryGroup`.
  const categoryProducts = products.filter((product) =>
    specialCategory
      ? product.section === categoryKey
      : product.categoryGroup === categoryKey
  );

  const emptyMessage =
    categoryProducts.length === 0
      ? specialCategory?.emptyMessage ||
        `New ${categoryName.toLowerCase()} arrivals are on the way. Check back soon.`
      : "";

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
          emptyMessage={emptyMessage}
          onAddToCart={handleAddToCart}
          products={categoryProducts}
        />
      </Reveal>
    </>
  );
}
