import { useParams } from "react-router-dom";
import PageHero from "../../components/PageHero.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";
import Reveal from "../../components/Reveal.jsx";
import { useAddToCartFeedback } from "../../hooks/useAddToCartFeedback.js";

// slug -> descriptive copy for each Offers & Services sub-page. These
// products key off `section` rather than `type`/`categoryGroup` subtype.
const OFFER_TYPES = {
  "general-promotions": {
    label: "General Promotions",
    description:
      "Discover our latest promotions, special offers, and exclusive deals.",
    emptyMessage: "New promotions are on the way. Check back soon.",
  },
  "gift-cards": {
    label: "Gift Cards",
    description:
      "Give the gift of choice with SipNow gift cards for every occasion.",
    emptyMessage: "Gift card products are coming soon.",
  },
  members: {
    label: "Members",
    description:
      "Enjoy exclusive benefits, offers, and rewards available to SipNow members.",
    emptyMessage: "Exclusive member offers are coming soon.",
  },
  clearance: {
    label: "Clearance",
    description:
      "Shop selected products at special clearance prices while stocks last.",
    emptyMessage: "New clearance products are on the way. Check back soon.",
  },
};

// Dedicated layout for the Offers & Services section (general promotions,
// gift cards, members, clearance). Shop All and In-Store Promotions live
// alongside this file since they share the nav section but have their own
// data shapes — see ShopAll.jsx and InStorePromotions.jsx.
export default function OffersServicesLayout({
  categoryKey: categoryKeyProp,
  onAddToCart,
  onBack,
  products = [],
}) {
  const { categoryKey: categoryKeyParam } = useParams();
  const categoryKey = (categoryKeyProp || categoryKeyParam || "")
    .toLowerCase()
    .trim();

  const offerType = OFFER_TYPES[categoryKey];
  const pageTitle = offerType?.label || "Offers & Services";

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const offerProducts = products.filter((product) =>
    offerType
      ? product.section === categoryKey
      : product.categoryGroup === "offers"
  );

  const pageDescription =
    offerType?.description ||
    "Discover promotions, gift cards, member offers and clearance deals across SipNow.";

  const emptyMessage = offerType
    ? offerType.emptyMessage
    : "New offers are on the way. Check back soon.";

  return (
    <>
      <PageHero
        description={pageDescription}
        onBack={onBack}
        tag="Offers & Services"
        title={pageTitle}
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ProductGrid
          addedProduct={addedProduct}
          emptyMessage={emptyMessage}
          onAddToCart={handleAddToCart}
          products={offerProducts}
        />
      </Reveal>
    </>
  );
}
