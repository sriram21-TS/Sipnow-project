import { useEffect, useRef, useState } from "react";
import { useHeroSlides } from "../hooks/useContent.js";

export default function HeroCarousel() {
  const { data: heroSlides } = useHeroSlides();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const autoplayRef = useRef(null);
  const drag = useRef({
    isDragging: false,
    startX: 0,
    prevTranslate: 0,
    currentTranslate: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const setTrackPosition = (withTransition) => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    track.classList.toggle("dragging", !withTransition);
    track.style.transform = `translateX(-${indexRef.current * section.offsetWidth}px)`;
  };

  const restartAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(
      () => goToSlide(indexRef.current + 1),
      4000
    );
  };

  const goToSlide = (index) => {
    const next = (index + heroSlides.length) % heroSlides.length;
    indexRef.current = next;
    setCurrentIndex(next);
    setTrackPosition(true);
    restartAutoplay();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || heroSlides.length === 0) return;

    const dragStart = (e) => {
      drag.current.isDragging = true;
      drag.current.startX = e.type.includes("touch")
        ? e.touches[0].clientX
        : e.clientX;
      drag.current.prevTranslate = -indexRef.current * section.offsetWidth;
      track.classList.add("dragging");
      clearInterval(autoplayRef.current);
    };

    const dragMove = (e) => {
      if (!drag.current.isDragging) return;
      const x = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      drag.current.currentTranslate =
        drag.current.prevTranslate + (x - drag.current.startX);
      track.style.transform = `translateX(${drag.current.currentTranslate}px)`;
    };

    const dragEnd = () => {
      if (!drag.current.isDragging) return;
      drag.current.isDragging = false;
      track.classList.remove("dragging");
      const movedBy =
        drag.current.currentTranslate - drag.current.prevTranslate;
      let next = indexRef.current;
      if (movedBy < -80 && indexRef.current < heroSlides.length - 1) next++;
      else if (movedBy > 80 && indexRef.current > 0) next--;
      goToSlide(next);
    };

    const handleResize = () => setTrackPosition(true);
    const pauseAutoplay = () => clearInterval(autoplayRef.current);

    track.addEventListener("mousedown", dragStart);
    track.addEventListener("touchstart", dragStart, { passive: true });
    window.addEventListener("mousemove", dragMove);
    window.addEventListener("touchmove", dragMove, { passive: true });
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("resize", handleResize);
    section.addEventListener("mouseenter", pauseAutoplay);
    section.addEventListener("mouseleave", restartAutoplay);

    setTrackPosition(true);
    restartAutoplay();

    return () => {
      track.removeEventListener("mousedown", dragStart);
      track.removeEventListener("touchstart", dragStart);
      window.removeEventListener("mousemove", dragMove);
      window.removeEventListener("touchmove", dragMove);
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("touchend", dragEnd);
      window.removeEventListener("resize", handleResize);
      section.removeEventListener("mouseenter", pauseAutoplay);
      section.removeEventListener("mouseleave", restartAutoplay);
      clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroSlides.length]);

  return (
    <section
      className="full-bleed-hero relative overflow-hidden"
      id="hero-carousel"
      ref={sectionRef}
    >
      <div className="hero-track flex h-full w-full" ref={trackRef}>
        {heroSlides.map((slide, i) => (
          <div
            className={`hero-slide relative w-full h-full flex items-center overflow-hidden ${
              i === currentIndex ? "is-active" : ""
            }`}
            data-index={i}
            key={slide.card.title}
          >
            <div className="absolute inset-0 z-0">
              <img
                alt={slide.bgAlt}
                className="w-full h-full object-cover scale-105"
                draggable="false"
                src={slide.bgImage}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 grid lg:grid-cols-2 items-center gap-16">
              <div className="space-y-6 md:space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel border border-primary/40 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="text-label-sm font-label-sm uppercase tracking-widest">
                    {slide.badge}
                  </span>
                </div>
                <div className="space-y-4">
                  <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-white leading-[1.1]">
                    {slide.titleLines[0]} <br />
                    <span className="italic text-primary">
                      {slide.titleLines[1]}
                    </span>
                  </h1>
                  <p className="font-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                    {slide.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-5">
                  <button className="primary-gradient px-12 py-5 rounded-full font-label-md text-label-md shadow-2xl shadow-primary/30 hover:scale-105 transition-transform">
                    {slide.primaryCta}
                  </button>
                  <button className="glass-panel border border-outline-variant/30 px-10 py-5 rounded-full font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                    {slide.secondaryCta}
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative group max-w-[380px] mx-auto">
                  <div className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative glass-panel rounded-3xl p-4 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover"
                        draggable="false"
                        src={slide.card.image}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">
                          {slide.card.tag}
                        </p>
                        <h3 className="font-headline-sm text-white">
                          {slide.card.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full glass-panel border border-white/10 items-center justify-center hover:bg-primary transition-colors"
        onClick={() => goToSlide(indexRef.current - 1)}
      >
        <span className="material-symbols-outlined">west</span>
      </button>
      <button
        className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full glass-panel border border-white/10 items-center justify-center hover:bg-primary transition-colors"
        onClick={() => goToSlide(indexRef.current + 1)}
      >
        <span className="material-symbols-outlined">east</span>
      </button>
      <div className="absolute bottom-8 md:bottom-12 right-margin-mobile md:right-margin-desktop z-20 flex items-center gap-3">
        {heroSlides.map((slide, i) => (
          <button
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-dot ${i === currentIndex ? "active" : ""}`}
            key={slide.card.title}
            onClick={() => goToSlide(i)}
          ></button>
        ))}
      </div>
    </section>
  );
}
