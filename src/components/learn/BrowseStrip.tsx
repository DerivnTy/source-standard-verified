import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type BrowseLink = { to: string; label: string };

/**
 * BrowseStrip — footer strip that keeps users inside Learn. Renders a
 * quiet eyebrow, one primary link, and any number of secondary links.
 * Two strips (category + Learn) stack at the bottom of every article
 * page so no page is a dead end.
 */
export const BrowseStrip = ({
  eyebrow,
  primary,
  secondary = [],
}: {
  eyebrow: string;
  primary: BrowseLink;
  secondary?: BrowseLink[];
}) => (
  <section
    className="bg-background border-t border-border/50"
    style={{ paddingTop: "20px", paddingBottom: "20px" }}
  >
    <div className="page-shell">
      <div className="mx-auto w-reading-wide">
        <p
          className="font-mono uppercase text-muted-foreground"
          style={{ fontSize: "10px", letterSpacing: "0.14em", marginBottom: "8px" }}
        >
          {eyebrow}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to={primary.to}
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em" }}
          >
            <span>{primary.label}</span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-[3px]"
              style={{ width: 14, height: 14 }}
            />
          </Link>
          {secondary.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
              style={{
                fontSize: "13px",
                textDecoration: "underline",
                textDecorationThickness: "0.5px",
                textUnderlineOffset: "3px",
              }}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BrowseStrip;
