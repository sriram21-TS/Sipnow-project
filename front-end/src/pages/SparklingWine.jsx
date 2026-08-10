import PageHero from "../components/PageHero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Reveal from "../components/Reveal.jsx";

export default function SparklingWine({ onBack }) {
  return (
    <div className="pt-32 pb-24">
      <PageHero
        description="Discover sparkling wine for every celebration."
        onBack={onBack}
        tag="Wine collection"
        title="Sparkling Wine"
      />
      <Reveal className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <ProductGrid
          emptyMessage="Sparkling wine products are coming soon."
          products={[]}
        />
      </Reveal>
    </div>
  );
}
