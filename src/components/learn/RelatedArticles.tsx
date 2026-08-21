import { ArticleCard } from "./ArticleCard";

export type RelatedItem = {
  to: string;
  title: string;
  description?: string;
  meta?: string;
};

/**
 * RelatedArticles — card grid rendered at the bottom of article pages.
 * Replaces the earlier text-list treatment of "Continue reading" so the
 * end of every article surfaces a real browsing choice.
 */
export const RelatedArticles = ({
  title = "Continue reading",
  eyebrow = "Related",
  items,
}: {
  title?: string;
  eyebrow?: string;
  items: RelatedItem[];
}) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-background pt-8 md:pt-10">
      <div className="page-shell">
        <div className="w-reading-wide">
          <header
            className="flex items-baseline justify-between gap-4 border-b border-border/50"
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
          >
            <div>
              <p
                className="font-mono uppercase text-muted-foreground"
                style={{ fontSize: "10px", letterSpacing: "0.14em", marginBottom: "4px" }}
              >
                {eyebrow}
              </p>
              <h2
                className="font-sans text-foreground"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.2,
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                {title}
              </h2>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((r) => (
              <ArticleCard
                key={r.to}
                to={r.to}
                title={r.title}
                description={r.description}
                meta={r.meta}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
