import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import StarRating from "./StarRating.jsx";
import { products } from "../data/products.js";

export default function BestSellers({ onAddToCart }) {
  const trackRef = useRef(null);
  const [addedProduct, setAddedProduct] = useState(null);

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

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedProduct(product.name);
    setTimeout(
      () =>
        setAddedProduct((current) =>
          current === product.name ? null : current
        ),
      1200
    );
  };

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
          <div
            className="group glass-panel glow-border shrink-0 snap-start w-[58vw] sm:w-[320px] rounded-2xl p-3 space-y-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            key={product.name}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-high">
              <img
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[1s]"
                src={product.image}
              />
              {product.badgeStyle === "glow" ? (
                <div className="badge-glow absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-sm text-[10px] font-bold uppercase tracking-wide shadow-lg">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {product.icon}
                  </span>
                  {product.badgeText}
                </div>
              ) : (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[9px] uppercase tracking-widest">
                  {product.badgeText}
                </div>
              )}
              <button
                aria-label={`Add ${product.name} to cart`}
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full primary-gradient text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {addedProduct === product.name
                    ? "check"
                    : "add_shopping_cart"}
                </span>
              </button>
            </div>
            <div className="flex justify-between items-start px-1">
              <div className="space-y-0.5">
                <p className="text-on-surface-variant text-[9px] uppercase tracking-[0.2em]">
                  {product.category}
                </p>
                <h4 className="font-headline-md text-sm group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </div>
              <p className="font-headline-md text-sm text-primary">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
