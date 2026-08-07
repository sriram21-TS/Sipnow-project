import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import ProductCard from "./ProductCard.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";

export default function BestSellers({ onAddToCart, products = [] }) {
  const trackRef = useRef(null);
  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragMoved = false;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    };

    const onMouseDown = (e) => {
      isDown = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartScroll = track.scrollLeft;
      track.classList.add("dragging");
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      const delta = e.clientX - dragStartX;
      if (Math.abs(delta) > 3) dragMoved = true;
      track.scrollLeft = dragStartScroll - delta;
    };

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("dragging");
    };

    const onClickCapture = (e) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        dragMoved = false;
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mouseleave", endDrag);
    track.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("mouseleave", endDrag);
      track.removeEventListener("click", onClickCapture, { capture: true });
    };
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(":scope > div");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    const amount = card ? card.offsetWidth + gap : track.offsetWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <Reveal
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-28"
      id="best-sellers"
    >
      <div className="flex justify-between items-end mb-16">
        <h2 className="font-display-lg text-4xl">Best Sellers</h2>
        <div className="flex gap-4">
          <button
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary transition-all duration-300"
            onClick={() => scrollByCard(-1)}
          >
            <span className="material-symbols-outlined">west</span>
          </button>
          <button
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary transition-all duration-300"
            onClick={() => scrollByCard(1)}
          >
            <span className="material-symbols-outlined">east</span>
          </button>
        </div>
      </div>
      <div
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-proximity scrollbar-hide pb-2 -mx-margin-mobile px-margin-mobile md:-mx-margin-desktop md:px-margin-desktop"
        id="bestsellers-track"
        ref={trackRef}
      >
        {products.map((product) => (
          <ProductCard
            className="shrink-0 snap-start w-[var(--card-min-width)]"
            isAdded={addedProduct === product.name}
            key={product.name}
            onAdd={handleAddToCart}
            product={product}
          />
        ))}
      </div>
    </Reveal>
  );
}
