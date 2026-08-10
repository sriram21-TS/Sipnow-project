import { useEffect, useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import QuizModal from "./components/QuizModal.jsx";
import AgeVerification from "./components/AgeVerification.jsx";
import { useProducts } from "./hooks/useProducts.js";
import Pilsner from "./pages/beer-cider/lager/Pilsner.jsx";
import DarkLager from "./pages/beer-cider/lager/DarkLager.jsx";
import Helles from "./pages/beer-cider/lager/Helles.jsx";
import Auth from "./pages/Auth.jsx";
import Cart from "./pages/Cart.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Home from "./pages/Home.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import Profile from "./pages/Profile.jsx";
import ShopAll from "./pages/ShopAll.jsx";
import WineCategory from "./pages/WineCategory.jsx";

// Safely read JSON data from localStorage. If the key is missing or
// contains invalid JSON, return the provided fallback value.
function readStored(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

import PaleAle from "./pages/beer-cider/ale/PaleAle.jsx";
import IPA from "./pages/beer-cider/ale/IPA.jsx";
import StoutPorter from "./pages/beer-cider/ale/StoutPorter.jsx";

import Apple from "./pages/beer-cider/cider/Apple.jsx";
import Pear from "./pages/beer-cider/cider/Pear.jsx";
import FruitCider from "./pages/beer-cider/cider/FruitCider.jsx";
export default function App() {
  const [ageVerified, setAgeVerified] = useState(
    () => localStorage.getItem("sipnow-age-verified") === "true"
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() =>
    readStored("sipnow-cart", [])
  );
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(() => readStored("sipnow-session", null));
  const [authDestination, setAuthDestination] = useState("profile");
  const { products, loading: productsLoading } = useProducts();
  // Total number of individual items currently in the cart.
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/health`)
      .then((res) => setBackendStatus(res.ok ? "connected" : "offline"))
      .catch(() => setBackendStatus("offline"));
  }, []);
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
      return existing
        ? current.map((item) =>
            item.product.name === product.name
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...current, { product, quantity }];
    });
  // Update cart quantity. Quantity 0 or below removes the product.
  // Change this function if you want minimum/maximum quantity validation.
  const updateCartQuantity = (productName, quantity) =>
    setCartItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product.name !== productName)
        : current.map((item) =>
            item.product.name === productName ? { ...item, quantity } : item
          )
    );
  const removeFromCart = (productName) =>
    setCartItems((current) =>
      current.filter((item) => item.product.name !== productName)
    );
  // Save the authenticated session without storing the password in App state.
  const authenticate = (nextUser) => {
    setUser({
      name: nextUser.name,
      email: nextUser.email,
      mobile: nextUser.mobile,
    });
    goToPage(authDestination);
  };
  // Users must be logged in before they can reach checkout.
  const handleCheckout = () => {
    if (user) {
      goToPage("checkout");
      return;
    }
    setAuthDestination("checkout");
    setPage("signup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Merge profile changes into the stored demo user and active session.
  const saveProfile = (updatedUser) => {
    const savedUser = readStored("sipnow-user", {});
    const nextUser = { ...savedUser, ...updatedUser };
    window.localStorage.setItem("sipnow-user", JSON.stringify(nextUser));
    window.localStorage.setItem("sipnow-session", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  // End the current demo session and return to the home page.
  const logout = () => {
    window.localStorage.removeItem("sipnow-session");
    setUser(null);
    goToPage("home");
  };

  // Decide which page component should be rendered based on the current page key.
  const content =
    page === "pilsner" ? (
      <Pilsner
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "dark-lager" ? (
      <DarkLager
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "helles" ? (
      <Helles
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "pale-ale" ? (
      <PaleAle
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "ipa" ? (
      <IPA
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "stout-porter" ? (
      <StoutPorter
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "apple-cider" ? (
      <Apple
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "pear-cider" ? (
      <Pear
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "fruit-cider" ? (
      <FruitCider
        onAddToCart={addToCart}
        onBack={() => goToPage("home")}
        products={products}
        productsLoading={productsLoading}
      />
    ) : page === "cart" ? (
      <Cart
        cartItems={cartItems}
        isLoggedIn={Boolean(user)}
        onCheckout={handleCheckout}
        onRemove={removeFromCart}
        onRequireSignUp={handleCheckout}
        onShopAll={() => goToPage("shop-all")}
        onUpdateQuantity={updateCartQuantity}
      />
    ) : page === "checkout" ? (
      <Checkout
        cartItems={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
          goToPage("profile");
        }}
        user={user}
      />
    ) : page === "profile" && user ? (
      <Profile
        onLogout={logout}
        onSave={saveProfile}
        onShopAll={() => goToPage("shop-all")}
        user={user}
      />
    ) : page === "login" || page === "signup" ? (
      <Auth
        mode={page}
        onAuthenticated={authenticate}
        onSwitch={(nextPage) => {
          setPage(nextPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
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
      <WineCategory
        category={page.slice("wine:".length)}
        onBack={() => goToPage("home")}
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
    );

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
      <Navbar
        cartCount={cartCount}
        onNavigate={goToPage}
        products={products}
        user={user}
      />
      <main className="relative z-10">{content}</main>
      {!["login", "signup"].includes(page) && <Footer />}
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
