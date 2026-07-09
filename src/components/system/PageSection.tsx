import { ReactNode } from "react";
import { Glyph, type GlyphName } from "./GlyphIcon";

/**
 * PageSection, the canonical consumer-page section pattern.
 *
 *   [optional glyph]  Question heading
 *   Short supporting sentence (optional)
 *   Content block
 *   Optional CTA row
 *
 * Owns its own compact vertical rhythm so tightening consumer pages
 * does NOT require changing global .section-pad tokens. Framework and
 * legal doc pages continue to inherit the sitewide rhythm untouched.
 *
 * No numbered eyebrows. Pages that need §-style numbering keep their
 * existing scaffolding.
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
  className = "",
}: {
  id?: string;
  icon?: GlyphName;
  title: string;
  intro?: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
  bordered?: boolean;
  compact?: boolean;
  className?: string;
}) => {
  const padY = compact ? "20px" : "28px";
  const introMarginTop = compact ? "8px" : "10px";
  const childrenMarginTop = compact ? (intro ? "12px" : "10px") : intro ? "16px" : "14px";
  const ctaMarginTop = compact ? "12px" : "16px";
  return (
    <section
      aria-labelledby={id}
      className={`bg-background text-left ${bordered ? "border-b border-border" : ""} ${className}`}
      style={{ paddingTop: padY, paddingBottom: padY }}
    >
      <div className="page-shell">
        <div className="mx-auto w-standard">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-primary/80">
                <Glyph name={icon} size="md" />
              </span>
            )}
            <h2
              id={id}
              className="font-sans text-foreground"
              style={{
                fontSize: "22px",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>

          {intro && (
            <p
              className="text-muted-foreground"
              style={{
                fontSize: "15px",
                lineHeight: 1.65,
                fontWeight: 400,
                marginTop: introMarginTop,
                maxWidth: "64ch",
              }}
            >
              {intro}
            </p>
          )}

          {children && (
            <div style={{ marginTop: childrenMarginTop }}>{children}</div>
          )}

          {cta && <div style={{ marginTop: ctaMarginTop }}>{cta}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageSection;

