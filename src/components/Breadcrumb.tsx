import { Fragment } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

/**
 * Breadcrumb — thin contextual nav bar between SiteHeader and page header.
 * Mono "REGISTRY · 503B · {Name}" institutional style.
 */
export const Breadcrumb = ({ items }: { items: Crumb[] }) => (
  <nav
    aria-label="Breadcrumb"
    className="border-b border-border bg-surface-muted"
  >
    <div className="container-wide py-2.5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              {i > 0 && <li aria-hidden="true" className="text-border">·</li>}
              <li>
                {c.to && !isLast ? (
                  <Link to={c.to} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground" : ""} aria-current={isLast ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  </nav>
);
