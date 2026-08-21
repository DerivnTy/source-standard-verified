import { CSSProperties, ReactNode } from "react";
import { Glyph, type GlyphName } from "./GlyphIcon";

type SectionLayout = "split" | "reading" | "wide";

/**
 * Page section. Default composition is a split editorial block:
 * title on the left axis, body on the right. That fills the 1120 shell
 * instead of stacking a narrow centered column.
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
  layout = "split",
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
  layout?: SectionLayout;
  className?: string;
  pb?: string;
}) => {
  const padTop = first ? 56 : compact ? 40 : 52;
  const padBottom = last ? 64 : compact ? 40 : 52;

  const inlineStyle: CSSProperties = {
    paddingTop: pb && first ? undefined : padTop,
    paddingBottom: pb ?? padBottom,
  };

  const heading = title ? (
    <div className="flex items-start gap-2">
      {icon && (
        <span className="text-primary/80 mt-1">
          <Glyph name={icon} size="md" />
        </span>
      )}
      <h2 id={id} className="t-section-title-sm text-foreground" style={{ margin: 0 }}>
        {title}
      </h2>
    </div>
  ) : null;

  const introEl = intro ? (
    <p
      className="text-muted-foreground"
      style={{
        fontSize: "16px",
        lineHeight: 1.65,
        fontWeight: 400,
        marginTop: title && layout !== "split" ? "12px" : 0,
        maxWidth: "40rem",
      }}
    >
      {intro}
    </p>
  ) : null;

  const body = (
    <>
      {layout === "split" ? introEl : null}
      {children && (
        <div style={{ marginTop: layout === "split" && intro ? "16px" : 0 }}>{children}</div>
      )}
      {cta && <div className="flex flex-wrap gap-2" style={{ marginTop: "24px" }}>{cta}</div>}
    </>
  );

  return (
    <section aria-labelledby={id} className={`bg-background ${className}`}>
      <div className="page-shell" style={inlineStyle}>
        {layout === "split" ? (
          <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              {heading}
            </div>
            <div className="min-w-0 max-w-[40rem] text-left">
              {body}
            </div>
          </div>
        ) : layout === "wide" ? (
          <div className="text-left">
            {heading}
            {introEl}
            <div style={{ marginTop: title || intro ? "20px" : 0 }}>{children}</div>
            {cta && <div className="flex flex-wrap gap-2" style={{ marginTop: "24px" }}>{cta}</div>}
          </div>
        ) : (
          <div className="w-reading text-left">
            {heading}
            {introEl}
            {children && (
              <div style={{ marginTop: title || intro ? "16px" : 0 }}>{children}</div>
            )}
            {cta && <div className="flex flex-wrap gap-2" style={{ marginTop: "24px" }}>{cta}</div>}
          </div>
        )}
      </div>
      {bordered && !last && (
        <div className="page-shell">
          <div className="border-t border-border" />
        </div>
      )}
    </section>
  );
};

export default PageSection;
