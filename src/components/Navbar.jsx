import { useEffect, useState } from "react";
import { navMenus, mobileNavLinks } from "../data/navigation.js";
import { LOGO_URL } from "../data/images.js";

function FeaturedPanel({ featured }) {
  if (featured.type === "image-only") {
    return (
      <div className="bg-surface-container-high rounded-xl overflow-hidden border border-primary/20">
        <img className="h-full w-full object-cover" src={featured.image} />
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
        <p className="text-sm font-semibold">{featured.title}</p>
      </div>
    );
  }
  return (
    <div className="bg-surface-container-high rounded-xl p-6 border border-primary/20 relative overflow-hidden group/card">
      <img
        className="rounded-lg mb-4 h-32 w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
        src={featured.image}
      />
      <p className="text-[10px] text-primary uppercase font-bold tracking-tighter mb-1">
        {featured.tag}
      </p>
      <p className="text-sm font-semibold">{featured.title}</p>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[60] transition-all duration-500 bg-surface/60 backdrop-blur-md ${
        scrolled
          ? "glass-panel border-b border-outline-variant/20 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex justify-between items-center relative">
        <div className="flex items-center gap-16">
          <a className="relative z-10" href="#">
            <img
              alt="SipNow Logo"
              className="h-8 md:h-10 object-contain brightness-110"
              src={LOGO_URL}
            />
          </a>
          <div className="hidden lg:flex gap-10">
            {navMenus.map((menu) => (
              <div className="nav-item group py-2" key={menu.label}>
                <button className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors tracking-wide">
                  {menu.label}
                  <span className="material-symbols-outlined text-[18px] opacity-50 group-hover:rotate-180 transition-transform">
                    expand_more
                  </span>
                </button>
                <div className="mega-menu absolute left-margin-desktop right-margin-desktop top-[100%] pt-4">
                  <div className="glass-panel border border-outline-variant/30 rounded-2xl p-10 grid grid-cols-4 gap-12 shadow-2xl">
                    {menu.columns.map((col) => (
                      <div className="space-y-6" key={col.heading}>
                        <h4 className="font-headline-sm text-lg text-primary">
                          {col.heading}
                        </h4>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                          {col.items.map((item) => (
                            <li key={item}>
                              <a
                                className="hover:text-primary transition-colors"
                                href="#"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <FeaturedPanel featured={menu.featured} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5 md:gap-8 relative z-10">
          <div className="hidden md:flex items-center border-b border-outline-variant/30 py-1">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-44 placeholder:text-on-surface-variant/50"
              placeholder="Search our cellar..."
              type="text"
            />
          </div>
          <button className="material-symbols-outlined hover:text-primary transition-colors">
            search
          </button>
          <button className="material-symbols-outlined hover:text-primary transition-colors">
            shopping_bag
          </button>
          <button className="hidden sm:inline material-symbols-outlined hover:text-primary transition-colors">
            person
          </button>
          <button
            aria-controls="mobile-nav-panel"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="material-symbols-outlined lg:hidden hover:text-primary transition-colors"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? "close" : "menu"}
          </button>
        </div>
      </div>
      <div
        className={`mobile-nav-panel lg:hidden ${mobileOpen ? "open" : ""}`}
        id="mobile-nav-panel"
      >
        <div className="glass-panel border-t border-outline-variant/20 px-margin-mobile py-6 space-y-6">
          {mobileNavLinks.map((link) => (
            <a
              className="block font-label-md text-label-md text-on-surface/80 hover:text-primary transition-colors tracking-wide"
              href="#"
              key={link}
            >
              {link}
            </a>
          ))}
          <div className="flex items-center gap-2 border-b border-outline-variant/30 py-2">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50"
              placeholder="Search our cellar..."
              type="text"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
