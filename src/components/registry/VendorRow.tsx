import { Link } from "react-router-dom";
import { Vendor, VendorFulfillment, VENDOR_FULFILLMENT_LABEL } from "@/data/vendors";

/**
 * VendorRow — consumer card.
 * Top: vendor name (serif, navy) + prominent "Apple Health" green VERIFIED badge (top-right).
 * Bottom: specialty label · location · fulfillment.
 */
export const VendorRow = ({
  vendor,
  fulfillment,
  location,
}: {
  vendor: Vendor;
  fulfillment: VendorFulfillment;
  location: string;
}) => {
  const specialty =
    vendor.clinicalFocus?.[0] ?? vendor.category ?? "General Wellness";
  const fulfillmentLabel = VENDOR_FULFILLMENT_LABEL[fulfillment] ?? "—";
  const isVerified = vendor.status === "verified";

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${specialty} — ${location}`}
      className="relative flex flex-col justify-center gap-1.5 px-5 py-4 transition-colors hover:bg-[hsl(var(--muted))]/40"
      style={{ minHeight: "88px" }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="truncate font-serif text-[16px] font-semibold leading-tight tracking-tight text-[hsl(var(--navy-surface))]">
          {vendor.name}
        </span>
        <TrustBadge verified={isVerified} />
      </div>
      <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
        <SpecialtyTag label={specialty} />
        <span aria-hidden className="text-muted-foreground/40">·</span>
        <span className="truncate font-mono text-[12px] leading-none">
          {location}
        </span>
        <span aria-hidden className="text-muted-foreground/40">·</span>
        <span className="truncate font-mono text-[12px] leading-none">
          {fulfillmentLabel}
        </span>
      </div>
    </Link>
  );
};

const TrustBadge = ({ verified }: { verified: boolean }) => {
  if (verified) {
    return (
      <span
        className="shrink-0 inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
        style={{
          backgroundColor: "hsl(142 70% 92%)",
          color: "hsl(142 65% 28%)",
        }}
      >
        Verified
      </span>
    );
  }
  return (
    <span
      className="shrink-0 inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em]"
      style={{
        backgroundColor: "hsl(0 60% 96%)",
        color: "hsl(0 55% 50%)",
      }}
    >
      Unverified
    </span>
  );
};

const SpecialtyTag = ({ label }: { label: string }) => (
  <span
    className="shrink-0 inline-flex items-center rounded-[2px] px-1.5 py-0.5 font-sans text-[11px] font-medium tracking-tight"
    style={{
      backgroundColor: "hsl(var(--muted))",
      color: "hsl(var(--foreground))",
    }}
  >
    {label}
  </span>
);
