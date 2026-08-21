import { Link } from "react-router-dom";
import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * DataStrip, the shared compact content card used across consumer pages.
 *
 * Decorative "01 / 03" counters have been removed. Where a visual cue
 * aids scanning, use `icon` from the sitewide Glyph vocabulary.
 * Padding is intentionally denser than the legacy version — repeated
 * patterns should occupy less vertical space once a visitor has
 * learned the component once.
 */
export const DataStrip = ({
  title,
  desc,
  to,
  icon,
}: {
  title: string;
  desc: string;
  to?: string;
  icon?: GlyphName;
}) => {
  const Inner = (
    <>
      <div className="flex items-start gap-2.5">
        {icon && (
          <span className="text-primary/80 shrink-0" style={{ paddingTop: "2px" }}>
            <Glyph name={icon} size="sm" />
          </span>
        )}
        <h3
          className="font-sans text-foreground min-w-0"
          style={{
            fontSize: "16px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-muted-foreground"
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          fontWeight: 400,
          marginTop: "6px",
        }}
      >
        {desc}
      </p>
      {to && (
        <div className="mt-2">
          <span
            className="font-sans font-bold uppercase text-primary"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View ›
          </span>
        </div>
      )}
    </>
  );
  const baseStyle: React.CSSProperties = {
    border: "0.5px solid hsl(var(--border))",
    borderRadius: "12px",
    padding: "14px 16px",
  };
  return to ? (
    <Link
      to={to}
      className="group block bg-card transition-all active:scale-[0.97] hover:bg-muted"
      style={baseStyle}
    >
      {Inner}
    </Link>
  ) : (
    <div className="bg-card" style={baseStyle}>
      {Inner}
    </div>
  );
};

export default DataStrip;
