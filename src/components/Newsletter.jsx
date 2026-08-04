import Reveal from "./Reveal.jsx";
import { useNewsletterForm } from "../hooks/useNewsletterForm.js";

export default function Newsletter() {
  const { email, status, handleChange, handleSubmit } = useNewsletterForm();

  return (
    <Reveal className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="glass-panel border border-outline-variant/20 rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden shadow-2xl text-center space-y-10">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full"></div>
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="font-display-lg text-5xl md:text-6xl">
            Join the SipNow Club
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Get exclusive access to rare releases, expert pairing guides, and
            member-only pricing delivered to your inbox.
          </p>
        </div>
        {status === "success" ? (
          <p className="relative z-10 text-primary font-label-md">
            You&apos;re on the list — welcome to the club.
          </p>
        ) : (
          <form
            className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 relative z-10"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="flex-grow flex flex-col text-left gap-2">
              <input
                aria-invalid={status === "error"}
                className={`bg-surface-container border rounded-full px-8 py-5 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface transition-all placeholder:text-on-surface-variant/50 ${
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
                <p className="text-red-400 text-xs px-6">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <button
              className="primary-gradient px-12 py-5 rounded-full font-label-md text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-transform whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
              disabled={status === "submitting"}
              type="submit"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe Now"}
            </button>
          </form>
        )}
      </div>
    </Reveal>
  );
}
