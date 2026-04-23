import { Link } from "react-router-dom";
import { HeroPattern } from "@/components/HeroPattern";

/**
 * RegistryHeader — compact, product-grade page identity for registry surfaces.
 * Uses the same navy hero treatment as the institutional pages so the
 * databases visually belong to the same Source Standard system.
 */
export const RegistryHeader = ({
  eyebrow,
  title,
  description,
  scopeText,
  scopeHref,
  recordCount,
  updatedOn,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  scopeText: string;
  scopeHref: string;
  recordCount: number;
  updatedOn?: string;
}) => {
  const updated =
    updatedOn ??
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <section className="relative border-b border-white/10 overflow-hidden bg-[hsl(var(--navy-surface))]">
      <HeroPattern opacity={0.018} stroke="white" cellSize={32} />

      <div className="relative z-10 page-shell pt-10 md:pt-14 pb-8 md:pb-10">
        <div className="mx-auto w-wide">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
            <div className="min-w-0 flex-1">
              {eyebrow && (
                <p className="t-utility-xs uppercase tracking-[0.14em] text-white/60 mb-3">
                  {eyebrow}
                </p>
              )}
              <h1 className="t-page-title text-white">{title}</h1>
              <p className="mt-4 t-body-md text-white/70 max-w-[68ch]">
                {description}
              </p>
              <Link
                to={scopeHref}
                className="mt-3 inline-flex items-center gap-1 text-[13.5px] text-white/70 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {scopeText} <span aria-hidden>→</span>
              </Link>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};
