import { useFooterColumns, useSiteAssets } from "../hooks/useContent.js";
import { useNewsletterForm } from "../hooks/useNewsletterForm.js";
import { preventNav } from "../utils/links.js";

export default function Footer() {
  const { email, status, handleChange, handleSubmit } = useNewsletterForm();
  const { data: footerColumns } = useFooterColumns();
  const { data: siteAssets } = useSiteAssets();

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
            unparalleled delivery service since our cellar doors first opened.
          </p>
          <div className="flex gap-4">
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
              onClick={preventNav}
            >
              <span className="material-symbols-outlined text-[20px]">
                public
              </span>
            </a>
            <a
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              href="#"
              onClick={preventNav}
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
                    onClick={preventNav}
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
          {status === "success" ? (
            <p className="text-primary text-sm font-label-md">
              You&apos;re on the list — welcome to the club.
            </p>
          ) : (
            <form
              className="flex flex-col gap-4"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                aria-invalid={status === "error"}
                className={`bg-surface-container border rounded-full px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all ${
                  status === "error"
                    ? "border-red-400"
                    : "border-outline-variant/30"
                }`}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                value={email}
              />
              {status === "error" && (
                <p className="text-red-400 text-xs px-2 -mt-2">
                  Please enter a valid email address.
                </p>
              )}
              <button
                className="primary-gradient py-4 rounded-full font-label-md shadow-xl disabled:opacity-60 disabled:pointer-events-none"
                disabled={status === "submitting"}
                type="submit"
              >
                {status === "submitting" ? "Subscribing…" : "Subscribe Now"}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-outline-variant/10 pt-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-on-surface-variant/40 text-xs">
          © 2024 SipNow. Curated Excellence. Responsibility is our standard.
        </p>
        <div className="flex gap-8 text-xs text-on-surface-variant/40">
          <a
            className="hover:text-primary transition-colors"
            href="#"
            onClick={preventNav}
          >
            Privacy Policy
          </a>
          <a
            className="hover:text-primary transition-colors"
            href="#"
            onClick={preventNav}
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
}
