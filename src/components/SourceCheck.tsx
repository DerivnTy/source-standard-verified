/**
 * SourceCheck — universal trust glyph.
 *
 * Safety-Blue circle + white check, used everywhere trust is asserted:
 * status badges, "Reviewed by" labels, registry summary cards, list
 * bullets in About / Apply / How It Works, verified-state rows.
 */
const SIZE_PX: Record<NonNullable<SourceCheckProps["size"]>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
};

type SourceCheckProps = {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
  "aria-label"?: string;
};

export const SourceCheck = ({
  size = "sm",
  variant = "solid",
  className = "",
  "aria-label": ariaLabel = "Source verified",
}: SourceCheckProps) => {
  const px = SIZE_PX[size];
  const isSolid = variant === "solid";
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={px}
      height={px}
      viewBox="0 0 20 20"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        fill={isSolid ? "hsl(var(--primary))" : "transparent"}
        stroke="hsl(var(--primary))"
        strokeWidth={isSolid ? 0 : 1.5}
      />
      <path
        d="M5.75 10.25 L8.6 13 L14.25 7"
        fill="none"
        stroke={isSolid ? "hsl(var(--primary-foreground))" : "hsl(var(--primary))"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SourceCheck;
