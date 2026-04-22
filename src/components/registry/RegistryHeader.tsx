import { Link } from "react-router-dom";

/**
 * RegistryHeader — compact, product-grade page identity for registry surfaces.
 * Replaces editorial BriefingHero with denser framing: eyebrow, title,
 * one-line description, scope clarifier, and a freshness chip on the right.
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
  eyebrow: string;
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
    <section className="bg-background border-b border-border/60">
      <div className="page-shell pt-10 md:pt-14 pb-6 md:pb-8">
        <div className="mx-auto w-wide">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
            <div className="min-w-0 flex-1">
              <p className="t-utility-xs text-muted-foreground mb-3">{eyebrow}</p>
              <h1 className="t-page-title text-foreground">{title}</h1>
              <p className="mt-4 t-body-md text-muted-foreground max-w-[68ch]">
                {description}
              </p>
              <Link
                to={scopeHref}
                className="mt-3 inline-flex items-center gap-1 text-[13.5px] text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                {scopeText} <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="shrink-0 md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border/60 rounded-full bg-surface-muted/40">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--src-503b))] animate-pulse"
                />
                <span className="t-utility-xs text-muted-foreground">
                  Live ·{" "}
                  <span className="text-foreground tabular-nums">{updated}</span>
                  <span className="mx-1.5 text-border">·</span>
                  <span className="text-foreground tabular-nums">{recordCount}</span>{" "}
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
