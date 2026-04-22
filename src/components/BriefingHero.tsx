import { useEffect, useState, type ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";
import type { MetadataItem } from "./MetadataBar";

/**
 * BriefingHero — 100vh "First Contact" institutional plaque.
 *
 * Default mode: centered single-column plaque (eyebrow · H1 · statement).
 * Dense mode (when `rightRail` is provided): two-rail 12-col grid where the
 * left rail keeps the title group (plus optional `rationale` chit) and the
 * right rail receives arbitrary terminal-style content. Used by Index.tsx.
 *
 * `metadata` and `verifiedOn` remain accepted for API stability — they are
 * surfaced via the GlobalUtilityBar.
 */
export interface BriefingHeroProps {
  category: string;
  docId: string;
  title: string;
  statement: string;
  metadata?: MetadataItem[];
  verifiedOn?: string;
  rationale?: string;
  rightRail?: ReactNode;
}

export const BriefingHero = ({
  category,
  title,
  statement,
  rationale,
  rightRail,
}: BriefingHeroProps) => {
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDense = Boolean(rightRail);

  return (
    <section
      aria-labelledby="briefing-title"
      className="relative min-h-[100svh] border-b border-border bg-background overflow-hidden"
    >
      <HeroPattern opacity={0.04} />

      {isDense ? (
        <div className="relative container-wide flex items-center min-h-[100svh] py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-12 w-full">
            {/* Left rail */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
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
              {rationale && (
                <div className="mt-8 max-w-[58ch] border border-border p-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Rationale
                  </p>
                  <p className="text-[14.5px] text-foreground leading-[1.65]">
                    {rationale}
                  </p>
                </div>
              )}
            </div>

            {/* Right rail */}
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              {rightRail}
            </div>
          </div>
        </div>
      ) : (
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
      )}

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
