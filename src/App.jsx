import { useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import QuizModal from "./components/QuizModal.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import ShopAll from "./pages/ShopAll.jsx";

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
        ) : page === "shop-all" ? (
          <ShopAll onAddToCart={addToCart} onBack={() => goToPage("home")} />
        ) : page.startsWith("category:") ? (
          <CategoryPage
            categoryKey={page.slice("category:".length)}
            onAddToCart={addToCart}
            onBack={() => goToPage("home")}
          />
        ) : (
          <Home
            onNavigate={goToPage}
            onAddToCart={addToCart}
            onStartQuiz={() => setQuizOpen(true)}
          />
        )}
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
