import { ReactNode } from "react";

/**
 * DefList — quiet editorial definition list.
 *
 * Hairline top/bottom, hairline divider between rows. No card-per-row.
 * Used inside `ArticleSection variant="prose"` on institutional pages.
 */
export const DefList = ({
  items,
}: {
  items: { term: ReactNode; description: ReactNode }[];
}) => (
  <dl
    className="mt-4"
    style={{
      borderTop: "0.5px solid hsl(var(--border))",
      borderBottom: "0.5px solid hsl(var(--border))",
    }}
  >
    {items.map((it, i) => (
      <div
        key={i}
        style={{
          padding: "14px 0",
          borderTop: i === 0 ? "none" : "0.5px solid hsl(var(--border) / 0.6)",
        }}
      >
        <dt
          className="font-sans text-foreground"
          style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.35 }}
        >
          {it.term}
        </dt>
        <dd
          className="text-muted-foreground"
          style={{
            fontSize: "14.5px",
            lineHeight: 1.6,
            marginTop: "4px",
            marginLeft: 0,
          }}
        >
          {it.description}
        </dd>
      </div>
    ))}
  </dl>
);
