import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AmbientBackground from "./components/AmbientBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import QuizModal from "./components/QuizModal.jsx";
import { useProducts } from "./hooks/useProducts.js";

import AgeVerification from "./pages/age-verification.jsx";
import Auth from "./pages/auth.jsx";
import Cart from "./pages/cart.jsx";
import Checkout from "./pages/checkout.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";

// Each of these owns one nav section (Offers & Services, Beer & Cider,
// Premix, Spirits, Whisky, Wine, Zero % Alcohol) and every one of its
// subcategories from a single folder — the URL slug picks the subcategory
// internally instead of needing a dedicated file per subcategory.
import BeerCider from "./pages/beer-cider/Layout.jsx";
import InStorePromotions from "./pages/offers-services/InStorePromotions.jsx";
import OffersServices from "./pages/offers-services/Layout.jsx";
import ShopAll from "./pages/offers-services/ShopAll.jsx";
import Premix from "./pages/premix/Layout.jsx";
import Spirits from "./pages/spirits/Layout.jsx";
import Whisky from "./pages/whisky/Layout.jsx";
import Wine from "./pages/wine/Layout.jsx";
import ZeroAlcohol from "./pages/zero-alcohol/Layout.jsx";

// Safely read JSON data from localStorage. If the key is missing or
// contains invalid JSON, return the provided fallback value.
function readStored(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [ageVerified, setAgeVerified] = useState(() =>
    readStored("sipnow-age-verified", false)
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() =>
    readStored("sipnow-cart", [])
  );
  const [user, setUser] = useState(() => readStored("sipnow-session", null));
  const [authDestination, setAuthDestination] = useState("profile");
  const { products, loading: productsLoading } = useProducts();

  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Persist cart changes so the cart survives a page refresh.
  useEffect(() => {
    window.localStorage.setItem("sipnow-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Home's child components (category cards, in-store-promotions banner)
  // still speak the old "page key" navigation vocabulary; translate it to routes.
  const goToPage = (target) => {
    const path = target.startsWith("category:")
      ? `/${target.slice("category:".length)}`
      : `/${target}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchAuthPage = (nextPage) => {
    navigate(`/${nextPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add a product to the cart. If it already exists, increase its quantity.
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
    switchAuthPage(authDestination);
  };

  // Users must be logged in before they can reach checkout.
  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
      return;
    }
    setAuthDestination("checkout");
    switchAuthPage("signup");
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
    goHome();
  };

  // Confirming age is remembered so returning visitors aren't re-gated.
  const confirmAge = () => {
    window.localStorage.setItem("sipnow-age-verified", JSON.stringify(true));
    setAgeVerified(true);
  };

  // Block the entire site behind the age gate until it's confirmed — this
  // runs like a landing page rather than a modal layered over the site.
  if (!ageVerified) {
    return <AgeVerification onConfirm={confirmAge} />;
  }

  return (
    <>
      <AmbientBackground />
      <Navbar cartCount={cartCount} products={products} user={user} />

      <main className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={addToCart}
                onNavigate={goToPage}
                onStartQuiz={() => setQuizOpen(true)}
                products={products}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                isLoggedIn={Boolean(user)}
                onCheckout={handleCheckout}
                onRemove={removeFromCart}
                onRequireSignUp={handleCheckout}
                onShopAll={() => navigate("/shop-all")}
                onUpdateQuantity={updateCartQuantity}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                onOrderComplete={() => {
                  setCartItems([]);
                  navigate("/profile");
                }}
                user={user}
              />
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile
                  onLogout={logout}
                  onSave={saveProfile}
                  onShopAll={() => navigate("/shop-all")}
                  user={user}
                />
              ) : (
                <Auth
                  mode="login"
                  onAuthenticated={authenticate}
                  onSwitch={switchAuthPage}
                />
              )
            }
          />

          <Route
            path="/login"
            element={
              <Auth
                mode="login"
                onAuthenticated={authenticate}
                onSwitch={switchAuthPage}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Auth
                mode="signup"
                onAuthenticated={authenticate}
                onSwitch={switchAuthPage}
              />
            }
          />

          <Route
            path="/shop-all"
            element={
              <ShopAll
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/in-store-promotions"
            element={
              <InStorePromotions onAddToCart={addToCart} onBack={goHome} />
            }
          />

          {/* Zero % Alcohol Subcategories - Single Unified Component */}
          <Route
            path="/zero-alcohol/:subcategory"
            element={
              <ZeroAlcohol
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero/:subcategory"
            element={
              <ZeroAlcohol
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-alcohol"
            element={
              <ZeroAlcohol
                subcategory="wine"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-wine"
            element={
              <ZeroAlcohol
                subcategory="wine"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-beer"
            element={
              <ZeroAlcohol
                subcategory="beer"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-spirits"
            element={
              <ZeroAlcohol
                subcategory="spirits"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-premix"
            element={
              <ZeroAlcohol
                subcategory="premix"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/zero-cider"
            element={
              <ZeroAlcohol
                subcategory="cider"
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/offers"
            element={
              <OffersServices
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
              />
            }
          />

          <Route
            path="/offers/:categoryKey"
            element={
              <OffersServices
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
              />
            }
          />

          <Route
            path="/beer-cider"
            element={
              <BeerCider
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/beer-cider/:categoryKey"
            element={
              <BeerCider
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/premix"
            element={
              <Premix
                onAddToCart={addToCart}
                products={products}
                productsLoading={productsLoading}
                title="Premix"
              />
            }
          />

          <Route
            path="/premix/:categoryKey"
            element={
              <Premix
                onAddToCart={addToCart}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits"
            element={
              <Spirits
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/:categoryKey"
            element={
              <Spirits
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/whisky"
            element={
              <Whisky
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/whisky/:categoryKey"
            element={
              <Whisky
                onAddToCart={addToCart}
                onBack={goHome}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/wine"
            element={
              <Wine
                onAddToCart={addToCart}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/wine/:wineType"
            element={
              <Wine
                onAddToCart={addToCart}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>

      {!["/login", "/signup"].includes(location.pathname) && <Footer />}

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
