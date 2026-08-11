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

  const scrollToQuiz = () => {
    document
      .getElementById("sommelier-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              {!slide.imageOnly && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </>
              )}
            </div>
            {!slide.imageOnly && (
              <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 grid lg:grid-cols-2 items-center gap-16">
                {slide.promotions ? (
                  <div className="lg:col-span-2 grid items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-10">
                    <div className="space-y-5 lg:order-1">
                      <p className="font-label-md text-xs uppercase tracking-[0.28em] text-primary">
                        IN-STORE PROMOTIONS
                      </p>
                      <h1 className="font-display-lg text-4xl leading-[1.1] text-white lg:text-5xl">
                        Exclusive Offers &amp;{" "}
                        <span className="italic text-primary">
                          Special Deals
                        </span>
                      </h1>
                      <p className="font-body-lg text-on-surface-variant leading-relaxed">
                        Discover exclusive in-store offers on selected wines,
                        beers and spirits.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:order-2 lg:gap-5">
                      {slide.promotions.map((product) => (
                        <article
                          className="relative min-h-[210px] overflow-hidden rounded-2xl glass-panel border border-outline-variant/30 p-4 transition-transform duration-300 hover:-translate-y-1 lg:min-h-[250px] lg:p-5"
                          key={product.name}
                        >
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-on-primary">
                            {product.badgeText}
                          </span>
                          <img
                            alt={product.name}
                            className="h-28 w-full object-contain sm:h-36 lg:h-40 xl:h-44"
                            draggable="false"
                            src={product.image}
                          />
                          <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-on-surface lg:text-base">
                            {product.name}
                          </p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-sm font-semibold text-primary lg:text-base">
                              {product.price}
                            </p>
                            {product.originalPrice && (
                              <p className="text-xs text-on-surface-variant line-through lg:text-sm">
                                {product.originalPrice}
                              </p>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : slide.quiz ? (
                  <div className="lg:col-span-2 mx-auto max-w-2xl text-center space-y-7 md:space-y-9">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel border border-primary/40 text-primary">
                      <span className="material-symbols-outlined text-lg">
                        auto_awesome
                      </span>
                      <span className="text-label-sm font-label-sm uppercase tracking-widest">
                        Find Your Perfect Pour
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-white leading-[1.1]">
                        Let Our{" "}
                        <span className="italic text-primary">Sommelier</span>{" "}
                        Guide You.
                      </h1>
                      <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                        Answer four simple questions and discover a selection
                        curated for your taste.
                      </p>
                    </div>
                    <button
                      className="primary-gradient px-12 py-5 rounded-full font-label-md text-label-md shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
                      onClick={scrollToQuiz}
                      type="button"
                    >
                      Start Your Personal Quiz
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        aria-label="Previous hero slide"
        className="hidden md:flex absolute left-3 lg:left-6 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-panel border border-white/10 transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-12 lg:w-12"
        onClick={() => goToSlide(indexRef.current - 1)}
        type="button"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_left
        </span>
      </button>
      <button
        aria-label="Next hero slide"
        className="hidden md:flex absolute right-3 lg:right-6 top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-panel border border-white/10 transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-12 lg:w-12"
        onClick={() => goToSlide(indexRef.current + 1)}
        type="button"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
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
