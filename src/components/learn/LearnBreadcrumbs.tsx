import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type LearnCrumb = { label: string; to?: string };

/**
 * LearnBreadcrumbs — persistent contextual trail rendered above every
 * Learn page. Reads as quiet metadata: mono uppercase, hairline underline,
 * blur backdrop. Never a decorative element.
 *
 * Desktop: full trail with chevrons. Mobile: parent-only "← Parent" so
 * it never wraps or steals height on 390px.
 */
export const LearnBreadcrumbs = ({ items }: { items: LearnCrumb[] }) => {
  if (!items || items.length === 0) return null;

  const parent = items.length > 1 ? items[items.length - 2] : items[0];

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-background/70 border-b border-border/50"
      style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
    >
      <div className="page-shell">
        <div
          className="mx-auto w-standard flex items-center"
          style={{ minHeight: "40px", paddingTop: "8px", paddingBottom: "8px" }}
        >
          {/* Mobile: single parent link */}
          <div className="md:hidden">
            {parent.to ? (
              <Link
                to={parent.to}
                className="inline-flex items-center gap-1.5 font-mono uppercase text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                <span aria-hidden>←</span>
                <span>{parent.label}</span>
              </Link>
            ) : (
              <span
                className="font-mono uppercase text-muted-foreground"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                {parent.label}
              </span>
            )}
          </div>

          {/* Desktop: full crumb trail */}
          <ol
            className="hidden md:flex items-center flex-wrap"
            style={{ gap: "6px", listStyle: "none", padding: 0, margin: 0 }}
          >
            {items.map((c, i) => {
              const last = i === items.length - 1;
              return (
                <Fragment key={`${c.label}-${i}`}>
                  <li className="inline-flex items-center">
                    {c.to && !last ? (
                      <Link
                        to={c.to}
                        className="font-mono uppercase text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span
                        className={`font-mono uppercase ${
                          last ? "text-foreground" : "text-muted-foreground"
                        }`}
                        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                        aria-current={last ? "page" : undefined}
                      >
                        {c.label}
                      </span>
                    )}
                  </li>
                  {!last && (
                    <li aria-hidden className="inline-flex items-center text-muted-foreground/50">
                      <ChevronRight style={{ width: 11, height: 11, strokeWidth: 1.5 }} />
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default LearnBreadcrumbs;
