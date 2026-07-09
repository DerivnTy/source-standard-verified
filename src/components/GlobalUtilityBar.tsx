/**
 * GlobalUtilityBar, Tier 0
 *
 * A thin, permanent white announcement strip that sits above the SiteHeader
 * on every route. Single-line, never wrapping, never cut off.
 */

export const GlobalUtilityBar = () => {
  return (
    <div
      role="contentinfo"
      aria-label="Framework tagline"
      className="!bg-white"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "0.5px solid #E5E5EA",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <div
        className="flex items-center justify-center t-utility-xs whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          color: "#48484A",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <span>
          The gold standard for sourcing and clinical verification.
        </span>
      </div>
    </div>
  );
};

export default GlobalUtilityBar;
