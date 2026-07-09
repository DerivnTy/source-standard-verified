import {
  Check,
  Minus,
  Circle,
  Search,
  ShieldCheck,
  GraduationCap,
  Handshake,
  Scale,
  type LucideIcon,
} from "lucide-react";

/**
 * Glyph, the sitewide icon vocabulary.
 *
 * One meaning per glyph across the entire product. Never reuse a glyph
 * to mean something different on another page. Consistency is what lets
 * returning visitors read the interface without thinking.
 *
 *   check          — established / included / verified
 *   minus          — limitation / excluded / does not mean
 *   circle         — category / neutral grouping / status dot
 *   search         — registry / discovery
 *   shield-check   — Source Standard verification
 *   graduation-cap — education / Learn
 *   handshake      — partners / collaboration
 *   scale          — governance / accountability / standards
 *
 * Rules (enforced by this wrapper):
 *   • 1.25px stroke
 *   • currentColor only, no fills
 *   • no backgrounds, no colored circles
 *   • sizes xs (12), sm (14), md (16)
 */
export type GlyphName =
  | "check"
  | "minus"
  | "circle"
  | "search"
  | "shield-check"
  | "graduation-cap"
  | "handshake"
  | "scale";

const GLYPHS: Record<GlyphName, LucideIcon> = {
  check: Check,
  minus: Minus,
  circle: Circle,
  search: Search,
  "shield-check": ShieldCheck,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  scale: Scale,
};

const SIZE_PX: Record<"xs" | "sm" | "md", number> = {
  xs: 12,
  sm: 14,
  md: 16,
};

export const Glyph = ({
  name,
  size = "sm",
  className = "",
  "aria-label": ariaLabel,
}: {
  name: GlyphName;
  size?: "xs" | "sm" | "md";
  className?: string;
  "aria-label"?: string;
}) => {
  const Icon = GLYPHS[name];
  const px = SIZE_PX[size];
  return (
    <Icon
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      width={px}
      height={px}
      strokeWidth={1.25}
      className={`inline-block shrink-0 ${className}`}
    />
  );
};

export default Glyph;
