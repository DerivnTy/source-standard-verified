import { Link } from "react-router-dom";
import {
  Vendor,
  VendorFulfillment,
  VENDOR_FULFILLMENT_LABEL,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";

/**
 * Audit Status Label — Geist Mono, uppercase, format `STATUS // VERIFIED`.
 * Verified → green, pending/under-review → amber, otherwise → muted.
 */
const AuditStatusLabel = ({ status }: { status: Vendor["status"] }) => {
  const isVerified = status === "verified";
  const isPending = status === "under-review";
  const isSuspended = status === "suspended";
  const isRemoved = status === "removed";

  const tone = isVerified
    ? "text-verified"
    : isPending || isSuspended
    ? "text-amber-500"
    : isRemoved
    ? "text-muted-foreground"
    : "text-muted-foreground";

  const word = isVerified
    ? "VERIFIED"
    : isPending
    ? "PENDING"
    : VENDOR_STATUS_LABEL[status].toUpperCase().replace(/\s+/g, " ");

  return (
    <span
      className={`inline-flex items-center font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] ${tone}`}
    >
      <span className="text-muted-foreground/70">STATUS&nbsp;//&nbsp;</span>
      <span>{word}</span>
    </span>
  );
};

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <li className="font-mono text-[12px] leading-[1.5] text-muted-foreground">
    <span aria-hidden>—&nbsp;</span>
    <span className="uppercase tracking-[0.06em]">{label}:</span>{" "}
    <span className="text-foreground/80 normal-case tracking-normal">
      {value}
    </span>
  </li>
);

/**
 * Build a deterministic vendor ID for display: SS-<state?>-<slug-hash>.
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

  if (view === "list") {
    return (
      <Link
        to={`/directory/${vendor.slug}`}
        aria-label={`${vendor.name} — ${VENDOR_STATUS_LABEL[vendor.status]}, ${location}`}
        className="group flex items-center gap-4 min-h-[60px] px-4 py-2 text-left bg-card border-b border-border hover:bg-surface-muted/40 transition-colors"
      >
        <div className="shrink-0 w-[120px] hidden sm:block">
          <AuditStatusLabel status={vendor.status} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="truncate text-[14px] font-semibold leading-tight text-foreground tracking-tight">
              {vendor.name}
            </h3>
            <span className="hidden md:inline font-mono text-[11px] text-muted-foreground tabular-nums">
              {vendorId}
            </span>
          </div>
          <div className="sm:hidden mt-1">
            <AuditStatusLabel status={vendor.status} />
          </div>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground truncate">
            <span aria-hidden>—&nbsp;</span>LOC:{" "}
            <span className="text-foreground/80">{location}</span>
          </p>
        </div>
        <span aria-hidden className="hidden md:inline font-mono text-[12px] text-muted-foreground group-hover:text-foreground transition-colors">
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${VENDOR_STATUS_LABEL[vendor.status]}, ${location}`}
      className="group block h-full text-left rounded-[2px] border border-border bg-card hover:border-foreground/30 hover:shadow-[0_8px_24px_-12px_hsl(0_0%_0%/0.18)] transition-all"
    >
      <div className="flex flex-col gap-3 text-left" style={{ padding: "20px" }}>
        {/* No-Logo Protocol — status badge is the visual anchor */}
        <AuditStatusLabel status={vendor.status} />

        <h3 className="text-left text-[16px] font-semibold leading-[1.3] text-foreground tracking-tight">
          {vendor.name}
        </h3>

        <ul className="space-y-1 text-left">
          <MetaRow label="ID" value={`#${vendorId}`} />
          <MetaRow label="Loc" value={location} />
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
