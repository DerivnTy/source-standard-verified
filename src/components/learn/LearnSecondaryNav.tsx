import { NavLink } from "react-router-dom";

export type LearnSection = "education" | "faq" | "news" | "home";

const LINKS: { id: LearnSection; label: string; to: string }[] = [
  { id: "home", label: "Overview", to: "/learn" },
  { id: "education", label: "Education", to: "/learn/education" },
  { id: "faq", label: "FAQ", to: "/learn/faq" },
  { id: "news", label: "News & Insights", to: "/learn/news" },
];

/**
 * LearnSecondaryNav — pill row shown under the breadcrumb on Learn
 * landing pages. Reinforces that everything you see is inside Learn.
 * Hidden on article pages to keep chrome quiet.
 */
export const LearnSecondaryNav = ({ active }: { active: LearnSection }) => (
  <div className="bg-background border-b border-border/50">
    <div className="page-shell">
      <div className="mx-auto w-standard">
        <nav
          aria-label="Learn sections"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          {LINKS.map((l) => {
            const isActive = l.id === active;
            return (
              <NavLink
                key={l.id}
                to={l.to}
                end
                className="inline-flex items-center justify-center font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97]"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  height: "30px",
                  padding: "0 14px",
                  borderRadius: "20px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: isActive ? "hsl(var(--foreground))" : "hsl(var(--card))",
                  color: isActive ? "hsl(var(--background))" : "hsl(var(--foreground) / 0.75)",
                }}
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  </div>
);

export default LearnSecondaryNav;
