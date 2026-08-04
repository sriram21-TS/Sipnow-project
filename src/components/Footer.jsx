import { footerColumns } from "../data/footerLinks.js";
import { LOGO_URL } from "../data/images.js";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 relative z-10">
        <div className="space-y-8">
          <img className="h-10 brightness-110" src={LOGO_URL} />
          <p className="text-on-surface-variant leading-relaxed">
            Elevating the drinking experience with curated excellence and
            unparalleled delivery service since our cellar doors first opened.
          </p>
          <div className="flex gap-4">
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">
                public
              </span>
            </a>
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
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
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-8">
          <h4 className="font-label-md text-primary uppercase tracking-[0.2em]">
            The Cellar Club
          </h4>
          <p className="text-on-surface-variant leading-relaxed">
            Join our inner circle for exclusive rare release alerts and
            sommelier insights.
          </p>
          <div className="flex flex-col gap-4">
            <input
              className="bg-surface-container border border-outline-variant/30 rounded-full px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all"
              placeholder="Email Address"
              type="email"
            />
            <button className="primary-gradient py-4 rounded-full font-label-md shadow-xl">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-outline-variant/10 pt-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-on-surface-variant/40 text-xs">
          © 2024 SipNow. Curated Excellence. Responsibility is our standard.
        </p>
        <div className="flex gap-8 text-xs text-on-surface-variant/40">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
}
