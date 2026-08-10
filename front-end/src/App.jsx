import { useEffect, useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import QuizModal from "./components/QuizModal.jsx";
import AgeVerification from "./components/AgeVerification.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import ShopAll from "./pages/ShopAll.jsx";
import Cart from "./pages/Cart.jsx";
import { useProducts } from "./hooks/useProducts.js";
import WineSubcategoryPage from "./pages/wine/WineSubcategoryPage.jsx";

export default function App() {
  const [ageVerified, setAgeVerified] = useState(
    () => localStorage.getItem("sipnow-age-verified") === "true"
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState("home");
  const { products, loading: productsLoading } = useProducts();
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/health`)
      .then((res) => setBackendStatus(res.ok ? "connected" : "offline"))
      .catch(() => setBackendStatus("offline"));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.product.name === product.name
      );
      if (existing) {
        return current.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { product, quantity }];
    });
  };

  const updateCartQuantity = (productName, quantity) => {
    setCartItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product.name !== productName)
        : current.map((item) =>
            item.product.name === productName ? { ...item, quantity } : item
          )
    );
  };

  const removeFromCart = (productName) => {
    setCartItems((current) =>
      current.filter((item) => item.product.name !== productName)
    );
  };

  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmAge = () => {
    localStorage.setItem("sipnow-age-verified", "true");
    setAgeVerified(true);
  };

  if (!ageVerified) {
    return <AgeVerification onConfirm={confirmAge} />;
  }

  return (
    <>
      <AmbientBackground />
      <Navbar cartCount={cartCount} onNavigate={goToPage} products={products} />
      <main className="relative z-10">
        {page === "cart" ? (
          <Cart
            cartItems={cartItems}
            onBack={() => goToPage("home")}
            onRemove={removeFromCart}
            onShopAll={() => goToPage("shop-all")}
            onUpdateQuantity={updateCartQuantity}
          />
        ) : page === "in-store-promotions" ? (
          <InStorePromotions
            onAddToCart={addToCart}
            onBack={() => goToPage("home")}
          />
        ) : page === "shop-all" ? (
          <ShopAll
            onAddToCart={addToCart}
            onBack={() => goToPage("home")}
            products={products}
            productsLoading={productsLoading}
          />
          ) : page.startsWith("wine:") ? (
  <WineSubcategoryPage
    wineType={page.slice("wine:".length)}
    onAddToCart={addToCart}
    onBack={() => goToPage("home")}
    products={products}
  />
        ) : page.startsWith("category:") ? (
          <CategoryPage
            categoryKey={page.slice("category:".length)}
            onAddToCart={addToCart}
            onBack={() => goToPage("home")}
            products={products}
          />
        ) : (
          <Home
            onNavigate={goToPage}
            onAddToCart={addToCart}
            onStartQuiz={() => setQuizOpen(true)}
            products={products}
          />
        )}
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      {import.meta.env.DEV && (
        <div
          className={`fixed bottom-3 right-3 z-50 rounded-full px-3 py-1 text-xs font-medium text-white ${
            backendStatus === "connected"
              ? "bg-green-600"
              : backendStatus === "offline"
                ? "bg-red-600"
                : "bg-gray-500"
          }`}
        >
          Backend: {backendStatus}
        </div>
      )}
    </>
  );
}
