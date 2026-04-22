import { useEffect, useState } from "react";
import { HeroPattern } from "./HeroPattern";
import type { MetadataItem } from "./MetadataBar";

/**
 * BriefingHero — 100vh "First Contact" institutional plaque.
 *
 * Single-purpose hero used on primary entry pages. Renders a 12-column
 * grid where the H1 baseline (left, col-span-7) and the Reference Box top
 * (right, col-span-4 col-start-9) align on a shared horizon line.
 *
 * Deliberate omissions: no PDF link, no summary box, no children slot —
 * the API itself enforces the minimalism mandate.
 */
export interface BriefingHeroProps {
  category: string; // e.g. "REGISTRY · SS-01"
  docId: string;
  title: string;
  statement: string;
  metadata: MetadataItem[];
  verifiedOn?: string;
}

export const BriefingHero = ({
  category,
  docId,
  title,
  statement,
  metadata,
  verifiedOn,
}: BriefingHeroProps) => {
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setShowCue(window.scrollY < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fullMetadata: MetadataItem[] = verifiedOn
    ? [{ label: "Verified", value: verifiedOn }, ...metadata]
    : metadata;

  return (
    <section
      aria-labelledby="briefing-title"
      className="relative min-h-[100svh] border-b border-border bg-background overflow-hidden"
    >
      <HeroPattern opacity={0.05} />

      <div className="relative container-wide flex flex-col justify-center min-h-[100svh] py-24">
        <div className="grid grid-cols-12 gap-8 md:gap-10 items-end">
          {/* Left — title block */}
          <div className="col-span-12 md:col-span-7">
            <p
              aria-hidden="true"
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-5"
            >
              {category}
            </p>
            <h1
              id="briefing-title"
              className="title-page text-foreground tracking-[-0.02em] uppercase"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-[14.5px] text-muted-foreground leading-[1.65]">
              {statement}
            </p>
          </div>

          {/* Right — Reference Box */}
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="border border-border bg-background">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Reference · {docId}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  Active
                </span>
              </div>
              <dl className="divide-y divide-border">
                {fullMetadata.map((m, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 px-4 py-2.5 items-baseline"
                  >
                    <dt className="col-span-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="col-span-7 text-[12.5px] font-mono tabular-nums text-foreground text-right">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className={`absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-300 ${
          showCue ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          ▼&nbsp;&nbsp;CONTINUE
        </span>
      </div>
    </section>
  );
};

export default BriefingHero;
