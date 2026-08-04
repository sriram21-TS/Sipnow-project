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

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <AmbientBackground />
      <Navbar cartCount={cartCount} />
      <main className="relative z-10">
        <HeroCarousel />
        <CategoryGrid />
        <BestSellers onAddToCart={() => setCartCount((count) => count + 1)} />
        <NewArrivalsBanner />
        <BrandSpotlight />
        <SommelierCta onStart={() => setQuizOpen(true)} />
        <Newsletter />
        <WhySipNow />
        <ResponsibleDrinking />
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
