import { type ReactNode } from "react";
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
  /** Optional logo/image rendered above the title. Cover variant only. */
  heroLogo?: ReactNode;
  actions?: ReactNode;
  /** Optional metrics row rendered between the statement and the actions (cover variant). */
  heroMetrics?: ReactNode;
  /** Optional metadata strip rendered below the actions (cover variant). */
  heroMeta?: ReactNode;
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
  heroLogo,
  actions,
  heroMetrics,
  heroMeta,
}: BriefingHeroProps) => {
  const isNavy = tone === "navy";
  const isCover = variant === "cover";
  const isDense = !isNavy && Boolean(rightRail);

  if (isNavy) {
    // ─── COVER (homepage) ───────────────────────────────────────────────
    if (isCover) {
      return (
        <section
          aria-labelledby="briefing-title"
          className="relative overflow-hidden bg-[hsl(var(--navy-surface))] lg:min-h-[70vh] lg:max-h-[760px]"
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

          <div
            className="relative z-30 page-shell flex flex-col justify-start lg:justify-center lg:items-center lg:min-h-[70vh] lg:max-h-[760px]"
            style={{
              paddingTop: "clamp(32px, 4.5vh, 52px)",
              paddingBottom: "clamp(48px, 6vh, 72px)",
            }}
          >
            <div className="relative w-full lg:flex lg:flex-col lg:items-center lg:text-center lg:my-auto">
            {brandMark && <span className="sr-only">{brandMark}</span>}
            {heroLogo && (
              <div className="flex justify-center" style={{ marginBottom: "28px" }}>
                {heroLogo}
              </div>
            )}

            {heroMetrics && (
              <div
                className="flex justify-start lg:justify-center"
                style={{ marginTop: "0px" }}
              >
                {heroMetrics}
              </div>
            )}

            {statement && (
              <p
                className="text-white/70 text-left lg:text-center lg:mx-auto"
                style={{
                  maxWidth: "520px",
                  marginTop: "24px",
                  fontSize: "clamp(18px, 4.2vw, 22px)",
                  lineHeight: "1.4",
                }}
              >
                {statement}
              </p>
            )}


            {actions && (
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-center [&>*]:w-full sm:[&>*]:w-auto"
                style={{ marginTop: "clamp(24px, 3.5vh, 36px)", gap: "16px" }}
              >
                {actions}
              </div>
            )}

              {heroMeta && (
                <div
                  className="mx-auto w-full"
                  style={{
                    marginTop: "clamp(48px, 7vh, 72px)",
                    paddingTop: "22px",
                    maxWidth: "560px",
                    borderTop: "1px solid rgba(255,255,255,0.16)",
                  }}
                >
                  {heroMeta}
                </div>
              )}
            </div>
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
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 40%, hsl(var(--navy-surface-2)) 0%, transparent 70%)",
          }}
        />
        <HeroPattern opacity={0.02} stroke="white" cellSize={32} />

        <div className="relative z-10 page-shell section-pad">
          <div className="w-hero">
            <h1
              id="briefing-title"
              className="ss-hero-title !text-white !mt-0 max-w-[22ch]"
            >
              {title}
            </h1>
            <p className="ss-lead !text-white/70 max-w-[68ch]">
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
              <h1
                id="briefing-title"
                className="ss-hero-title text-foreground !mt-0 max-w-[22ch]"
              >
                {title}
              </h1>
              <p className="ss-lead max-w-[68ch]">
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
            <h1
              id="briefing-title"
              className="ss-hero-title text-foreground !mt-0 max-w-[22ch]"
            >
              {title}
            </h1>
            <p className="ss-lead max-w-[68ch]">
              {statement}
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default BriefingHero;
