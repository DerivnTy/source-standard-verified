import { Link } from "react-router-dom";
import { HeroPattern } from "@/components/HeroPattern";

/**
 * RegistryHeader, compact, product-grade page identity for registry surfaces.
 * Uses the same navy hero treatment as the institutional pages so the
 * databases visually belong to the same Source Standard system.
 */
export const RegistryHeader = ({
  eyebrow: _eyebrow,
  indexNumber,
  title,
  description,
  statusLine,
  scopeText,
  scopeHref,
  recordCount,
  updatedOn,
  hideRecordPill = false,
  compact = false,
}: {
  /** @deprecated, use indexNumber for Geist Mono index. */
  eyebrow?: string;
  /** Geist Mono index number, e.g. "01". The only anchor above the H1. */
  indexNumber?: string;
  title: string;
  description?: string;
  /** Optional Geist Mono status line rendered in place of description. */
  statusLine?: string;
  scopeText?: string;
  scopeHref?: string;
  recordCount: number;
  updatedOn?: string;
  hideRecordPill?: boolean;
  /** Reduce hero padding ~30% for registry surfaces that prioritize records. */
  compact?: boolean;
}) => {
  const updated =
    updatedOn ??
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });


  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-surface))]">
      <HeroPattern opacity={0.018} stroke="white" cellSize={32} />

      <div
        className="relative z-10 page-shell"
        style={{
          paddingTop: compact ? "clamp(20px, 3vh, 32px)" : "clamp(48px, 7vh, 72px)",
          paddingBottom: compact ? "clamp(12px, 2vh, 24px)" : "clamp(20px, 3vh, 32px)",
        }}

      >
        <div className="mx-auto w-wide">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
            <div className="min-w-0 flex-1">
              <h1 className="ss-hero-title !text-white text-left !mt-0">
                {title}
              </h1>
              {statusLine ? (
                <div className="mt-3 inline-flex items-center" style={{ gap: "12px" }}>
                  <span
                    aria-hidden
                    className="rounded-full bg-[#22C55E] animate-pulse"
                    style={{ height: "6px", width: "6px" }}
                  />
                  <span className="ss-eyebrow !text-white/70">
                    {statusLine}
                  </span>
                </div>
              ) : description ? (
                <p className="ss-lead !text-white/70 max-w-[600px] mt-3">
                  {description}
                </p>
              ) : null}
              {scopeText && scopeHref && (
                <Link
                  to={scopeHref}
                  className="mt-3 inline-flex items-center gap-1 ss-body !text-white/70 hover:!text-white underline-offset-4 hover:underline transition-colors"
                >
                  {scopeText} <span aria-hidden>→</span>
                </Link>
              )}
            </div>

            {!hideRecordPill && (
              <div className="shrink-0 text-center md:pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 rounded-full bg-white/5 backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center shrink-0"
                    style={{ height: "0.75em", width: "0.375rem", transform: "translateY(0.5px)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full live-dot live-dot--cadence-2"
                      style={{ backgroundColor: "#FF3B30", display: "inline-block" }}
                    />
                  </span>
                  <span className="t-utility-xs text-white/70">
                    Live ·{" "}
                    <span className="text-white tabular-nums">{updated}</span>
                    <span className="mx-1.5 text-white/30">·</span>
                    <span className="text-white tabular-nums">{recordCount}</span>{" "}
                    records
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
