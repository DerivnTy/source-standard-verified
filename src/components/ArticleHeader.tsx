import { ReactNode } from "react";

export type ArticleMetaItem = { label: string; value: ReactNode };

const cardChrome = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  background: "hsl(var(--card))",
} as const;

/**
 * ArticleHeader, consumer-facing article header.
 *
 * Two rendering paths:
 *   • If `category` is passed → continuous editorial masthead on page background.
 *     No card chrome. Category line + title + lead + hairline separator.
 *   • Otherwise → backward-compatible bordered card with optional eyebrow,
 *     title, lead, and metadata lines (used by Library pages).
 */
export const ArticleHeader = ({
  eyebrow: _eyebrow,
  title,
  lead,
  category,
  metadata = [],
  backHref: _backHref,
  backLabel: _backLabel,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  category?: string;
  metadata?: ArticleMetaItem[];
  /** @deprecated Top-of-page back link removed. Render <EditorialBackLink /> at the page footer instead. */
  backHref?: string;
  /** @deprecated Top-of-page back link removed. Render <EditorialBackLink /> at the page footer instead. */
  backLabel?: string;
}) => {
  const updated = metadata.find(
    (m) => typeof m.label === "string" && m.label.toLowerCase().includes("updated"),
  );

  // ── Editorial masthead (category path) ────────────────────────────
  if (category) {
    return (
      <header className="bg-background">
        <div className="page-shell" style={{ paddingTop: "24px", paddingBottom: "0" }}>
          <div className="mx-auto w-reading-wide">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.12em" }}
            >
              {category}
            </p>


            <h1 className="t-article-title text-foreground" style={{ marginTop: "10px" }}>
              {title}
            </h1>

            {lead && (
              <p className="t-article-standfirst" style={{ marginTop: "12px" }}>
                {lead}
              </p>
            )}

            <div
              aria-hidden
              style={{
                height: "0.5px",
                background: "hsl(var(--border))",
                marginTop: "24px",
              }}
            />

          </div>
        </div>
      </header>
    );
  }

  // ── Backward-compatible card path (Library pages) ───────────────
  void _eyebrow;

  return (
    <header className="bg-background">
      <div className="page-shell pt-5">
        <div className="mx-auto w-reading-wide">
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 font-mono uppercase text-muted-foreground hover:text-foreground transition-colors group"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span>{backLabel}</span>
          </Link>

          <div style={{ ...cardChrome, padding: "24px", marginTop: "16px" }}>
            <h1
              className="t-page-title text-foreground max-w-[26ch]"
              style={{ marginTop: "12px" }}
            >
              {title}
            </h1>

            {lead && (
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  marginTop: "12px",
                  maxWidth: "68ch",
                }}
              >
                {lead}
              </p>
            )}

            {updated && (
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "10px",
                  marginTop: "12px",
                }}
              >
                Updated {updated.value}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
