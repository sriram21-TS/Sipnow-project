import Reveal from "./Reveal.jsx";

export default function Newsletter() {
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
        <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 relative z-10">
          <input
            className="flex-grow bg-surface-container border border-outline-variant/30 rounded-full px-8 py-5 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface transition-all placeholder:text-on-surface-variant/50"
            placeholder="Email Address"
            type="email"
          />
          <button className="primary-gradient px-12 py-5 rounded-full font-label-md text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-transform whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </div>
    </Reveal>
  );
}
