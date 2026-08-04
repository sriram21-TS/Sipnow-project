import { useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import BestSellers from "./components/BestSellers.jsx";
import NewArrivalsBanner from "./components/NewArrivalsBanner.jsx";
import BrandSpotlight from "./components/BrandSpotlight.jsx";
import SommelierCta from "./components/SommelierCta.jsx";
import Newsletter from "./components/Newsletter.jsx";
import WhySipNow from "./components/WhySipNow.jsx";
import ResponsibleDrinking from "./components/ResponsibleDrinking.jsx";
import Footer from "./components/Footer.jsx";
import QuizModal from "./components/QuizModal.jsx";
import InStorePromotions from "./components/InStorePromotions.jsx";

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [page, setPage] = useState("home");

  const addToCart = () => setCartCount((count) => count + 1);

  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AmbientBackground />
      <Navbar cartCount={cartCount} onNavigate={goToPage} />
      <main className="relative z-10">
        {page === "in-store-promotions" ? (
          <InStorePromotions
            onAddToCart={addToCart}
            onBack={() => goToPage("home")}
          />
        ) : (
          <>
            <HeroCarousel />
            <CategoryGrid />
            <BestSellers onAddToCart={addToCart} />
            <NewArrivalsBanner />
            <BrandSpotlight />
            <SommelierCta onStart={() => setQuizOpen(true)} />
            <Newsletter />
            <WhySipNow />
            <ResponsibleDrinking />
          </>
        )}
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
