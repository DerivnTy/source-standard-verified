import {
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";

// Stamp-style variants per status: background tint + border + text color.
const stampFor: Record<VendorPublicStatus, string> = {
  verified: "bg-verified-soft border-verified/30 text-verified",
  "under-review": "bg-under-review-soft border-under-review/30 text-under-review",
  suspended: "bg-suspended-soft border-suspended/30 text-suspended",
  unverified: "bg-unverified-soft border-unverified/25 text-unverified",
  removed:
    "bg-muted/40 border-dashed border-muted-foreground/30 text-muted-foreground",
};

// Accept either the new VendorPublicStatus or the legacy strings, so existing
// callers (e.g., older verified-vendor data) continue to render.
type AnyStatus = VendorPublicStatus | "pending" | "expired";

const normalize = (s: AnyStatus): VendorPublicStatus => {
  if (s === "pending") return "under-review";
  if (s === "expired") return "suspended";
  return s;
};

export const StatusBadge = ({
  status,
  size = "sm",
}: {
  status: AnyStatus;
  size?: "sm" | "md";
}) => {
  const key = normalize(status);
  const text = size === "md" ? "text-[11px]" : "text-[10px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-[3px] rounded-[2px] border font-mono font-semibold uppercase tracking-[0.14em] tabular-nums ${text} ${stampFor[key]}`}
    >
      <span
        aria-hidden
        className="inline-block w-[2px] h-3 bg-current"
      />
      {VENDOR_STATUS_LABEL[key]}
    </span>
  );
};
