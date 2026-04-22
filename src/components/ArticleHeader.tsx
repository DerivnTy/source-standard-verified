import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type ArticleMetaItem = { label: string; value: ReactNode };

/**
 * ArticleHeader — editorial header for Library article pages.
 *
 * Single centered editorial column (max-w-[760px]) with a quiet back link,
 * eyebrow, H1, lead deck, and a flat horizontal metadata strip. Replaces
 * the heavier `RecordHeader` split panel on consumer-facing reading pages.
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
    <div className="container-wide py-12 md:py-16">
      <div className="max-w-[760px] mx-auto">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          <span className="underline-offset-4 group-hover:underline">{backLabel}</span>
        </Link>

        {eyebrow && (
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mb-4">
            {eyebrow}
          </p>
        )}

        <h1 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em] text-foreground max-w-[22ch] mb-6">
          {title}
        </h1>

        {lead && (
          <p className="text-[18px] leading-[1.6] text-muted-foreground max-w-[58ch]">
            {lead}
          </p>
        )}

        {metadata.length > 0 && (
          <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground">
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
