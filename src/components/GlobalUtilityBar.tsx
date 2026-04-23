import { useLocation } from "react-router-dom";

/**
 * GlobalUtilityBar — Tier 0
 *
 * A thin, permanent institutional metadata strip that sits above the
 * SiteHeader on every route. Content is identical sitewide — it expresses
 * framework-level identity, not per-page document metadata.
 */

export const GlobalUtilityBar = () => {
  const { pathname } = useLocation();
  const isNavy = pathname === "/";

  return (
    <div
      role="contentinfo"
      aria-label="Framework metadata"
      className={
        isNavy
          ? "bg-[hsl(var(--navy-surface))] border-b border-white/10"
          : "bg-background border-b border-border/60"
      }
    >
      <div
        className={`container-wide flex items-center justify-between gap-6 py-1 t-meta-note font-mono ${
          isNavy ? "text-white/65" : "text-muted-foreground/80"
        }`}
      >
        <div className="flex items-center gap-5 min-w-0">
          <span className="truncate">Source Standard Framework</span>
          <span className="hidden sm:inline">Public Reference System</span>
          <span className="hidden sm:inline">
            Status ·{" "}
            <span className={isNavy ? "text-white/90" : "text-foreground/85"}>
              Active
            </span>
          </span>
          <span className="hidden md:inline">United States</span>
        </div>
        <div className="flex items-center shrink-0">
          <span>Updated April 21, 2026</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalUtilityBar;
