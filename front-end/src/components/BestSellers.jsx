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
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    const amount = card.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetScroll = Math.min(
      Math.max(track.scrollLeft + direction * amount, 0),
      maxScroll
    );

    track.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const bestSellers = products.slice(0, 15);

  return (
    <Reveal
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-28"
      id="best-sellers"
    >
      <div className="mb-16">
        <h2 className="font-display-lg text-4xl">Best Sellers</h2>
      </div>
      <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3">
        <button
          aria-label="Previous best seller"
          className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/40 bg-background text-on-surface shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => scrollByCard(-1)}
          type="button"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_left
          </span>
        </button>

        <div
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide select-none"
          id="bestsellers-track"
          ref={trackRef}
        >
          {bestSellers.map((product) => (
            <div
              className="h-[400px] w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-6rem)/5)]"
              key={product.name}
            >
              <ProductCard
                className="h-full w-full [&>div:first-child]:aspect-auto [&>div:first-child]:h-[12.75rem]"
                isAdded={addedProduct === product.name}
                onAdd={handleAddToCart}
                product={product}
              />
            </div>
          ))}
        </div>

        <button
          aria-label="Next best seller"
          className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/40 bg-background text-on-surface shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => scrollByCard(1)}
          type="button"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>
    </Reveal>
  );
}
