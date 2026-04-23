import { Link } from "react-router-dom";
import { HeroPattern } from "@/components/HeroPattern";

/**
 * RegistryHeader — compact, product-grade page identity for registry surfaces.
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
}: {
  /** @deprecated — use indexNumber for Geist Mono index. */
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

      <div className="relative z-10 page-shell pt-20 md:pt-24 pb-20 md:pb-24">
        <div className="mx-auto w-wide">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
            <div className="min-w-0 flex-1">
              {indexNumber && <p className="t-utility-xs tabular-nums text-white/50 mb-3">{indexNumber}</p>}
              <h1 className="t-page-title text-white text-left">
                {title}
              </h1>
              {statusLine ? (
                <div className="mt-5 inline-flex items-center" style={{ gap: "12px" }}>
                  <span
                    aria-hidden
                    className="rounded-full bg-[#22C55E] animate-pulse"
                    style={{ height: "6px", width: "6px" }}
                  />
                  <span className="t-utility-xs text-white/70">
                    {statusLine}
                  </span>
                </div>
              ) : description ? (
                <p className="mt-6 t-body-md text-white/70 max-w-[68ch] leading-[1.6]">
                  {description}
                </p>
              ) : null}
              {scopeText && scopeHref && (
                <Link
                  to={scopeHref}
                  className="mt-3 inline-flex items-center gap-1 t-body-sm text-white/70 hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {scopeText} <span aria-hidden>→</span>
                </Link>
              )}
            </div>

            {!hideRecordPill && (
              <div className="shrink-0 md:text-right md:pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 rounded-full bg-white/5 backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--src-503b))] animate-pulse"
                  />
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
