import { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * BoardSection — canonical Medical Advisory Board (MAB) chrome.
 *
 * Full-width band with `border-b border-border` and alternating
 * `bg-background` / `bg-surface-muted`. Inside, a 12-col split:
 * 4-col left rail (mono `§N · CATEGORY` eyebrow + `h-section` title +
 * optional rationale) and 8-col right rail (locked to 14.5px body).
 */
export const BoardSection = ({
  n,
  category,
  title,
  rationale,
  muted = false,
  id,
  hideEyebrow = false,
  children,
}: {
  n: string | number;
  category?: string;
  title: string;
  rationale?: ReactNode;
  muted?: boolean;
  id?: string;
  hideEyebrow?: boolean;
  children: ReactNode;
}) => (
  <section
    id={id}
    className={`scroll-mt-20 border-b border-border ss-section ${
      muted ? "bg-surface-muted" : "bg-background"
    }`}
  >
    <div className="page-shell">
      <div className="mx-auto w-standard grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          {hideEyebrow ? (
            <p className="ss-eyebrow tabular-nums">
              {String(n).padStart(2, "0")}
            </p>
          ) : (
            <p className="ss-eyebrow">
              {category ? `${String(n).padStart(2, "0")} · ${category}` : `§${n}`}
            </p>
          )}
          <h2 className="ss-section-title text-foreground">{title}</h2>
          {rationale && (
            <p className="ss-lead">{rationale}</p>
          )}
        </div>
        <div className="md:col-span-8 ss-body space-y-4">
          {children}
        </div>
      </div>
    </div>
  </section>
);

/**
 * BoardDefList — MAB §3 chrome. Bordered, divided list with mono index
 * in a 2-col gutter and term/description in the 10-col body.
 *
 * `prefix` controls the index format (default `§{parent}.{i+1}`).
 */
export const BoardDefList = ({
  items,
  prefix,
}: {
  items: { term: ReactNode; description: ReactNode }[];
  prefix?: (i: number) => string;
}) => (
  <ol className="flex flex-col" style={{ rowGap: "10px" }}>
    {items.map((it, i) => {
      const index = prefix ? prefix(i) : String(i + 1).padStart(2, "0");
      return (
        <li
          key={i}
          style={{
            border: "0.5px solid hsl(var(--border))",
            borderRadius: "12px",
            background: "hsl(var(--card))",
            padding: "14px 16px",
          }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <p
              className="font-sans font-semibold text-foreground"
              style={{ fontSize: "14px", lineHeight: "1.35" }}
            >
              {it.term}
            </p>
            <span
              className="shrink-0 font-mono tabular-nums uppercase text-muted-foreground/80"
              style={{ fontSize: "11px", letterSpacing: "0.06em" }}
            >
              {index}
            </span>
          </div>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "13px", lineHeight: "1.55", marginTop: "6px" }}
          >
            {it.description}
          </p>
        </li>
      );
    })}
  </ol>
);

/**
 * BoardFooterNav — bordered footer bar with hairline-divided cells.
 * Mirrors the MAB "Read deeper" pattern.
 */
export const BoardFooterNav = ({
  back,
  next,
}: {
  back?: { to: string; label: string };
  next?: { to: string; label: string };
}) => (
  <section className="border-b border-border bg-background">
    <div className="page-shell py-8">
      <div className="mx-auto w-standard border border-border bg-surface-muted">
        <ul className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {back && (
            <li className="px-5 py-4">
              <Link to={back.to} className="t-utility-xs text-foreground hover:text-primary">
                ← {back.label}
              </Link>
            </li>
          )}
          {next && (
            <li className="px-5 py-4 md:text-right">
              <Link to={next.to} className="t-utility-xs text-foreground hover:text-primary">
                {next.label} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  </section>
);

/**
 * BoardCiteFooter — final "Cite as ·" band shared by every MAB-DNA page.
 */
export const BoardCiteFooter = ({ citation: _citation }: { citation?: string }) => {
  // Citation removed sitewide — doc ID + updated date live in top metadata bar
  return null;
};
