import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { FeatureItem } from "./FeatureItem";
import type { GlyphName } from "./GlyphIcon";

/**
 * FeatureLink — lightweight navigational row.
 *
 * The interactive counterpart to FeatureItem. Same visual language, no
 * card chrome, but reads as clickable: hover tint, chevron nudge, cursor,
 * and a 44px mobile touch target.
 *
 * Use inside educational and reference content where a full NavCard would
 * over-weight the row but a bare linked FeatureItem would read as static
 * text.
 *
 * FeatureItem  → informational, never wrap in a Link.
 * FeatureLink  → lightweight destination row within content.
 * NavCard      → high-emphasis destination card with hairline border.
 *
 * Rule: if it navigates, it must visibly behave like navigation.
 */
export const FeatureLink = ({
  to,
  title,
  desc,
  icon,
  variant = "block",
  eyebrow,
  className = "",
}: {
  to: string;
  title: string;
  desc?: string;
  icon?: GlyphName;
  variant?: "row" | "block";
  eyebrow?: string;
  className?: string;
}) => (
  <Link
    to={to}
    aria-label={title}
    className={`group flex items-center justify-between gap-4 -mx-3 md:-mx-4 px-3 md:px-4 py-3 rounded-[2px] cursor-pointer transition-colors duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:bg-muted/40 focus-visible:ring-1 focus-visible:ring-border [&_h3]:transition-colors [&_h3]:text-foreground/85 group-hover:[&_h3]:text-foreground hover:[&_h3]:text-foreground ${className}`}
    style={{ minHeight: "44px" }}
  >
    <div className="min-w-0 flex-1">
      {eyebrow && (
        <p
          className="font-mono uppercase text-muted-foreground tabular-nums"
          style={{
            fontSize: "10px",
            letterSpacing: "0.08em",
            marginBottom: "4px",
          }}
        >
          {eyebrow}
        </p>
      )}
      <FeatureItem
        variant={variant}
        title={title}
        desc={desc}
        icon={icon}
      />
    </div>
    <ArrowRight
      aria-hidden
      strokeWidth={1.25}
      className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-foreground"
      style={{ width: 16, height: 16 }}
    />
  </Link>
);

export default FeatureLink;
