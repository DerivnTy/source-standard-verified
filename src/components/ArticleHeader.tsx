import { Link } from "react-router-dom";

export type ArticleMetaItem = { label: string; value: string };

/**
 * ArticleHeader, continuous editorial masthead.
 *
 * Renders on the page background: back link, optional category/dateline
 * line, headline, standfirst, then a hairline separator that continues
 * into the article body. No card chrome.
 *
 * If no category is passed, the metadata line is omitted entirely.
 */
export const ArticleHeader = ({
  title,
  lead,
  category,
  backHref = "/learn/education",
  backLabel = "Back to Education",
}: {
  title: string;
  lead?: string;
  category?: string;
  backHref?: string;
  backLabel?: string;
}) => {
  return (
    <header className="bg-background">
      <div className="page-shell" style={{ paddingTop: "24px", paddingBottom: "0" }}>
        <div className="mx-auto w-reading-wide">
          <Link
            to={backHref}
            className="inline-flex items-center gap-1.5 font-mono uppercase text-muted-foreground hover:text-foreground transition-colors group"
            style={{ fontSize: "11px", letterSpacing: "0.08em" }}
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span>{backLabel}</span>
          </Link>

          {category && (
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.12em", marginTop: "14px" }}
            >
              {category}
            </p>
          )}

          <h1
            className="t-page-title text-foreground"
            style={{ marginTop: category ? "10px" : "14px" }}
          >
            {title}
          </h1>

          {lead && (
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "17px",
                lineHeight: 1.55,
                marginTop: "12px",
                maxWidth: "68ch",
                letterSpacing: "-0.005em",
              }}
            >
              {lead}
            </p>
          )}

          {/* Hairline continuing into the body */}
          <div
            aria-hidden
            style={{
              height: "0.5px",
              background: "hsl(var(--border))",
              marginTop: "28px",
            }}
          />
        </div>
      </div>
    </header>
  );
};
