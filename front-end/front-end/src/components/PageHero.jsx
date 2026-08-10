import Reveal from "./Reveal.jsx";

/** Shared header for secondary pages: back link, eyebrow tag, title and description. */
export default function PageHero({ onBack, tag, title, description }) {
  return (
    <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
      <button
        className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-8"
        onClick={onBack}
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">west</span>
        Back to home
      </button>
      <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-label-md uppercase tracking-[0.2em] text-[10px] mb-6">
        {tag}
      </div>
      <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[56px] leading-tight mb-4">
        {title}
      </h1>
      <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
        {description}
      </p>
    </Reveal>
  );
}
