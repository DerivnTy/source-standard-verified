import { Link } from "react-router-dom";
import { Vendor, VendorFulfillment, VENDOR_FULFILLMENT_LABEL } from "@/data/vendors";

/**
 * VendorRow — mobile-first card row for the Verified Vendors registry.
 * Fixed 72px height. Top: vendor name (serif, 16px, semibold, navy).
 * Bottom: meta line in Geist Mono — "City, ST | Facility Type".
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
  const facilityType =
    vendor.category ?? VENDOR_FULFILLMENT_LABEL[fulfillment] ?? "—";
  const meta = `${location} | ${facilityType}`;

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${meta}`}
      className="flex flex-col justify-center gap-1 px-5 transition-colors hover:bg-[hsl(var(--muted))]/40"
      style={{ height: "72px" }}
    >
      <span
        className="truncate font-serif text-[16px] font-semibold leading-none tracking-tight text-[hsl(var(--navy-surface))]"
      >
        {vendor.name}
      </span>
      <span className="truncate font-mono text-[12px] leading-none text-muted-foreground">
        {meta}
      </span>
    </Link>
  );
};
