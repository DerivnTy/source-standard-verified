import { Link } from "react-router-dom";

/**
 * EditorialBackLink — quiet footer navigation used at the bottom of
 * long-form institutional and article pages. Never rendered at the top
 * of a page; the reading experience should not begin with an exit.
 */
export const EditorialBackLink = ({
  to = "/",
  label = "Back to Home",
}: {
  to?: string;
  label?: string;
}) => (
  <nav
    aria-label="Page footer navigation"
    className="bg-background"
    style={{ paddingTop: "32px", paddingBottom: "56px" }}
  >
    <div className="page-shell">
      <div className="mx-auto w-reading-wide">
        <Link
          to={to}
          className="inline-flex items-center gap-1.5 font-mono uppercase text-muted-foreground hover:text-foreground transition-colors group"
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}
        >
          <span
            aria-hidden
            className="transition-transform group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>{label}</span>
        </Link>
      </div>
    </div>
  </nav>
);
