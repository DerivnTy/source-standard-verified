import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * FeatureItem — lightweight information item.
 *
 * No border, no background. Reads as content, not as a card. Use for
 * supporting information where card chrome would over-weight the copy.
 *
 *   variant="row"   icon left, text right   (checklists, dense lists)
 *   variant="block" icon top,  text below  (audience tiles, trust pillars)
 *
 * Icon is optional. Homepage icon hierarchy:
 *   • Section headings: at most one contextual glyph.
 *   • Checklist items: `check` only.
 *   • Navigation: chevrons/arrows only.
 *   • Trust pillars / audience blocks: no per-item glyph — the section
 *     heading already establishes context.
 * Never render the same icon twice within one section.
 */

export const FeatureItem = ({
  icon,
  title,
  desc,
  variant = "row",
  className = "",
}: {
  icon?: GlyphName;
  title: string;
  desc: string;
  variant?: "row" | "block";
  className?: string;
}) => {
  if (variant === "block") {
    return (
      <div className={`text-left ${className}`}>
        {icon && (
          <span className="text-primary/80 inline-flex" style={{ marginBottom: "10px" }}>
            <Glyph name={icon} size="md" />
          </span>
        )}

        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
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
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 text-left ${className}`}>
      {icon && (
        <span className="text-primary/80 shrink-0" style={{ paddingTop: "2px" }}>
          <Glyph name={icon} size="sm" />
        </span>
      )}

      <div className="min-w-0">
        <h3
          className="font-sans text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          className="text-muted-foreground"
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            fontWeight: 400,
            marginTop: "4px",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;
