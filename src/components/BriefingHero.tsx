import { useEffect, useState } from "react";
import { HeroPattern } from "./HeroPattern";
import type { MetadataItem } from "./MetadataBar";

/**
 * BriefingHero — 100vh "First Contact" institutional plaque.
 *
 * Phase 2: Reference Box has been promoted to the GlobalUtilityBar.
 * The 100vh band is now strictly: eyebrow · H1 · single statement.
 * Content is centered both vertically and horizontally with intentional
 * gallery-wall whitespace.
 *
 * `metadata` and `verifiedOn` are accepted for API stability but are
 * intentionally not rendered here — they live in the GlobalUtilityBar.
 */
export interface BriefingHeroProps {
  category: string;
  docId: string;
  title: string;
  statement: string;
  metadata?: MetadataItem[];
  verifiedOn?: string;
}

export const BriefingHero = ({
  category,
  title,
  statement,
}: BriefingHeroProps) => {
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-labelledby="briefing-title"
      className="relative min-h-[100svh] border-b border-border bg-background overflow-hidden"
    >
      <HeroPattern opacity={0.04} />

      <div className="relative container-wide flex flex-col items-center justify-center min-h-[100svh] py-24 text-center">
        <p
          aria-hidden="true"
          className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground mb-8"
        >
          {category}
        </p>
        <h1
          id="briefing-title"
          className="title-page text-foreground tracking-[-0.02em] uppercase max-w-[18ch]"
        >
          {title}
        </h1>
        <div className="mt-10 h-px w-12 bg-border" aria-hidden="true" />
        <p className="mt-10 max-w-[58ch] text-[14.5px] text-muted-foreground leading-[1.7]">
          {statement}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className={`absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-300 ${
          showCue ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground/80">
          ▼&nbsp;&nbsp;CONTINUE
        </span>
      </div>
    </section>
  );
};

export default BriefingHero;
