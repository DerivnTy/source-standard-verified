import { Link } from "react-router-dom";
import { Vendor, VendorFulfillment, VENDOR_FULFILLMENT_LABEL } from "@/data/vendors";

/**
 * VendorRow — clean white card, 1px border, no shadow.
 * Top: Vendor name (Navy serif) · status text label (right, mono uppercase).
 * Bottom: City, State | Focus (muted sans).
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
  const focusLabel =
    vendor.clinicalFocus?.[0] ?? vendor.category ?? VENDOR_FULFILLMENT_LABEL[fulfillment] ?? "—";
  const meta = `${location} | ${focusLabel}`;
  const isVerified = vendor.status === "verified";

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${meta}`}
      className="block bg-card transition-colors hover:bg-[hsl(var(--muted))]/40"
      style={{
        border: "1px solid hsl(var(--border))",
        borderRadius: "10px",
        padding: "14px 16px",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="truncate font-serif text-[16px] font-semibold leading-tight tracking-tight text-[hsl(var(--navy-surface))]">
          {vendor.name}
        </span>
        <span
          className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{
            color: isVerified ? "hsl(142 60% 32%)" : "hsl(0 50% 55%)",
            paddingTop: "2px",
          }}
        >
          {isVerified ? "Verified" : "Unverified"}
        </span>
      </div>
      <p className="mt-1 truncate font-sans text-[12.5px] text-muted-foreground">
        {meta}
      </p>
    </Link>
  );
};
