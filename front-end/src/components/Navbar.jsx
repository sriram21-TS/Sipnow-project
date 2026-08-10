import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useNavMenus,
  useSiteAssets,
} from "../hooks/useContent.js";

// ========================================
// TOP LEVEL ROUTES
// ========================================

const TOP_LEVEL_ROUTES = {
  "Offers & Services": "/offers",
  "Beer & Cider": "/beer-cider",
  Premix: "/premix",
  Spirits: "/spirits",
  Wine: "/wine",
  "Shop All": "/shop-all",
  "In-Store promotions": "/in-store-promotions",
};

// ========================================
// MOBILE NAV LINKS
// ========================================

const mobileNavLinks = [
  "Offers & Services",
  "Beer & Cider",
  "Premix",
  "Wine",
  "Spirits",
  "My Account",
];

// ========================================
// SLUGIFY
// ========================================

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ========================================
// GET MENU ITEM ROUTE
// ========================================

function getMenuItemRoute(
  menuLabel,
  columnHeading,
  item
) {
  const columnSlug = slugify(columnHeading);
  const itemSlug = slugify(item);

  // ======================================
  // OFFERS & SERVICES
  // ======================================

  if (menuLabel === "Offers & Services") {
    switch (item.toLowerCase().trim()) {
      case "shop all":
        return "/shop-all";

      case "in-store promotions":
        return "/in-store-promotions";

      case "general promotions":
        return "/offers/general-promotions";

      case "gift cards":
        return "/offers/gift-cards";

      case "members":
        return "/offers/members";

      case "clearance":
        return "/offers/clearance";

      default:
        return `/offers/${itemSlug}`;
    }
  }

  // ======================================
  // SPIRITS
  // ======================================

  if (menuLabel === "Spirits") {
    if (columnSlug === "spirits") {
      switch (item.toLowerCase().trim()) {
        case "gin":
          return "/spirits/gin";

        case "rum":
          return "/spirits/rum";

        case "vodka":
          return "/spirits/vodka";

        case "bourbon":
          return "/spirits/bourbon";

        case "tequila":
        case "tequilla":
          return "/spirits/tequilla";

        case "liqueurs":
        case "liquerus":
          return "/spirits/liquerus";

        case "brandy & cognac":
          return "/spirits/brandy-and-cognac";

        case "other spirits":
          return "/spirits/other-spirits";

        default:
          return `/spirits/${itemSlug}`;
      }
    }

    if (columnSlug === "whisky") {
      return `/spirits/whisky/${itemSlug}`;
    }

    return `/spirits/${itemSlug}`;
  }

  // ======================================
  // BEER & CIDER
  // ======================================

  if (menuLabel === "Beer & Cider") {
    return `/beer-cider/${itemSlug}`;
  }

  // ======================================
  // PREMIX
  // ======================================

  if (menuLabel === "Premix") {
    return `/premix/${itemSlug}`;
  }

  // ======================================
  // WINE
  // ======================================

  if (menuLabel === "Wine") {
    return `/wine/${itemSlug}`;
  }

  // ======================================
  // DEFAULT
  // ======================================

  return `/${slugify(menuLabel)}/${itemSlug}`;
}

// ========================================
// FEATURED PANEL
// ========================================

