import { useEffect, useState, type ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";
import type { MetadataItem } from "./MetadataBar";

/**
 * BriefingHero — 100vh "First Contact" institutional plaque.
 *
 * Default mode: centered single-column plaque on the white surface.
 * Dense mode (when `rightRail` is provided AND tone !== "navy"): two-rail
 * 12-col grid for terminal-style content.
 * Navy mode (`tone="navy"`): centered "Sovereign Plaque" on deep-navy
 * surface with white typography. `actions` slot renders below the statement.
 * Navy mode forces the centered layout regardless of `rightRail` / `rationale`.
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
  tone?: "default" | "navy";
  actions?: ReactNode;
}

export const BriefingHero = ({
  category,
  title,
  statement,
  rationale,
  rightRail,
  tone = "default",
  actions,
}: BriefingHeroProps) => {
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowCue(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isNavy = tone === "navy";
  const isDense = !isNavy && Boolean(rightRail);

  if (isNavy) {
    return (
      <section
        aria-labelledby="briefing-title"
        className="relative min-h-[100svh] border-b border-white/10 overflow-hidden bg-[hsl(var(--navy-surface))]"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 35%, hsl(var(--navy-surface-2)) 0%, transparent 70%)",
          }}
        />
        <HeroPattern opacity={0.05} stroke="white" cellSize={32} />
        <HeroPattern opacity={0.04} stroke="white" cellSize={96} />

        {/* Registration lines + corner crosshairs */}
        <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 bottom-0 w-px bg-white/[0.06]" style={{ left: "8.33%" }} />
          <div className="absolute top-0 bottom-0 w-px bg-white/[0.06]" style={{ right: "8.33%" }} />
          <div className="absolute left-0 right-0 h-px bg-white/[0.06]" style={{ top: "18%" }} />
          <div className="absolute left-0 right-0 h-px bg-white/[0.06]" style={{ bottom: "18%" }} />
          <div className="absolute w-3 h-3 border-l border-t border-white/25" style={{ top: "18%", left: "8.33%", transform: "translate(-50%, -50%)" }} />
          <div className="absolute w-3 h-3 border-r border-t border-white/25" style={{ top: "18%", right: "8.33%", transform: "translate(50%, -50%)" }} />
          <div className="absolute w-3 h-3 border-l border-b border-white/25" style={{ bottom: "18%", left: "8.33%", transform: "translate(-50%, 50%)" }} />
          <div className="absolute w-3 h-3 border-r border-b border-white/25" style={{ bottom: "18%", right: "8.33%", transform: "translate(50%, 50%)" }} />
        </div>

        {/* Vertical edge labels */}
        <div
          aria-hidden
          className="hidden md:block absolute left-6 top-1/2 z-20 font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        >
          SS-FRAMEWORK-2026.01 · REV 01
        </div>
        <div
          aria-hidden
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20 font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          PUBLIC REGISTRY · ACCESS TIER 0
        </div>

        {/* Top corner reference markers */}
        <div
          aria-hidden
          className="hidden md:block absolute z-20 font-mono text-[10px] tracking-[0.18em] uppercase space-y-1"
          style={{ top: "calc(18% + 16px)", left: "calc(8.33% + 16px)" }}
        >
          <div className="flex gap-4">
            <span className="text-white/30 w-24">COORD</span>
            <span className="text-white/55">N 38.9072° · W 77.0369°</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/30 w-24">PLATE ID</span>
            <span className="text-white/55">SS · 01 / 01</span>
          </div>
        </div>
        <div
          aria-hidden
          className="hidden md:block absolute z-20 font-mono text-[10px] tracking-[0.18em] uppercase space-y-1"
          style={{ top: "calc(18% + 16px)", right: "calc(8.33% + 16px)" }}
        >
          <div className="flex gap-4 justify-end">
            <span className="text-white/30">ISSUED</span>
            <span className="text-white/55 w-44 text-left">2026.01.15</span>
          </div>
          <div className="flex gap-4 justify-end">
            <span className="text-white/30">REV CYCLE</span>
            <span className="text-white/55 w-44 text-left">ANNUAL · INTERIM FLAGS</span>
          </div>
        </div>

        <div className="relative z-30 container-wide flex flex-col items-center justify-center min-h-[100svh] py-24 text-center">
          <div className="relative max-w-[640px] mx-auto px-6 py-2">
            <span aria-hidden className="absolute top-0 left-0 w-[14px] h-px bg-white/25" />
            <span aria-hidden className="absolute top-0 left-0 w-px h-[14px] bg-white/25" />
            <span aria-hidden className="absolute top-0 right-0 w-[14px] h-px bg-white/25" />
            <span aria-hidden className="absolute top-0 right-0 w-px h-[14px] bg-white/25" />
            <span aria-hidden className="absolute bottom-0 left-0 w-[14px] h-px bg-white/25" />
            <span aria-hidden className="absolute bottom-0 left-0 w-px h-[14px] bg-white/25" />
            <span aria-hidden className="absolute bottom-0 right-0 w-[14px] h-px bg-white/25" />
            <span aria-hidden className="absolute bottom-0 right-0 w-px h-[14px] bg-white/25" />

            <p aria-hidden="true" className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase mb-3">
              ▌&nbsp;&nbsp;PLATE 01 / 01&nbsp;&nbsp;▐
            </p>
            <p
              aria-hidden="true"
              className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55 mb-8"
            >
              {category}
            </p>
            <h1
              id="briefing-title"
              className="title-page text-white tracking-[-0.02em] uppercase max-w-[18ch] mx-auto"
            >
              {title}
            </h1>
            <div className="mt-10 h-px w-12 bg-white/20 mx-auto" aria-hidden="true" />
            <p className="mt-10 max-w-[58ch] mx-auto text-[14.5px] text-white/75 leading-[1.7]">
              {statement}
            </p>
            {actions && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>

        {/* Bottom institutional strip */}
        <div
          aria-hidden
          className="hidden md:grid absolute bottom-12 left-0 right-0 z-20 container-wide grid-cols-3 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase"
        >
          <div className="text-left">STATUS · ACTIVE</div>
          <div className="text-center">PROTOCOL · SS-FRAMEWORK-2026.01</div>
          <div className="text-right">JURISDICTION · UNITED STATES</div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className={`absolute bottom-4 left-0 right-0 z-20 flex justify-center transition-opacity duration-300 ${
            showCue ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
            ▼&nbsp;&nbsp;CONTINUE
          </span>
        </div>
      </section>
    );
  }

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
