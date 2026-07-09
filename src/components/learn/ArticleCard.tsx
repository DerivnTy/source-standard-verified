import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * ArticleCard — the canonical "this is an article" surface across Learn.
 * Used on Education topic grids, FAQ topic grids, News lists, and Related
 * sections. Replaces plain link-row treatments so users immediately read
 * these as browsable articles rather than a document outline.
 */
export const ArticleCard = ({
  to,
  eyebrow,
  title,
  description,
  meta,
}: {
  to: string;
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
}) => (
  <Link
    to={to}
    className="group relative flex flex-col bg-card hover:bg-muted/50 transition-colors h-full"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "18px 20px",
    }}
  >
    {eyebrow && (
      <p
        className="font-mono uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.12em", marginBottom: "10px" }}
      >
        {eyebrow}
      </p>
    )}

    <h3
      className="font-sans text-foreground group-hover:text-primary transition-colors"
      style={{
        fontSize: "16px",
        lineHeight: 1.3,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        margin: 0,
        paddingRight: "28px",
      }}
    >
      {title}
    </h3>

    {description && (
      <p
        className="text-muted-foreground"
        style={{
          fontSize: "13.5px",
          lineHeight: 1.55,
          marginTop: "8px",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
    )}

    {meta && (
      <p
        className="font-mono uppercase text-muted-foreground/80 tabular-nums"
        style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          marginTop: "14px",
          marginBottom: 0,
        }}
      >
        {meta}
      </p>
    )}

    <ArrowUpRight
      aria-hidden
      strokeWidth={1.25}
      className="absolute text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform"
      style={{ width: 16, height: 16, top: 18, right: 18 }}
    />
  </Link>
);

export default ArticleCard;