function FeaturedPanel({ featured }) {
  if (!featured) {
    return null;
  }

  // Image only
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

  // Icon panel
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

  // Image + text panel
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

// ========================================
// SEARCH RESULTS
// ========================================

function SearchResults({
  results,
  searched,
  onSelect,
}) {
  if (!searched) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 w-[420px] glass-panel border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden z-50">
      {results.length === 0 ? (
        <p className="px-6 py-5 text-sm text-on-surface-variant">
          No products match your search.
        </p>
      ) : (
        <ul className="max-h-96 overflow-y-auto scrollbar-hide">
          {results.map((product) => (
            <li key={product.name}>
              <button
                type="button"
                onClick={() => onSelect(product)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-primary/10 transition-colors"
              >
                {/* PRODUCT IMAGE */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high shrink-0 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">
                    {product.name}
                  </p>

                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1 truncate">
                    {product.category}
                  </p>
                </div>

                {/* PRICE */}
                <div className="shrink-0 text-right">
                  <p className="text-primary text-sm font-semibold whitespace-nowrap">
                    {product.price}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ========================================
// NAVBAR
// ========================================

export default function Navbar({
  cartCount = 0,
  onNavigate,
  products = [],
}) {
  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchFocused, setSearchFocused] = useState(false);

  const desktopSearchRef = useRef(null);

  const mobileSearchRef = useRef(null);

  const blurTimeoutRef = useRef(null);

  const location = useLocation();

  const {
    data: navMenus = [],
  } = useNavMenus();

  const {
    data: siteAssets = {},
  } = useSiteAssets();

  // ========================================
  // CLOSE MENU WHEN ROUTE CHANGES
  // ========================================

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // ========================================
  // SCROLL
  // ========================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ========================================
  // CLEANUP
  // ========================================

  useEffect(() => {
    return () => {
      clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  // ========================================
  // SEARCH
  // ========================================

  const normalizedTerm =
    searchTerm.trim().toLowerCase();

  const searchResults = normalizedTerm
    ? products
        .filter((product) => {
          const name =
            product.name?.toLowerCase() || "";

          const category =
            product.category?.toLowerCase() || "";

          return (
            name.includes(normalizedTerm) ||
            category.includes(normalizedTerm)
          );
        })
        .slice(0, 6)
    : [];

  // ========================================
  // SEARCH FOCUS
  // ========================================

  const handleSearchFocus = () => {
    clearTimeout(blurTimeoutRef.current);

    setSearchFocused(true);
  };

  // ========================================
  // SEARCH BLUR
  // ========================================

  const handleSearchBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setSearchFocused(false);
    }, 150);
  };

  // ========================================
  // SEARCH RESULT
  // ========================================

  const handleSelectResult = () => {
    clearTimeout(blurTimeoutRef.current);

    setSearchFocused(false);
    setSearchTerm("");
    setMobileOpen(false);
    setOpenMenu(null);

    onNavigate?.("/");

    requestAnimationFrame(() => {
      document
        .getElementById("best-sellers")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  // ========================================
  // SEARCH ICON
  // ========================================

  const focusSearch = () => {
    if (
      window.matchMedia("(min-width: 768px)").matches
    ) {
      desktopSearchRef.current?.focus();
    } else {
      setMobileOpen(true);

      setTimeout(() => {
        mobileSearchRef.current?.focus();
      }, 300);
    }
  };

  // ========================================
  // CLOSE MENUS
  // ========================================

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // ========================================
  // HANDLE CHILD NAVIGATION
  // ========================================

  const handleChildNavigation = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <nav
      className={`fixed top-0 w-full z-[60] transition-all duration-500 bg-surface border-b border-primary/40 ${
        scrolled
          ? "py-3 shadow-lg shadow-black/30"
          : "py-5"
      }`}
    >
      {/* NAVBAR CONTAINER */}

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center relative">

        {/* LOGO + NAV */}

        <div className="flex items-center gap-16">

          {/* LOGO */}

          <Link
            to="/"
            className="relative z-10"
            onClick={closeMenus}
          >
            <img
              alt="SipNow Logo"
              className="h-8 md:h-10 object-contain brightness-110"
              src={siteAssets.LOGO_URL}
            />
          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden lg:flex gap-10">

            {navMenus.map((menu) => (
              <div
                className="nav-item py-2"
                key={menu.label}
                onMouseEnter={() => {
                  setOpenMenu(menu.label);
                }}
              >

                {/* TOP LEVEL LINK */}

                <Link
                  to={
                    TOP_LEVEL_ROUTES[
                      menu.label
                    ] ||
                    `/${slugify(menu.label)}`
                  }
                  className={`flex items-center gap-1.5 font-label-md text-label-md transition-colors tracking-wide ${
                    openMenu === menu.label
                      ? "text-primary"
                      : "text-on-surface/80 hover:text-primary"
                  }`}
                  onClick={() => {
                    setOpenMenu(null);
                  }}
                >
                  {menu.label}

                  <span
                    className={`material-symbols-outlined text-[18px] opacity-50 transition-transform ${
                      openMenu === menu.label
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    expand_more
                  </span>
                </Link>

                {/* MEGA MENU */}

                {openMenu === menu.label && (
                  <div className="mega-menu mega-menu-open absolute left-0 right-0 top-[100%] pt-4">

                    <div className="mega-menu-panel glass-panel border border-outline-variant/30 rounded-2xl p-10 grid grid-cols-4 gap-12 shadow-2xl">

                      {/* MENU COLUMNS */}

                      {menu.columns.map((col) => {

                        if (col.items?.length > 0) {
                          return (
                            <div
                              className="space-y-3"
                              key={col.heading}
                            >

                              {/* COLUMN HEADING */}

                              <Link
                                to={
                                  TOP_LEVEL_ROUTES[
                                    col.heading
                                  ] ||
                                  `/${slugify(
                                    menu.label
                                  )}/${slugify(
                                    col.heading
                                  )}`
                                }
                                className="font-headline-sm text-lg text-primary hover:opacity-80 transition-opacity"
                                onClick={
                                  handleChildNavigation
                                }
                              >
                                {col.heading}
                              </Link>

                              {/* COLUMN ITEMS */}

                              <ul className="space-y-3 text-sm text-on-surface-variant">

                                {col.items.map((item) => {
                                  const route =
                                    getMenuItemRoute(
                                      menu.label,
                                      col.heading,
                                      item
                                    );

                                  return (
                                    <li key={item}>
                                      <Link
                                        to={route}
                                        className="hover:text-primary transition-colors"
                                        onClick={
                                          handleChildNavigation
                                        }
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  );
                                })}

                              </ul>
                            </div>
                          );
                        }

                        {/* COLUMN WITHOUT ITEMS */}

                        return (
                          <div
                            className="space-y-3"
                            key={col.heading}
                          >
                            <Link
                              to={
                                TOP_LEVEL_ROUTES[
                                  col.heading
                                ] ||
                                `/${slugify(
                                  menu.label
                                )}/${slugify(
                                  col.heading
                                )}`
                              }
                              className="font-headline-sm text-lg text-primary hover:opacity-80 transition-opacity"
                              onClick={
                                handleChildNavigation
                              }
                            >
                              {col.heading}
                            </Link>
                          </div>
                        );
                      })}

                      {/* FEATURED PANEL */}

                      {menu.featured && (
                        <FeaturedPanel
                          featured={menu.featured}
                        />
                      )}

                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-5 md:gap-8 relative z-10">

          {/* DESKTOP SEARCH */}

          <div className="hidden md:flex flex-col relative">

            <div className="flex items-center border-b border-outline-variant/30 py-1">

              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                search
              </span>

              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-44 placeholder:text-on-surface-variant/50"
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
            className="material-symbols-outlined hover:text-primary transition-colors"
            onClick={focusSearch}
            type="button"
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
            onClick={() => {
              setOpenMenu(null);
              onNavigate?.("/cart");
            }}
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
            className="hidden sm:inline material-symbols-outlined hover:text-primary transition-colors"
            type="button"
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

          {mobileNavLinks.map((link) => {
            const route =
              TOP_LEVEL_ROUTES[link] ||
              `/${slugify(link)}`;

            return (
              <Link
                className="block font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors tracking-wide"
                to={route}
                key={link}
                onClick={closeMenus}
              >
                {link}
              </Link>
            );
          })}

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