import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type ArticleMetaItem = { label: string; value: ReactNode };

const cardChrome = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  background: "hsl(var(--card))",
} as const;

/**
 * ArticleHeader — institutional record header for Library article pages.
 *
 * Renders a compact "← Back to Resource Library" utility link aligned to
 * the article column, followed by an `ArticleHeaderCard`: bordered white
 * card with mono eyebrow, title, dek, hairline divider, and a tight
 * metadata grid. Replaces the prior editorial band layout.
 *
 * Public prop signature is preserved so individual article pages need
 * no edits.
 */
export const ArticleHeader = ({
  eyebrow: _eyebrow,
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
}) => {
  // eyebrow accepted for back-compat but visually replaced by the
  // canonical "RESOURCE DOCUMENT" label.
  void _eyebrow;

  return (
    <header className="bg-background">
      <div className="page-shell pt-6">
        <div className="mx-auto w-reading-wide">
          {/* Compact utility back link — sits inside the article column,
              not a separate full-width band. */}
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

          {/* ArticleHeaderCard */}
          <div style={{ ...cardChrome, padding: "24px", marginTop: "16px" }}>
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.14em" }}
            >
              Resource Document
            </p>

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

            {metadata.length > 0 && (
              <>
                <div
                  aria-hidden
                  style={{
                    height: "0.5px",
                    background: "hsl(var(--border))",
                    margin: "20px 0 16px",
                  }}
                />
                <dl
                  className="grid gap-x-6 gap-y-3"
                  style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
                >
                  {metadata.map((m, i) => (
                    <div key={i} className="flex flex-col" style={{ rowGap: "3px" }}>
                      <dt
                        className="font-mono uppercase text-muted-foreground"
                        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                      >
                        {m.label}
                      </dt>
                      <dd
                        className="text-foreground font-sans"
                        style={{ fontSize: "12.5px", lineHeight: "1.4" }}
                      >
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
