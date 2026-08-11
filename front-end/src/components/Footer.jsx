import { useFooterColumns, useSiteAssets } from "../hooks/useContent.js";
import { useNavigate } from "react-router-dom";

const FOOTER_DESTINATIONS = {
  Beer: "/beer-cider",
  Wine: "/wine",
  Whisky: "/spirits?type=whisky",
  premix: "/premix",
  Spirits: "/spirits",
  zero: "/zero-alcohol",
  "In-store": "/in-store-promotions",
  General: "/offers/general-promotions",
  members: "/offers/members",
  Gift: "/offers/gift-cards",
  Clearance: "/offers/clearance",
  "My Orders": "/profile",
  "Shipping Info": "/checkout",
  "Returns & Refunds": "/profile",

  "Sommelier Service": "/#sommelier-quiz",
  "Privacy Policy": "/#why-sipnow",
  "Terms of Service": "/#why-sipnow",
};
export default function Footer() {
  const navigate = useNavigate();
  const { data: footerColumns } = useFooterColumns();
  const { data: siteAssets } = useSiteAssets();

  const navigateTo = (destination) => (e) => {
    e.preventDefault();
    const [path, hash] = destination.split("#");
    navigate(path || "/");
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <footer className="bg-surface-container-lowest pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 relative z-10">
        <div className="space-y-8">
          <img
            alt="SipNow Logo"
            className="h-14 md:h-16 object-contain brightness-110"
            src={siteAssets.LOGO_URL}
          />
          <p className="text-on-surface-variant leading-relaxed">
            Elevating the drinking experience with curated excellence and
            unparalleled delivery service since our cellar doors first opene.
          </p>
          <div className="flex gap-4">
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="/"
              onClick={navigateTo("/")}
            >
              <span className="material-symbols-outlined text-[20px]">
                public
              </span>
            </a>
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="/"
              onClick={navigateTo("/")}
            >
              <span className="material-symbols-outlined text-[20px]">
                share
              </span>
            </a>
          </div>
        </div>
        {footerColumns.map((column) => (
          <div className="space-y-8" key={column.heading}>
            <h4 className="font-label-md text-primary uppercase tracking-[0.2em]">
              {column.heading}
            </h4>
            <ul className="space-y-5">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    className="text-on-surface-variant hover:text-white transition-colors"
                    href={FOOTER_DESTINATIONS[link.trim()]}
                    onClick={navigateTo(FOOTER_DESTINATIONS[link.trim()])}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/10 pt-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-on-surface-variant/40 text-xs">
          © 2024 SipNow. Curated Excellence. Responsibility is our standard.
        </p>
        <div className="flex gap-8 text-xs text-on-surface-variant/40">
          <a
            className="hover:text-primary transition-colors"
            href={FOOTER_DESTINATIONS["Privacy Policy"]}
            onClick={navigateTo(FOOTER_DESTINATIONS["Privacy Policy"])}
          >
            Privacy Policy
          </a>
          <a
            className="hover:text-primary transition-colors"
            href={FOOTER_DESTINATIONS["Terms of Service"]}
            onClick={navigateTo(FOOTER_DESTINATIONS["Terms of Service"])}
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
}
