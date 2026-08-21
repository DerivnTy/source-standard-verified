import { CSSProperties, ReactNode } from "react";
import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * Centered reading section. Desktop column is centered on the page.
 * Mobile type is centered. Desktop type is left-aligned inside the column.
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
  const padTop = first ? 40 : compact ? 32 : 40;
  const padBottom = last ? 48 : compact ? 32 : 40;

  const inlineStyle: CSSProperties = {
    paddingTop: pb && first ? undefined : padTop,
    paddingBottom: pb ?? padBottom,
  };

  return (
    <section aria-labelledby={id} className={`bg-background ${className}`}>
      <div className="page-shell" style={inlineStyle}>
        <div className="mx-auto w-reading text-center">
          {title && (
            <div className="flex items-center justify-center gap-2">
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
                fontSize: "16px",
                lineHeight: 1.65,
                fontWeight: 400,
                marginTop: title ? "12px" : 0,
              }}
            >
              {intro}
            </p>
          )}

          {children && (
            <div style={{ marginTop: title || intro ? "16px" : 0 }}>{children}</div>
          )}

          {cta && (
            <div className="flex justify-center" style={{ marginTop: "20px" }}>
              {cta}
            </div>
          )}
        </div>
      </div>
      {bordered && !last && (
        <div className="page-shell">
          <div className="mx-auto w-reading border-t border-border" />
        </div>
      )}
    </section>
  );
};

export default PageSection;
