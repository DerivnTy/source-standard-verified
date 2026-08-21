import { ReactNode } from "react";

export type ArticleMetaItem = { label: string; value: ReactNode };

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
          style={{ paddingTop: "48px", paddingBottom: "48px" }}
        >
          <div className="mx-auto flex w-reading flex-col items-center text-center">
            <p
              className="t-eyebrow-sm"
              style={{ color: "rgba(255,255,255,0.55)", marginBottom: "12px" }}
            >
              {category}
            </p>
            <h1
              className="t-article-title !mt-0"
              style={{ color: "#ffffff", textWrap: "balance" }}
            >
              {title}
            </h1>
            {lead && (
              <p
                className="ss-lead"
                style={{ marginTop: "14px", color: "rgba(255,255,255,0.74)", textWrap: "balance" }}
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
      <div className="page-shell" style={{ paddingTop: "40px", paddingBottom: "16px" }}>
        <div className="mx-auto w-reading text-center">
          <h1 className="t-article-title text-foreground !mt-0">{title}</h1>
          {lead && (
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginTop: "12px",
              }}
            >
              {lead}
            </p>
          )}
          {updated && (
            <p className="t-meta" style={{ marginTop: "12px" }}>
              Updated {updated.value}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
