import { ReactNode } from "react";
import { Link } from "react-router-dom";

export { BoardDefList } from "@/components/BoardSection";

const cardChrome = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  background: "hsl(var(--card))",
} as const;

/**
 * ArticleSection — institutional section card for Library article pages.
 *
 * Renders each section as a bordered white card with mono `§N` index,
 * `t-section-title-sm` heading, and 13.5px / 1.6 muted body. Stacks at
 * a 20px rhythm with 40px top/bottom page padding controlled here.
 *
 * Public prop signature is preserved so individual article pages need
 * no edits.
 */
export const ArticleSection = ({
  n,
  title,
  id,
  children,
}: {
  n?: string | number;
  title?: string;
  id?: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-24 bg-background"
    style={{ paddingTop: "20px" }}
  >
    <div className="page-shell">
      <div className="mx-auto w-reading-wide">
        <div style={{ ...cardChrome, padding: "24px" }}>
          {(n !== undefined || title) && (
            <header style={{ marginBottom: "14px" }}>
              {n !== undefined && (
                <p
                  className="font-mono uppercase text-muted-foreground"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  §{n}
                </p>
              )}
              {title && (
                <h2 className="t-section-title-sm text-foreground">{title}</h2>
              )}
            </header>
          )}
          <div
            className="article-body text-muted-foreground"
            style={{
              fontSize: "13.5px",
              lineHeight: "1.6",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * ArticleFooter — institutional previous/next navigation card for Library
 * article pages. Renders prev/next as a single bordered card with two
 * stacked rows separated by a hairline. Citation prop accepted for
 * back-compat but rendered as null (handled in metadata bar).
 *
 * Public prop signature is preserved so individual article pages need
 * no edits.
 */
export const ArticleFooter = ({
  back,
  next,
  citation,
}: {
  back?: { to: string; label: string };
  next?: { to: string; label: string };
  citation?: string;
}) => {
  void citation;
  if (!back && !next) return <div style={{ paddingBottom: "64px" }} />;

  return (
    <footer
      className="bg-background"
      style={{ paddingTop: "20px", paddingBottom: "64px" }}
    >
      <div className="page-shell">
        <div className="mx-auto w-reading-wide">
          <div style={{ ...cardChrome, padding: "18px 20px" }}>
            {back && <ArticleNavRow label="Previous" to={back.to} title={back.label} direction="back" />}
            {back && next && (
              <div
                aria-hidden
                style={{
                  height: "0.5px",
                  background: "hsl(var(--border))",
                  margin: "14px 0",
                }}
              />
            )}
            {next && <ArticleNavRow label="Next" to={next.to} title={next.label} direction="forward" />}
          </div>
        </div>
      </div>
    </footer>
  );
};

const ArticleNavRow = ({
  label,
  to,
  title,
  direction,
}: {
  label: string;
  to: string;
  title: string;
  direction: "back" | "forward";
}) => (
  <Link to={to} className="group block">
    <div
      className={
        direction === "forward"
          ? "flex flex-col items-end text-right"
          : "flex flex-col items-start"
      }
      style={{ rowGap: "4px" }}
    >
      <span
        className="font-mono uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.14em" }}
      >
        {label}
      </span>
      <span
        className="inline-flex items-center gap-2 text-foreground group-hover:text-primary transition-colors font-sans"
        style={{ fontSize: "13.5px", lineHeight: "1.4" }}
      >
        {direction === "back" && <span aria-hidden>←</span>}
        <span>{title}</span>
        {direction === "forward" && <span aria-hidden>→</span>}
      </span>
    </div>
  </Link>
);
