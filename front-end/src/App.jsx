import { useState } from "react";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import QuizModal from "./components/QuizModal.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import ShopAll from "./pages/ShopAll.jsx";
import Cart from "./pages/Cart.jsx";
import { useProducts } from "./hooks/useProducts.js";
import Pilsner from "./pages/beer-cider/lager/Pilsner.jsx";
import DarkLager from "./pages/beer-cider/lager/DarkLager.jsx";
import Helles from "./pages/beer-cider/lager/Helles.jsx";

import PaleAle from "./pages/beer-cider/ale/PaleAle.jsx";
import IPA from "./pages/beer-cider/ale/IPA.jsx";
import StoutPorter from "./pages/beer-cider/ale/StoutPorter.jsx";

import Apple from "./pages/beer-cider/cider/Apple.jsx";
import Pear from "./pages/beer-cider/cider/Pear.jsx";
import FruitCider from "./pages/beer-cider/cider/FruitCider.jsx";
export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState("home");
  const { products, loading: productsLoading } = useProducts();

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

  return (
    <>
      <AmbientBackground />
      <Navbar cartCount={cartCount} onNavigate={goToPage} products={products} />
      <main className="relative z-10">
                {page === "pilsner" ? (
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
                  ) 
        :page === "cart" ? (
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
