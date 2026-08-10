import { useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import QuizModal from "./components/QuizModal.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Home from "./pages/Home.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import Profile from "./pages/Profile.jsx";
import ShopAll from "./pages/ShopAll.jsx";
import Cart from "./pages/Cart.jsx";
import { useProducts } from "./hooks/useProducts.js";

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState("home");
  const { products, loading: productsLoading } = useProducts();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Persist cart changes so the cart survives a page refresh.
  useEffect(() => {
    window.localStorage.setItem("sipnow-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Central navigation function used by Navbar and the individual pages.
  const goToPage = (nextPage) => {
    if (nextPage === "login" || nextPage === "signup") {
      setAuthDestination("profile");
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Add a product to the cart. If it already exists, increase its quantity.
  // This is also a good place to add a maximum-per-product rule later.
  const addToCart = (product, quantity = 1) =>
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
        ? current.filter(
            (item) =>
              item.product.name !== productName
          )
        : current.map((item) =>
            item.product.name === productName
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
    );
  };

  const removeFromCart = (productName) => {
    setCartItems((current) =>
      current.filter(
        (item) =>
          item.product.name !== productName
      )
    );
  };

  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    </>
  );
}