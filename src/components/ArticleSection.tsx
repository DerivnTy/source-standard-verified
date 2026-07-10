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
 * Default (`variant="card"`) renders a bordered card with optional `§N`
 * ordinal and heading. Used by Library pages; do not change the default.
 *
 * `variant="prose"` renders a plain editorial section on the page
 * background — no border, no ordinal, continuous reading rhythm.
 * Used by Learn article templates.
 *
 * `variant="callout"` renders a small bordered/hairline callout with an
 * eyebrow label ("Definition", "Key takeaway", etc.) passed via `kind`.
 */
export const ArticleSection = ({
  n,
  title,
  id,
  variant = "card",
  kind,
  children,
}: {
  n?: string | number;
  title?: string;
  id?: string;
  variant?: "card" | "prose" | "callout";
  kind?: string;
  children: ReactNode;
}) => {
  // ── Callout ─────────────────────────────────────────────────
  if (variant === "callout") {
    return (
      <section id={id} className="scroll-mt-24 bg-background" style={{ paddingTop: "28px" }}>
        <div className="page-shell">
          <div className="mx-auto w-reading-wide">
            <div
              style={{
                padding: "16px 20px",
              }}
            >
              {kind && (
                <p
                  className="font-mono uppercase text-muted-foreground"
                  style={{ fontSize: "10px", letterSpacing: "0.12em", marginBottom: "8px" }}
                >
                  {kind}
                </p>
              )}
              {title && (
                <h2 className="t-section-title-sm text-foreground">{title}</h2>
              )}
              <div
                className="text-muted-foreground"
                style={{ fontSize: "14px", lineHeight: 1.65, marginTop: title ? "8px" : "0" }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Prose (editorial, no card) ──────────────────────────────
  if (variant === "prose") {
    return (
      <section id={id} className="scroll-mt-24 bg-background" style={{ paddingTop: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
            {title && (
              <h2
                className="t-section-title-sm text-foreground"
                style={{ marginBottom: "8px" }}
              >
                {title}
              </h2>
            )}
            <div className="t-article-prose">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }


  // ── Card (default, backward-compatible) ───────────────────────
  return (
    <section id={id} className="scroll-mt-24 bg-background" style={{ paddingTop: "20px" }}>
      <div className="page-shell">
        <div className="mx-auto w-reading-wide">
          <div style={{ ...cardChrome, padding: "24px" }}>
            {(n !== undefined || title) && (
              <header style={{ marginBottom: "14px" }}>
                {n !== undefined && (
                  <p
                    className="font-mono uppercase text-muted-foreground"
                    style={{ fontSize: "11px", letterSpacing: "0.08em", marginBottom: "6px" }}
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
};

/**
 * ArticleFooter, lightweight article navigation for Library pages.
 *
 * Renders a single divider + back link directly on the page background
 * with no card chrome. Next-article and citation props accepted for
 * back-compat but no longer rendered.
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
  void next;
  void citation;
  if (!back) return <div style={{ paddingBottom: "24px" }} />;

  return (
    <footer
      className="bg-background article-footer"
      style={{ paddingTop: "24px", paddingBottom: "32px" }}
    >
      <div className="page-shell">
        <div className="mx-auto w-reading-wide">
          <div
            aria-hidden
            style={{
              height: "0.5px",
              background: "hsl(var(--border))",
              marginBottom: "18px",
            }}
          />
          <Link
            to={back.to}
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            style={{ fontSize: "13.5px", lineHeight: "1.4" }}
          >
            <span aria-hidden>←</span>
            <span>{back.label}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
