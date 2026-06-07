import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type ArticleMetaItem = { label: string; value: ReactNode };

const cardChrome = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  background: "hsl(var(--card))",
} as const;

/**
 * ArticleHeader — consumer-facing article header.
 *
 * Renders a compact "← Back" utility link, then a bordered card with the
 * title, a short description, and a low-emphasis "Updated …" line.
 * Internal document-control fields (Doc ID, Status, Reviewed by, etc.) are
 * intentionally not rendered — only the Updated date is surfaced from
 * the metadata array, for backward compatibility with existing pages.
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
  void _eyebrow;

  const updated = metadata.find(
    (m) => typeof m.label === "string" && m.label.toLowerCase().includes("updated"),
  );

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
