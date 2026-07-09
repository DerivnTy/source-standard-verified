import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Article, routeForArticle } from "@/data/resourceLibrary";

/**
 * ArticleRow, Surgical Data Strip (2-row architecture).
 *   Row 1: Title (left) · Meta (right, Geist Mono)
 *   Row 2: Blurb (left) · VIEW › (right)
 * Mirrors VendorRow / GreenlistRow density and geometry.
 */
export const ArticleRow = ({ entry }: { entry: Article }) => (
  <Link
    to={routeForArticle(entry.slug)}
    aria-label={entry.title}
    data-pill
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.97]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "20px",
      padding: "10px 12px",
    }}
  >
    <div className="flex flex-col" style={{ rowGap: "2px" }}>
      {/* Row 1, Title (left) · Meta (right) */}
      <div className="flex items-start justify-between gap-x-3">
        <h3
          className="min-w-0 truncate font-sans font-semibold text-foreground"
          style={{
            fontSize: "12px",
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
          }}
        >
          {entry.title}
        </h3>
        {entry.meta && (
          <span
            className="shrink-0 font-mono uppercase tabular-nums text-muted-foreground"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            {entry.meta}
          </span>
        )}
      </div>

      {/* Row 2, Blurb (left) · VIEW › (right) */}
      <div className="flex items-center justify-between gap-x-3">
        <p
          className="min-w-0 truncate font-sans text-muted-foreground"
          style={{ fontSize: "10px", lineHeight: "1.4" }}
        >
          {entry.blurb}
        </p>
        <span
          className="shrink-0 inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
        >
          View
          <ChevronRight
            aria-hidden
            style={{ width: "11px", height: "11px", strokeWidth: 1.5 }}
          />
        </span>
      </div>
    </div>
  </Link>
);
