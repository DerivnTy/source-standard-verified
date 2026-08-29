import { Link } from "react-router-dom";

export type RelatedLink = {
  to: string;
  label: string;
  description?: string;
  meta?: string;
};

/**
 * RelatedRail, the contextual continuation module.
 *
 * Every page should end, or accompany its main column, with concrete
 * next destinations. Prevents dead ends across the platform.
 */
export const RelatedRail = ({
  title,
  links,
  columns = 1,
  className = "",
}: {
  title: string;
  links: RelatedLink[];
  columns?: 1 | 2;
  className?: string;
}) => {
  if (!links.length) return null;
  return (
    <nav aria-label={title} className={className}>
      <p className="t-utility-xs text-muted-foreground">{title}</p>
      <ul
        className={`mt-2.5 border-t border-border ${
          columns === 2 ? "sm:grid sm:grid-cols-2 sm:gap-x-8" : ""
        }`}
      >
        {links.map((link) => (
          <li key={link.to + link.label} className="border-b border-border">
            <Link to={link.to} className="block py-3 group">
              <span
                className="text-foreground group-hover:text-primary transition-colors"
                style={{ fontSize: "15px", lineHeight: 1.45, fontWeight: 500 }}
              >
                {link.label}
              </span>
              {link.description && (
                <span
                  className="block text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.55, marginTop: "3px" }}
                >
                  {link.description}
                </span>
              )}
              {link.meta && (
                <span
                  className="block font-mono uppercase text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.08em", marginTop: "5px" }}
                >
                  {link.meta}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
