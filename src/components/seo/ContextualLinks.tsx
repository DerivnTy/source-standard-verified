import { Link } from "react-router-dom";
import type { SiteLink } from "@/seo/internalLinks";

/**
 * ContextualLinks — the automatic internal-link rail used on entity
 * pages (clinic profiles, facility records). Links are derived from the
 * record's own data by src/seo/internalLinks.ts, so authority flows
 * between profiles, clusters, and articles without hand-maintained lists.
 */
export const ContextualLinks = ({
  title,
  links,
}: {
  title: string;
  links: SiteLink[];
}) => {
  if (!links.length) return null;

  return (
    <section className="mt-6">
      <h2
        className="font-sans font-semibold uppercase text-muted-foreground"
        style={{ fontSize: "12px", letterSpacing: "0.05em" }}
      >
        {title}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="block h-full border border-border bg-card p-3 transition-colors hover:border-foreground/40"
              style={{ borderRadius: "10px" }}
            >
              <span className="block font-sans text-foreground" style={{ fontSize: "13px", lineHeight: "18px" }}>
                {l.label}
              </span>
              {l.description && (
                <span
                  className="mt-1 block text-muted-foreground"
                  style={{ fontSize: "12px", lineHeight: "17px" }}
                >
                  {l.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContextualLinks;
