import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import ProductCard from "./ProductCard.jsx";
import { useAddToCartFeedback } from "../hooks/useAddToCartFeedback.js";
import { useInStorePromotions } from "../hooks/useContent.js";

export default function InStorePromotionsPreview({ onAddToCart, onNavigate }) {
  const { data: inStorePromotions = [] } = useInStorePromotions();

  const { addedProduct, handleAddToCart } = useAddToCartFeedback(onAddToCart);

  const trackRef = useRef(null);

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
      if (e.button !== 0) return;

      isDown = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartScroll = track.scrollLeft;

      track.classList.add("dragging");
    };

    const onMouseMove = (e) => {
      if (!isDown) return;

      const delta = e.clientX - dragStartX;

      if (Math.abs(delta) > 3) {
        dragMoved = true;
      }

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
    track.addEventListener("click", onClickCapture, true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mouseleave", endDrag);

    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("click", onClickCapture, true);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("mouseleave", endDrag);
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

    const currentScroll = track.scrollLeft;

    let targetScroll = currentScroll + direction * amount;

    if (targetScroll < 0) {
      targetScroll = 0;
    }

    if (targetScroll > maxScroll) {
      targetScroll = maxScroll;
    }

    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const products = inStorePromotions.slice(0, 15);

  return (
    <Reveal>
      <section className="relative w-full overflow-hidden">
        <div className="mx-auto w-[92%] max-w-[1500px]">
          {/* Section Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-label-md uppercase tracking-[0.28em]">
                Offers & Services
              </p>

              <h2 className="font-display-lg text-4xl">In-Store Promotions</h2>

              <p className="text-on-surface-variant font-body-lg">
                Exclusive offers available at your local SipNow store.
              </p>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="mt-8 grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3 md:mt-10">
            {/* Left Arrow */}
            <button
              type="button"
              aria-label="Previous promotion"
              onClick={() => scrollByCard(-1)}
              className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/40 bg-background text-on-surface shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_left
              </span>
            </button>

            {/* Product Track */}
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide select-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="h-[400px] w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-6rem)/5)]"
                >
                  <ProductCard
                    className="in-store-promotion-card h-full w-full"
                    isAdded={addedProduct === product.name}
                    onAdd={handleAddToCart}
                    product={product}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              aria-label="Next promotion"
              onClick={() => scrollByCard(1)}
              className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/40 bg-background text-on-surface shadow-lg transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>

          {/* View Promotions */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate?.("in-store-promotions")}
              className="inline-flex items-center font-label-md transition-opacity hover:opacity-80"
            >
              View All Promotions →
            </button>
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="mt-8">
              <p>New promotions are on the way. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}
