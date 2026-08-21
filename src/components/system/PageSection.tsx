import { CSSProperties, ReactNode } from "react";
import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * Page section. Tight heading-to-body, modest vertical rhythm.
 * Compose pages by choosing first / compact / last rather than
 * stacking identical airy bands.
 */
export const PageSection = ({
  id,
  icon,
  title,
  intro,
  cta,
  children,
  bordered = true,
  compact = false,
  first = false,
  last = false,
  className = "",
  pb,
}: {
  id?: string;
  icon?: Exclude<GlyphName, "minus" | "check">;
  title?: string;
  intro?: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
  bordered?: boolean;
  compact?: boolean;
  first?: boolean;
  last?: boolean;
  className?: string;
  pb?: string;
}) => {
  const padTop = first ? 28 : compact ? 20 : 24;
  const padBottom = last ? 28 : compact ? 20 : 24;

  const inlineStyle: CSSProperties = {
    paddingTop: pb && first ? undefined : padTop,
    paddingBottom: pb ?? padBottom,
  };

  return (
    <section
      aria-labelledby={id}
      className={`bg-background text-left ${bordered && !last ? "border-b border-border" : ""} ${className}`}
      style={inlineStyle}
    >
      <div className="page-shell">
        <div className="mx-auto w-wide">
          {title && (
            <div className="flex items-center gap-2">
              {icon && (
                <span className="text-primary/80">
                  <Glyph name={icon} size="md" />
                </span>
              )}
              <h2
                id={id}
                className="t-section-title-sm text-foreground"
                style={{ margin: 0 }}
              >
                {title}
              </h2>
            </div>
          )}

          {intro && (
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                fontWeight: 400,
                marginTop: title ? "8px" : 0,
                maxWidth: "64ch",
              }}
            >
              {intro}
            </p>
          )}

          {children && (
            <div style={{ marginTop: title || intro ? "10px" : 0 }}>{children}</div>
          )}

          {cta && <div style={{ marginTop: "14px" }}>{cta}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageSection;
