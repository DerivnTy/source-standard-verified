import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type LearnCrumb = { label: string; to?: string };

/**
 * LearnBreadcrumbs — persistent contextual trail rendered above every
 * Learn page. Clear editorial navigation: sans-serif, medium weight,
 * generous padding. Never tiny utility metadata.
 *
 * Desktop: full trail with chevrons. Mobile: parent-only "← Parent" so
 * it never wraps or steals height on 390px.
 */
export const LearnBreadcrumbs = ({ items }: { items: LearnCrumb[] }) => {
  if (!items || items.length === 0) return null;

  const parent = items.length > 1 ? items[items.length - 2] : items[0];

  const linkStyle = {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.06em",
  } as const;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[hsl(var(--navy-surface))]"
    >
      <div className="page-shell">
        <div
          className="mx-auto w-standard flex items-center"
          style={{ minHeight: "40px", paddingTop: "14px", paddingBottom: "14px" }}
        >
          {/* Mobile: single parent link */}
          <div className="md:hidden">
            {parent.to ? (
              <Link
                to={parent.to}
                className="inline-flex items-center gap-2 font-sans text-white/80 hover:text-white transition-all duration-200 group"
                style={linkStyle}
              >
                <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">
                  ←
                </span>
                <span>{parent.label}</span>
              </Link>
            ) : (
              <span
                className="font-sans text-white/80"
                style={linkStyle}
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
                        className="font-sans text-white/80 hover:text-white transition-all duration-200"
                        style={linkStyle}
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span
                        className={`font-sans ${
                          last ? "text-white" : "text-white/80"
                        }`}
                        style={linkStyle}
                        aria-current={last ? "page" : undefined}
                      >
                        {c.label}
                      </span>
                    )}
                  </li>
                  {!last && (
                    <li aria-hidden className="inline-flex items-center text-white/40">
                      <ChevronRight style={{ width: 14, height: 14, strokeWidth: 1.5 }} />
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
