import { useEffect, useState, type ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";
import type { MetadataItem } from "./MetadataBar";
import logoLight from "@/assets/source-standard-logo-light.png";

/**
 * BriefingHero — Tiered first-section system.
 *
 * Two-tier hierarchy across the site:
 *   • variant="cover"    — Homepage only. Full 100svh, larger brand wordmark
 *                          above the H1, scroll cue, the "book cover".
 *   • variant="chapter"  — All other major pages. ~55vh, tighter rhythm, no
 *                          scroll cue, no oversized brand mark — a disciplined
 *                          chapter opening that orients quickly.
 *
 * Tone:
 *   • tone="navy"     — Deep navy surface, white type. Used for both cover
 *                       (homepage) and chapter (major pages) for brand
 *                       continuity.
 *   • tone="default"  — White surface, dense two-rail layout when `rightRail`
 *                       is provided. Always behaves like a "chapter" intro.
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
  variant?: "cover" | "chapter";
  /** Large brand/identity word displayed above the H1. Cover variant only. */
  brandMark?: string;
  actions?: ReactNode;
}

export const BriefingHero = ({
  category,
  title,
  statement,
  rationale,
  rightRail,
  tone = "default",
  variant = "chapter",
  brandMark,
  actions,
}: BriefingHeroProps) => {
  const isNavy = tone === "navy";
  const isCover = variant === "cover";
  const [showCue, setShowCue] = useState(true);

  useEffect(() => {
    if (!isCover) return;
    const onScroll = () => setShowCue(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCover]);
  const isDense = !isNavy && Boolean(rightRail);

  if (isNavy) {
    // ─── COVER (homepage) ───────────────────────────────────────────────
    if (isCover) {
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
          <HeroPattern opacity={0.02} stroke="white" cellSize={32} />

          <div className="relative z-30 container-wide flex flex-col items-center justify-center min-h-[100svh] py-24 text-center">
            <div className="relative max-w-[760px] mx-auto px-6">
              <p
                aria-hidden="true"
                className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55 mb-7"
              >
                {category}
              </p>

              <img
                src={logoLight}
                alt="Source Standard"
                width={384}
                height={108}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="mx-auto h-16 sm:h-20 md:h-24 w-auto mb-8"
              />
              {brandMark && <span className="sr-only">{brandMark}</span>}

              <div
                className="mx-auto h-px w-12 bg-white/20 mb-8"
                aria-hidden="true"
              />

              <h1
                id="briefing-title"
                className="text-white tracking-[-0.015em] uppercase max-w-[52ch] mx-auto text-[15px] sm:text-[16px] md:text-[17px] font-mono font-medium leading-[1.5] text-balance"
                style={{ letterSpacing: "0.16em" }}
              >
                {title}
              </h1>

              <p className="mt-9 max-w-[58ch] mx-auto text-[14.5px] text-white/70 leading-[1.7]">
                {statement}
              </p>
              {actions && (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </div>

          {/* Scroll cue — cover only */}
          <div
            aria-hidden="true"
            className={`absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-300 ${
              showCue ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55">
              ▼&nbsp;&nbsp;CONTINUE
            </span>
          </div>
        </section>
      );
    }

    // ─── CHAPTER (navy major-page intro) ────────────────────────────────
    return (
      <section
        aria-labelledby="briefing-title"
        className="relative border-b border-white/10 overflow-hidden bg-[hsl(var(--navy-surface))]"
      >
        <HeroPattern opacity={0.018} stroke="white" cellSize={32} />

        <div className="relative z-10 page-shell section-pad">
          <div className="w-hero">
            {category && (
              <p
                aria-hidden="true"
                className="t-eyebrow-sm text-white/55 mb-4"
              >
                {category}
              </p>
            )}
            <h1
              id="briefing-title"
              className="text-white t-chapter-title max-w-[22ch]"
            >
              {title}
            </h1>
            <p className="mt-5 max-w-[68ch] t-body-md text-white/70">
              {statement}
            </p>
            {actions && (
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── DEFAULT (white surface) — always chapter-weight ─────────────────
  return (
    <section
      aria-labelledby="briefing-title"
      className="relative border-b border-border bg-background overflow-hidden"
    >
      <HeroPattern opacity={0.04} />

      {isDense ? (
        <div className="relative page-shell section-pad">
          <div className="grid grid-cols-12 gap-8 md:gap-12 w-full">
            <div className="col-span-12 md:col-span-7">
              <p aria-hidden="true" className="t-eyebrow-sm text-muted-foreground mb-4">
                {category}
              </p>
              <h1
                id="briefing-title"
                className="text-foreground t-chapter-title max-w-[22ch]"
              >
                {title}
              </h1>
              <p className="mt-5 max-w-[68ch] t-body-md text-muted-foreground">
                {statement}
              </p>
              {rationale && (
                <div className="mt-7 max-w-[68ch] border border-border p-5">
                  <p className="t-eyebrow-sm text-muted-foreground mb-2">Rationale</p>
                  <p className="t-body-md text-foreground">{rationale}</p>
                </div>
              )}
            </div>
            <div className="col-span-12 md:col-span-5">{rightRail}</div>
          </div>
        </div>
      ) : (
        <div className="relative page-shell section-pad">
          <div className="w-hero">
            <p
              aria-hidden="true"
              className="t-eyebrow-sm text-muted-foreground mb-4"
            >
              {category}
            </p>
            <h1
              id="briefing-title"
              className="text-foreground t-chapter-title max-w-[22ch]"
            >
              {title}
            </h1>
            <p className="mt-5 max-w-[68ch] t-body-md text-muted-foreground">
              {statement}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BriefingHero;
