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
  children,
}: {
  n: string | number;
  category: string;
  title: string;
  rationale?: ReactNode;
  muted?: boolean;
  id?: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className={`scroll-mt-20 border-b border-border ${
      muted ? "bg-surface-muted" : "bg-background"
    }`}
  >
    <div className="page-shell section-pad">
      <div className="mx-auto w-standard grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="t-utility-xs text-muted-foreground mb-4">
            §{n} · {category}
          </p>
          <h2 className="t-section-title-sm text-foreground">{title}</h2>
          {rationale && (
            <p className="mt-4 t-body-sm text-muted-foreground">{rationale}</p>
          )}
        </div>
        <div className="md:col-span-8 t-body-md text-muted-foreground space-y-5">
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
  <ol className="border border-border bg-background divide-y divide-border">
    {items.map((it, i) => (
      <li
        key={i}
        className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline"
      >
        <div className="col-span-2 meta text-primary">
          {prefix ? prefix(i) : String(i + 1).padStart(2, "0")}
        </div>
        <div className="col-span-10">
          <p className="t-body-strong text-foreground">
            {it.term}
          </p>
          <p className="mt-1.5 t-body-sm text-muted-foreground">
            {it.description}
          </p>
        </div>
      </li>
    ))}
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
    <div className="container-wide py-8">
      <div className="border border-border bg-surface-muted">
        <ul className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {back && (
            <li className="px-5 py-4">
              <Link
                to={back.to}
                className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
              >
                ← {back.label}
              </Link>
            </li>
          )}
          {next && (
            <li className="px-5 py-4 md:text-right">
              <Link
                to={next.to}
                className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
              >
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
