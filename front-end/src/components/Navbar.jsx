import { useEffect, useRef, useState } from "react";
import { useNavMenus, useSiteAssets } from "../hooks/useContent.js";
import { preventNav } from "../utils/links.js";

const HEADING_PAGES = {
  "Shop All": "shop-all",
  "In-Store promotions": "in-store-promotions",
};

const mobileNavLinks = [
  "Offers & Services",
  "Beer & Cider",
  "Premix",
  "Wine",
  "Spirits",
  "Zero %",
  "My Account",
];

function FeaturedPanel({ featured }) {
  if (featured.type === "image-only") {
    return (
      <div className="bg-surface-container-high rounded-xl border overflow-hidden border-primary/20">
        <img
          className="h-full w-full object-cover"
          src={featured.image}
          alt=""
        />
      </div>
    );
  }

  if (featured.type === "icon") {
    return (
      <div className="bg-surface-container-high rounded-xl p-6 border border-primary/20 flex flex-col justify-center items-center text-center">
        <span className="material-symbols-outlined text-primary text-5xl mb-3">
          {featured.icon}
        </span>

        <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">
          {featured.tag}
        </p>

        <p className="text-sm font-semibold">
          {featured.title}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-high rounded-xl p-6 border border-primary/20 relative overflow-hidden group/card">
      <img
        className="rounded-lg mb-4 h-32 w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
        src={featured.image}
        alt=""
      />

      <p className="text-[10px] text-primary uppercase font-bold tracking-tighter mb-1">
        {featured.tag}
      </p>

      <p className="text-sm font-semibold">
        {featured.title}
      </p>
    </div>
  );
}

function SearchResults({ results, searched, onSelect }) {
  if (!searched) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-panel border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden z-20">
      {results.length === 0 ? (
        <p className="px-6 py-5 text-sm text-on-surface-variant">
          No products match your search.
        </p>
      ) : (
        <ul className="max-h-96 overflow-y-auto scrollbar-hide">
          {results.map((product) => (
            <li key={product.name}>
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-primary/10 transition-colors"
                onClick={() => onSelect(product)}
                type="button"
              >
                <span className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-high shrink-0">
                  <img
                    alt=""
                    className="w-full h-full object-contain"
                    src={product.image}
                  />
                </span>

                <span className="flex-grow min-w-0">
                  <span className="block text-base leading-snug line-clamp-2">
                    {product.name}
                  </span>

                  <span className="block text-xs text-on-surface-variant uppercase tracking-widest mt-1">
                    {product.category}
                  </span>
                </span>

                <span className="text-primary text-base font-headline-md shrink-0">
                  {product.price}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar({
  cartCount = 0,
  onNavigate,
  products = [],
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  const { data: navMenus } = useNavMenus();
  const { data: siteAssets } = useSiteAssets();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(blurTimeoutRef.current);
  }, []);

  const normalizedTerm = searchTerm.trim().toLowerCase();

  const searchResults = normalizedTerm
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedTerm) ||
            product.category.toLowerCase().includes(normalizedTerm)
        )
        .slice(0, 6)
    : [];

  const handleSearchFocus = () => {
    clearTimeout(blurTimeoutRef.current);
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    blurTimeoutRef.current = setTimeout(
      () => setSearchFocused(false),
      150
    );
  };

  const handleSelectResult = () => {
    clearTimeout(blurTimeoutRef.current);

    setSearchFocused(false);
    setSearchTerm("");
    setMobileOpen(false);

    onNavigate?.("home");

    requestAnimationFrame(() => {
      document
        .getElementById("best-sellers")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  const focusSearch = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      desktopSearchRef.current?.focus();
    } else {
      setMobileOpen(true);

      setTimeout(() => {
        mobileSearchRef.current?.focus();
      }, 300);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ZERO % NAVIGATION
  const handleZeroNavigation = (e, item) => {
    e.preventDefault();

    const itemName = item.toLowerCase();

    // ZERO % WINE
    if (itemName.includes("wine")) {
      onNavigate?.("zero-wine");
      return;
    }

    // ZERO % BEER
    if (itemName.includes("beer")) {
      onNavigate?.("zero-beer");
      return;
    }

    // ZERO % SPIRITS
    if (
      itemName.includes("spirit") ||
      itemName.includes("spirits")
    ) {
      onNavigate?.("zero-spirits");
      return;
    }

    // ZERO % PREMIX
    if (itemName.includes("premix")) {
      onNavigate?.("zero-premix");
      return;
    }

    // ZERO % CIDER
    if (itemName.includes("cider")) {
      onNavigate?.("zero-cider");
      return;
    }

    preventNav(e);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[60] transition-all duration-500 bg-surface border-b border-primary/40 ${
        scrolled
          ? "py-3 shadow-lg shadow-black/30"
          : "py-5"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center relative">

        {/* LOGO + NAVIGATION */}
        <div className="flex items-center gap-10">

          <a
            className="relative z-10"
            href="#"
            onClick={scrollToTop}
          >
            <img
              alt="SipNow Logo"
              className="h-8 md:h-10 object-contain brightness-110"
              src={siteAssets.LOGO_URL}
            />
          </a>

          <div className="hidden lg:flex items-center gap-5">

            {navMenus.map((menu) => {
              const isZeroMenu =
                menu.label.toLowerCase().includes("zero");

              return (
                <div
                  className="nav-item group py-2"
                  key={menu.label}
                >

                  {/* MENU TITLE */}
                  <button
                    type="button"
                    className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors tracking-wide whitespace-nowrap"
                  >
                    {menu.label === "ZERO%*"
                      ? "Zero %"
                      : menu.label}

                    <span className="material-symbols-outlined text-[18px] opacity-50 group-hover:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </button>

                  {/* MEGA MENU */}
                  <div className="mega-menu absolute left-margin-desktop right-margin-desktop top-[100%] pt-4">

                    <div className="mega-menu-panel glass-panel border border-outline-variant/30 rounded-2xl p-10 grid grid-cols-4 gap-12 shadow-2xl">

                      {menu.columns.map((col) =>
                        col.items?.length > 0 ? (
                          <div
                            className="space-y-3"
                            key={col.heading}
                          >

                            <h4 className="font-headline-sm text-lg text-primary">
                              {col.heading}
                            </h4>

                            <ul className="space-y-3 text-sm text-on-surface-variant">

                              {col.items.map((item) => (
                                <li key={item}>

                                  <a
                                    className="hover:text-primary transition-colors"
                                    href="#"
                                    onClick={(e) => {
                                      if (isZeroMenu) {
                                        handleZeroNavigation(
                                          e,
                                          item
                                        );
                                      } else {
                                        preventNav(e);
                                      }
                                    }}
                                  >
                                    {item}
                                  </a>

                                </li>
                              ))}

                            </ul>
                          </div>
                        ) : (
                          <div
                            className="space-y-3"
                            key={col.heading}
                          >

                            <a
                              className="font-headline-sm text-lg text-primary hover:opacity-80 transition-opacity"
                              href="#"
                              onClick={
                                HEADING_PAGES[col.heading]
                                  ? (e) => {
                                      e.preventDefault();

                                      onNavigate?.(
                                        HEADING_PAGES[
                                          col.heading
                                        ]
                                      );
                                    }
                                  : preventNav
                              }
                            >
                              {col.heading}
                            </a>

                          </div>
                        )
                      )}

                      {menu.featured && (
                        <FeaturedPanel
                          featured={menu.featured}
                        />
                      )}

                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 md:gap-7 relative z-10 ml-auto">

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-col relative">

            <div className="flex items-center border-b border-outline-variant/30 py-1">

              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                search
              </span>

              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-52 placeholder:text-on-surface-variant/50"
                onBlur={handleSearchBlur}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                onFocus={handleSearchFocus}
                placeholder="Search our cellar..."
                ref={desktopSearchRef}
                type="text"
                value={searchTerm}
              />

            </div>

            <SearchResults
              onSelect={handleSelectResult}
              results={searchResults}
              searched={
                searchFocused &&
                normalizedTerm.length > 0
              }
            />

          </div>

          {/* SEARCH BUTTON */}
          <button
            type="button"
            className="material-symbols-outlined hover:text-primary transition-colors"
            onClick={focusSearch}
          >
            search
          </button>

          {/* CART */}
          <button
            aria-label={
              cartCount > 0
                ? `Cart, ${cartCount} items`
                : "Cart"
            }
            className="relative material-symbols-outlined hover:text-primary transition-colors"
            onClick={() => onNavigate?.("cart")}
            type="button"
          >
            shopping_bag

            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-on-primary text-[10px] font-bold leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* ACCOUNT */}
          <button
            type="button"
            className="hidden sm:inline material-symbols-outlined hover:text-primary transition-colors"
          >
            person
          </button>

          {/* MOBILE MENU */}
          <button
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="material-symbols-outlined lg:hidden hover:text-primary transition-colors"
            onClick={() =>
              setMobileOpen((open) => !open)
            }
            type="button"
          >
            {mobileOpen ? "close" : "menu"}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`mobile-nav-panel lg:hidden ${
          mobileOpen ? "open" : ""
        }`}
        id="mobile-nav-panel"
      >

        <div className="glass-panel border-t border-outline-variant/20 px-margin-mobile py-6 space-y-6">

          {mobileNavLinks.map((link) => (
            <a
              className="block font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors tracking-wide"
              href="#"
              key={link}
              onClick={(e) => {
                if (link === "Zero %") {
                  e.preventDefault();
                  return;
                }

                preventNav(e);
              }}
            >
              {link}
            </a>
          ))}

          {/* MOBILE SEARCH */}
          <div className="relative">

            <div className="flex items-center gap-2 border-b border-outline-variant/30 py-2">

              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                search
              </span>

              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50"
                onBlur={handleSearchBlur}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                onFocus={handleSearchFocus}
                placeholder="Search our cellar..."
                ref={mobileSearchRef}
                type="text"
                value={searchTerm}
              />

            </div>

            <SearchResults
              onSelect={handleSelectResult}
              results={searchResults}
              searched={
                searchFocused &&
                normalizedTerm.length > 0
              }
            />

          </div>

        </div>
      </div>
    </nav>
  );
}