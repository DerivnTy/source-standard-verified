import {
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";

const colorFor: Record<VendorPublicStatus, string> = {
  verified: "text-verified",
  unverified: "text-muted-foreground",
  "under-review": "text-pending",
  suspended: "text-destructive",
  removed: "text-muted-foreground",
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
      className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.16em] tabular-nums ${text} ${colorFor[key]}`}
    >
      <span aria-hidden className="inline-block leading-none">
        ■
      </span>
      {VENDOR_STATUS_LABEL[key]}
    </span>
  );
};
