import { ReactNode } from "react";

export type ArticleMetaItem = { label: string; value: ReactNode };

/**
 * ArticleHeader, consumer-facing article header.
 *
 * Navy masthead when `category` is passed. Otherwise a plain reading header
 * on the page canvas. No pattern mesh, no viewport-height padding.
 */
export const ArticleHeader = ({
  title,
  lead,
  category,
  metadata = [],
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  category?: string;
  metadata?: ArticleMetaItem[];
  backHref?: string;
  backLabel?: string;
}) => {
  const updated = metadata.find(
    (m) => typeof m.label === "string" && m.label.toLowerCase().includes("updated"),
  );

  if (category) {
    return (
      <header className="relative bg-[hsl(var(--navy-surface))]">
        <div
          className="relative page-shell"
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
        >
          <div className="mx-auto w-reading-wide">
            <p
              className="t-eyebrow-sm"
              style={{ color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}
            >
              {category}
            </p>
            <h1
              className="t-article-title !mt-0 !text-white"
              style={{ textWrap: "balance" }}
            >
              {title}
            </h1>
            {lead && (
              <p
                className="ss-lead !text-white/70"
                style={{ marginTop: "10px", textWrap: "balance" }}
              >
                {lead}
              </p>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background">
      <div className="page-shell" style={{ paddingTop: "24px", paddingBottom: "8px" }}>
        <div className="mx-auto w-reading-wide">
          <h1 className="t-article-title text-foreground !mt-0">{title}</h1>
          {lead && (
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "15px",
                lineHeight: "1.55",
                marginTop: "10px",
                maxWidth: "68ch",
              }}
            >
              {lead}
            </p>
          )}
          {updated && (
            <p className="t-meta" style={{ marginTop: "10px" }}>
              Updated {updated.value}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
