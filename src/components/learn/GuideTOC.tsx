import { Link, useLocation } from "react-router-dom";

export interface TOCItem {
  id: string;
  label: string;
}

/**
 * GuideTOC — editorial in-page table of contents for a Learn guide.
 *
 * Sticky at the top on desktop; inline hairline block on mobile.
 * Renders semantic <nav aria-label="On this page"> and delegates the
 * actual scroll behavior to useHashScroll (center-aligned smooth).
 */
export const GuideTOC = ({
  items,
  basePath,
}: {
  items: TOCItem[];
  basePath: string;
}) => {
  const { hash } = useLocation();
  const activeId = hash.replace("#", "");

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      style={{
        border: "0.5px solid hsl(var(--border))",
        borderRadius: "10px",
        padding: "18px 20px",
        background: "hsl(var(--card))",
      }}
    >
      <p
        className="font-mono uppercase text-muted-foreground"
        style={{
          fontSize: "10px",
          letterSpacing: "0.14em",
          margin: 0,
          marginBottom: "12px",
        }}
      >
        On this page
      </p>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {items.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <Link
                to={`${basePath}#${item.id}`}
                className={`group inline-flex items-baseline gap-3 transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.4,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "-0.005em",
                  textDecoration: "none",
                }}
              >
                <span
                  aria-hidden
                  className="font-mono text-muted-foreground/60"
                  style={{
                    fontSize: "10.5px",
                    letterSpacing: "0.06em",
                    minWidth: "18px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default GuideTOC;
