import { Link } from "react-router-dom";
import {
  Vendor,
  VendorFulfillment,
  VENDOR_FULFILLMENT_LABEL,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";

/**
 * Audit Status Label — Geist Mono, uppercase, format `STATUS // VERIFIED`.
 * Color tokens drive contrast: verified → green, pending/under-review → amber,
 * everything else → muted. Kept compact (10.5px) to read like a terminal tag.
 */
const AuditStatusLabel = ({
  status,
}: {
  status: Vendor["status"];
}) => {
  const isVerified = status === "verified";
  const isPending = status === "under-review";
  const isSuspended = status === "suspended";
  const isRemoved = status === "removed";

  const tone = isVerified
    ? "text-verified"
    : isPending
    ? "text-amber-500"
    : isSuspended
    ? "text-amber-500"
    : isRemoved
    ? "text-muted-foreground"
    : "text-muted-foreground";

  const word = isVerified
    ? "VERIFIED"
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

/**
 * Initials monogram on a deterministic navy tile — stands in for a facility
 * image while preserving the strict 1:1 square aspect ratio, 1px white-20
 * border, and 2px corner radius required by the Audit Registry spec.
 */
const FacilityMonogram = ({ name }: { name: string }) => {
  const initials = name
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "·";
  return (
    <div
      aria-hidden
      className="aspect-square w-full rounded-[2px] flex items-center justify-center bg-[hsl(var(--navy-surface))] text-white"
      style={{ border: "1px solid rgba(255,255,255,0.20)" }}
    >
      <span className="font-mono text-[18px] tracking-[0.06em]">
        {initials}
      </span>
    </div>
  );
};

/**
 * MetaRow — single Geist Mono ledger line: `- LABEL: value`.
 * 12px, muted, dash-prefixed for the "data stack" inside each card.
 */
const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <li className="font-mono text-[12px] leading-[1.5] text-muted-foreground">
    <span aria-hidden>—&nbsp;</span>
    <span className="uppercase tracking-[0.06em]">{label}:</span>{" "}
    <span className="text-foreground/80 normal-case tracking-normal">
      {value}
    </span>
  </li>
);

export const VendorAuditCard = ({
  vendor,
  fulfillment,
  location,
}: {
  vendor: Vendor;
  fulfillment: VendorFulfillment;
  location: string;
}) => {
  const focus =
    vendor.clinicalFocus && vendor.clinicalFocus.length > 0
      ? vendor.clinicalFocus.join(" · ")
      : vendor.category;

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${VENDOR_STATUS_LABEL[vendor.status]}, ${location}`}
      className="group block h-full text-left rounded-[2px] border border-border bg-card hover:border-foreground/30 hover:shadow-[0_8px_24px_-12px_hsl(0_0%_0%/0.18)] transition-all"
    >
      <div className="flex flex-col gap-4 text-left" style={{ padding: "20px" }}>
        {/* 1:1 facility image */}
        <div className="w-20">
          <FacilityMonogram name={vendor.name} />
        </div>

        {/* Audit status — Geist Mono badge */}
        <AuditStatusLabel status={vendor.status} />

        {/* Facility name — prominent anchor */}
        <h3 className="text-left text-[16px] font-semibold leading-[1.3] text-foreground tracking-tight">
          {vendor.name}
        </h3>

        {/* The Data Stack — 12px Geist Mono, dash-prefixed ledger lines */}
        <ul className="-mt-1 space-y-1 text-left">
          <MetaRow label="Location" value={location} />
          <MetaRow label="Type" value={focus || "—"} />
          <MetaRow
            label="Fulfillment"
            value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
          />
          {vendor.status === "verified" && vendor.reviewDate && (
            <MetaRow label="Audit Date" value={vendor.reviewDate} />
          )}
        </ul>
      </div>
    </Link>
  );
};
