/**
 * CategoryHeader — section header used inside Learn landing pages.
 * Reads as a document-library category label, not a hero.
 */
export const CategoryHeader = ({
  eyebrow,
  title,
  description,
  count,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
}) => (
  <header
    className="flex items-baseline justify-between gap-6 border-b border-border/50"
    style={{ paddingBottom: "12px", marginBottom: "20px" }}
  >
    <div className="min-w-0">
      {eyebrow && (
        <p
          className="font-mono uppercase text-muted-foreground"
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            marginBottom: "6px",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-sans text-foreground"
        style={{
          fontSize: "20px",
          lineHeight: 1.2,
          fontWeight: 700,
          letterSpacing: "-0.015em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-muted-foreground"
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            marginTop: "6px",
            marginBottom: 0,
            maxWidth: "62ch",
          }}
        >
          {description}
        </p>
      )}
    </div>
    {typeof count === "number" && (
      <span
        className="font-mono uppercase text-muted-foreground/80 tabular-nums shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.1em" }}
      >
        {count} {count === 1 ? "article" : "articles"}
      </span>
    )}
  </header>
);

export default CategoryHeader;
