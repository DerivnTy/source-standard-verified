import { Link } from "react-router-dom";
import {
  Vendor,
  VendorFulfillment,
  VENDOR_FULFILLMENT_LABEL,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";

/**
 * Audit Status Label — clean, consumer-facing.
 * Verified → green check + "Verified". Otherwise → muted status word.
 */
const AuditStatusLabel = ({ status }: { status: Vendor["status"] }) => {
  const isVerified = status === "verified";
  const isPending = status === "under-review";

  const tone = isVerified
    ? "text-verified"
    : isPending
    ? "text-amber-600"
    : "text-muted-foreground";

  const word = isVerified
    ? "Verified"
    : isPending
    ? "Pending"
    : VENDOR_STATUS_LABEL[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${tone}`}
    >
      {isVerified && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-3 w-3 fill-current"
        >
          <path d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z" />
        </svg>
      )}
      <span>{word}</span>
    </span>
  );
};

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <li className="text-[12.5px] leading-[1.5] text-muted-foreground">
    <span className="text-foreground/60">{label}:</span>{" "}
    <span className="text-foreground/85">{value}</span>
  </li>
);

/**
 * Build a deterministic vendor ID for display.
 */
const buildVendorId = (vendor: Vendor) => {
  if (vendor.reviewId) return vendor.reviewId;
  let h = 0;
  for (let i = 0; i < vendor.slug.length; i++) {
    h = (h * 31 + vendor.slug.charCodeAt(i)) >>> 0;
  }
  const stateTag = vendor.state ?? "US";
  return `VR-${stateTag}-${(h % 9999).toString().padStart(4, "0")}`;
};

export const VendorAuditCard = ({
  vendor,
  fulfillment,
  location,
  view = "grid",
}: {
  vendor: Vendor;
  fulfillment: VendorFulfillment;
  location: string;
  view?: "grid" | "list";
}) => {
  const focus =
    vendor.clinicalFocus && vendor.clinicalFocus.length > 0
      ? vendor.clinicalFocus.join(" · ")
      : vendor.category;
  const vendorId = buildVendorId(vendor);
  const isUnverified =
    vendor.status === "unverified" ||
    vendor.status === "suspended" ||
    vendor.status === "removed";

  // Paper-thin surgical-red whisper — suggests warning, not error.
  const unverifiedWash = "#FFF9F9";

  if (view === "list") {
    return (
      <Link
        to={`/directory/${vendor.slug}`}
        aria-label={`${vendor.name} — ${VENDOR_STATUS_LABEL[vendor.status]}, ${location}`}
        className="group grid items-center gap-3 h-[48px] px-4 text-left bg-card transition-colors hover:bg-[#F8FAFC]"
        style={{
          ...(isUnverified ? { backgroundColor: unverifiedWash } : {}),
          gridTemplateColumns: "8px minmax(0, 1fr) auto auto",
        }}
      >
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${
            vendor.status === "verified"
              ? "bg-verified live-dot"
              : vendor.status === "under-review"
              ? "bg-amber-500"
              : "bg-red-400"
          }`}
        />
        <h3
          className="min-w-0 truncate leading-none tracking-tight"
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#1E293B",
          }}
        >
          {vendor.name}
        </h3>
        <span
          className="font-mono truncate max-w-[92px] sm:max-w-[180px] leading-none"
          style={{ fontSize: "11px", color: "#64748B" }}
        >
          {location}
        </span>
        <span
          className="font-mono leading-none uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.08em", color: "#64748B" }}
        >
          {vendor.status === "verified"
            ? "Verified"
            : vendor.status === "under-review"
            ? "Pending"
            : "Unverified"}
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${VENDOR_STATUS_LABEL[vendor.status]}, ${location}`}
      className="group block h-full text-left rounded-[2px] border border-border bg-card hover:border-foreground/30 hover:shadow-[0_8px_24px_-12px_hsl(0_0%_0%/0.18)] transition-all"
      style={isUnverified ? { backgroundColor: unverifiedWash } : undefined}
    >
      <div className="flex flex-col gap-3 text-left" style={{ padding: "20px" }}>
        <AuditStatusLabel status={vendor.status} />

        <h3 className="text-left text-[14px] font-semibold leading-[1.3] text-foreground tracking-tight">
          {vendor.name}
        </h3>

        <ul className="space-y-1 text-left">
          <MetaRow label="ID" value={`#${vendorId}`} />
          <MetaRow label="Location" value={location} />
          <MetaRow label="Type" value={focus || "—"} />
          <MetaRow
            label="Fulfillment"
            value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
          />
          {vendor.status === "verified" && vendor.reviewDate && (
            <MetaRow label="Audit" value={vendor.reviewDate} />
          )}
        </ul>
      </div>
    </Link>
  );
};
