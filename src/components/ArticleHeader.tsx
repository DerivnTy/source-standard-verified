import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type ArticleMetaItem = { label: string; value: ReactNode };

/**
 * ArticleHeader — editorial header for Library article pages.
 *
 * Single editorial column (max-w-[820px]) with a quiet back link, eyebrow,
 * H1, lead deck, and a flat horizontal metadata strip. Uses the canonical
 * t-page-title token so article H1s match every other internal page.
 */
export const ArticleHeader = ({
  eyebrow,
  title,
  lead,
  metadata = [],
  backHref = "/education",
  backLabel = "Back to Resource Library",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  metadata?: ArticleMetaItem[];
  backHref?: string;
  backLabel?: string;
}) => (
  <header className="border-b border-border bg-background">
    <div className="page-shell section-pad">
      <div className="mx-auto w-reading-wide">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 t-utility-xs text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          <span className="underline-offset-4 group-hover:underline normal-case tracking-normal">{backLabel}</span>
        </Link>

        <div className="h-px w-8 bg-border mb-6" aria-hidden="true" />

        {eyebrow && (
          <p className="t-eyebrow-sm text-muted-foreground mb-4">
            {eyebrow}
          </p>
        )}

        <h1 className="t-page-title text-foreground max-w-[26ch] mb-5">
          {title}
        </h1>

        {lead && (
          <p className="t-body-md text-muted-foreground max-w-[68ch]">
            {lead}
          </p>
        )}

        {metadata.length > 0 && (
          <div className="mt-7 pt-4 border-t border-border flex flex-wrap items-center gap-x-2 gap-y-1.5 t-utility-xs text-muted-foreground">
            {metadata.map((m, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-border">·</span>}
                <span>
                  <span className="text-muted-foreground/70">{m.label} · </span>
                  <span className="text-foreground">{m.value}</span>
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </header>
);
