import type { CSSProperties } from "react";

/**
 * StatusPill — the single visual for record status across the product.
 *
 * Vendor statuses: verified · unverified · under-review · suspended · removed
 * Facility statuses: greenlisted · monitoring · alert
 *
 * All colors come from semantic HSL tokens defined in index.css. No hardcoded hex.
 * The pill is compact, uppercase, right-aligned by convention, and sized to
 * sit alongside a record name without competing with it.
 */
export type StatusKey =
  | "verified"
  | "unverified"
  | "under-review"
  | "suspended"
  | "removed"
  | "greenlisted"
  | "monitoring"
  | "alert";

type Variant = {
  label: string;
  token: string; // css var name without --
  withDot?: boolean;
  pulse?: boolean;
};

const VARIANTS: Record<StatusKey, Variant> = {
  verified: { label: "Verified", token: "verified" },
  unverified: { label: "Unverified", token: "unverified" },
  "under-review": { label: "Under Review", token: "under-review", withDot: true, pulse: true },
  suspended: { label: "Suspended", token: "suspended" },
  removed: { label: "Removed", token: "muted-foreground" },
  greenlisted: { label: "Greenlisted", token: "greenlisted" },
  monitoring: { label: "Monitoring", token: "monitoring", withDot: true, pulse: true },
  alert: { label: "Status Alert", token: "alert", withDot: true },
};

export const StatusPill = ({
  status,
  size = "sm",
  className = "",
}: {
  status: StatusKey;
  size?: "sm" | "md";
  className?: string;
}) => {
  const v = VARIANTS[status];
  const color = `hsl(var(--${v.token}))`;
  const style: CSSProperties = {
    color,
    fontSize: size === "md" ? "12px" : "11px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    lineHeight: 1,
    gap: "5px",
  };
  return (
    <span
      className={`inline-flex items-center font-sans uppercase tabular-nums whitespace-nowrap ${className}`}
      style={style}
      aria-label={`Status: ${v.label}`}
    >
      {v.withDot && (
        <span
          aria-hidden
          className={`inline-block rounded-full ${v.pulse ? "animate-pulse" : ""}`}
          style={{ width: "5px", height: "5px", backgroundColor: "currentColor" }}
        />
      )}
      {v.label}
    </span>
  );
};

export default StatusPill;
