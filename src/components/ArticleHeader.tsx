import { ReactNode } from "react";
import { HeroPattern } from "./HeroPattern";

export type ArticleMetaItem = { label: string; value: ReactNode };

const cardChrome = {
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
  background: "hsl(var(--card))",
} as const;

/**
 * ArticleHeader, consumer-facing article header.
 *
 * Two rendering paths:
 *   • If `category` is passed → navy editorial masthead. Uppercase mono
 *     category eyebrow, white title, muted-white lead. Consistent with
 *     every other "meant to read" page across the site.
 *   • Otherwise → backward-compatible bordered card (Library legacy).
 */
export const ArticleHeader = ({
  eyebrow: _eyebrow,
  title,
  lead,
  category,
  metadata = [],
  backHref: _backHref,
  backLabel: _backLabel,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  category?: string;
  metadata?: ArticleMetaItem[];
  /** @deprecated Top-of-page back link removed. Render <EditorialBackLink /> at the page footer instead. */
  backHref?: string;
  /** @deprecated Top-of-page back link removed. Render <EditorialBackLink /> at the page footer instead. */
  backLabel?: string;
}) => {
  const updated = metadata.find(
    (m) => typeof m.label === "string" && m.label.toLowerCase().includes("updated"),
  );

  // ── Navy editorial masthead (category path) ─────────────────────
  if (category) {
    return (
      <header className="relative overflow-hidden bg-[hsl(var(--navy-surface))] border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 40%, hsl(var(--navy-surface-2)) 0%, transparent 70%)",
          }}
        />
        <HeroPattern opacity={0.02} stroke="white" cellSize={32} />
        <div
          className="relative z-10 page-shell"
          style={{ paddingTop: "clamp(44px, 6.5vh, 68px)", paddingBottom: "clamp(28px, 4vh, 40px)" }}
        >
          <div className="mx-auto w-reading-wide">
            <p
              className="font-mono uppercase"
              style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {category.toUpperCase()}
          </p>

            <h1
              className="t-article-title !text-white !mt-0"
              style={{ marginTop: "22px", textWrap: "balance" }}
            >
              {title}
            </h1>

            {lead && (
              <p
                className="ss-lead !text-white/70 max-w-[68ch]"
                style={{ marginTop: "14px", textWrap: "balance" }}
              >
                {lead}
              </p>
            )}
          </div>
        </div>
      </header>
    );
  }

  // ── Backward-compatible card path (Library pages) ───────────────
  void _eyebrow;

  return (
    <header className="bg-background">
      <div className="page-shell pt-5">
        <div className="mx-auto w-reading-wide">
          <div style={{ ...cardChrome, padding: "24px" }}>

            <h1
              className="t-article-title text-foreground max-w-[26ch]"
              style={{ marginTop: "12px" }}
            >
              {title}
            </h1>

            {lead && (
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  marginTop: "12px",
                  maxWidth: "68ch",
                }}
              >
                {lead}
              </p>
            )}

            {updated && (
              <p
                className="text-muted-foreground"
                style={{
                  fontSize: "10px",
                  marginTop: "12px",
                }}
              >
                Updated {updated.value}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
