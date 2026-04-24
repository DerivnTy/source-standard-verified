/**
 * GlobalUtilityBar — Tier 0
 *
 * A thin, permanent white announcement strip that sits above the SiteHeader
 * on every route. Single-line, never wrapping, never cut off.
 */

export const GlobalUtilityBar = ({ transparent = false }: { transparent?: boolean }) => {
  return (
    <div
      role="contentinfo"
      aria-label="Framework tagline"
      className={transparent ? "" : "!bg-white"}
      style={{
        backgroundColor: transparent ? "transparent" : "#FFFFFF",
        borderBottom: transparent ? "0.5px solid rgba(255,255,255,0.08)" : "0.5px solid #E5E5EA",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
        transition: "background-color 250ms ease, border-color 250ms ease, color 250ms ease",
      }}
    >
      <div
        className="flex items-center justify-center font-mono uppercase whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          color: transparent ? "rgba(255,255,255,0.65)" : "#48484A",
          fontSize: "10px",
          letterSpacing: "0.08em",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <span className="hidden sm:inline">
          The gold standard for sourcing and clinical verification.
        </span>
        <span
          className="sm:hidden"
          style={{ fontSize: "9px" }}
        >
          The gold standard for sourcing and clinical verification.
        </span>
      </div>
    </div>
  );
};

export default GlobalUtilityBar;
