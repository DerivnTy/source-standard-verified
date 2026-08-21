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
    style={{ paddingTop: "16px", paddingBottom: "20px" }}
  >
    <div className="page-shell">
      <div className="mx-auto w-wide">
        <Link
          to={to}
          className="inline-flex items-center gap-2 font-sans text-muted-foreground hover:text-foreground transition-all duration-200 group"
          style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.06em" }}
        >
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>{label}</span>
        </Link>
      </div>
    </div>
  </nav>
);
