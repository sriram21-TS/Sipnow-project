import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AmbientBackground from "./components/AmbientBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import QuizModal from "./components/QuizModal.jsx";

import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import InStorePromotions from "./pages/InStorePromotions.jsx";
import ShopAll from "./pages/ShopAll.jsx";
import Cart from "./pages/Cart.jsx";

import GeneralPromotions from "./pages/GeneralPromotions.jsx";
import GiftCards from "./pages/GiftCards.jsx";
import Members from "./pages/Members.jsx";
import Clearance from "./pages/Clearance.jsx";

import Gin from "./pages/Gin.jsx";
import Rum from "./pages/Rum.jsx";
import Vodka from "./pages/Vodka.jsx";
import Bourbon from "./pages/Bourbon.jsx";
import Tequilla from "./pages/Tequilla.jsx";
import Liquerus from "./pages/Liquerus.jsx";
import BrandyAndCognac from "./pages/BrandyAndCognac.jsx";
import OtherSpirits from "./pages/OtherSpirits.jsx";

import { useProducts } from "./hooks/useProducts.js";

export default function App() {
  const navigate = useNavigate();

  const [quizOpen, setQuizOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const {
    products,
    loading: productsLoading,
  } = useProducts();

  // =========================================
  // CART COUNT
  // =========================================

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = (product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.product.name === product.name
      );

      if (existing) {
        return current.map((item) =>
          item.product.name === product.name
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity,
        },
      ];
    });
  };

  // =========================================
  // UPDATE CART QUANTITY
  // =========================================

  const updateCartQuantity = (
    productName,
    quantity
  ) => {
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

  // =========================================
  // REMOVE FROM CART
  // =========================================

  const removeFromCart = (productName) => {
    setCartItems((current) =>
      current.filter(
        (item) =>
          item.product.name !== productName
      )
    );
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const goToPage = (path) => {
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AmbientBackground />

      <Navbar
        cartCount={cartCount}
        onNavigate={goToPage}
        products={products}
      />

      <main className="relative z-10">

        <Routes>

          {/* =================================
              HOME
          ================================= */}

          <Route
            path="/"
            element={
              <Home
                onNavigate={goToPage}
                onAddToCart={addToCart}
                onStartQuiz={() =>
                  setQuizOpen(true)
                }
                products={products}
              />
            }
          />

          {/* =================================
              SHOP ALL
          ================================= */}

          <Route
            path="/shop-all"
            element={
              <ShopAll
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          {/* =================================
              IN-STORE PROMOTIONS
          ================================= */}

          <Route
            path="/in-store-promotions"
            element={
              <InStorePromotions
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
              />
            }
          />

          {/* =================================
              CART
          ================================= */}

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onBack={() => goToPage("/")}
                onRemove={removeFromCart}
                onShopAll={() =>
                  goToPage("/shop-all")
                }
                onUpdateQuantity={
                  updateCartQuantity
                }
              />
            }
          />

          {/* =================================
              OFFERS & SERVICES
              GENERAL PROMOTIONS
          ================================= */}

          {/* =================================
              GENERAL PROMOTIONS
          ================================= */}

          <Route
            path="/offers/general-promotions"
            element={
              <GeneralPromotions
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              GIFT CARDS
          ================================= */}

          <Route
            path="/offers/gift-cards"
            element={
              <GiftCards
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              MEMBERS
          ================================= */}

          <Route
            path="/offers/members"
            element={
              <Members
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              CLEARANCE
          ================================= */}

          <Route
            path="/offers/clearance"
            element={
              <Clearance
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              OFFERS MAIN PAGE
          ================================= */}

          <Route
            path="/offers"
            element={
              <CategoryPage
                categoryKey="offers"
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              SPIRITS
          ================================= */}

          <Route
            path="/spirits/gin"
            element={
              <Gin
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/rum"
            element={
              <Rum
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/vodka"
            element={
              <Vodka
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/bourbon"
            element={
              <Bourbon
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/tequilla"
            element={
              <Tequilla
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/liquerus"
            element={
              <Liquerus
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/brandy-and-cognac"
            element={
              <BrandyAndCognac
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          <Route
            path="/spirits/other-spirits"
            element={
              <OtherSpirits
                onAddToCart={addToCart}
                onBack={() =>
                  goToPage("/spirits")
                }
                products={products}
                productsLoading={productsLoading}
              />
            }
          />

          {/* =================================
              GENERIC CATEGORY ROUTE
          ================================= */}

          <Route
            path="/category/:categoryKey"
            element={
              <CategoryPage
                onAddToCart={addToCart}
                onBack={() => goToPage("/")}
                products={products}
              />
            }
          />

          {/* =================================
              FALLBACK
          ================================= */}

          <Route
            path="*"
            element={
              <Home
                onNavigate={goToPage}
                onAddToCart={addToCart}
                onStartQuiz={() =>
                  setQuizOpen(true)
                }
                products={products}
              />
            }
          />

        </Routes>

      </main>

      <Footer />

      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
      />
    </>
  );
}