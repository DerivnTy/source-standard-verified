import { Link } from "react-router-dom";
import { Vendor, VendorFulfillment, VENDOR_FULFILLMENT_LABEL } from "@/data/vendors";

/**
 * VendorRow — consumer-grade card row.
 * 82px height. Top: vendor name (serif, navy) + status tag (top-right).
 * Bottom: meta line — "City, ST · Facility Type".
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
  const meta = `${location} · ${facilityType}`;
  const isVerified = vendor.status === "verified";

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${meta}`}
      className="relative flex flex-col justify-center gap-1.5 px-5 transition-colors hover:bg-[hsl(var(--muted))]/40"
      style={{ height: "82px" }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="truncate font-serif text-[16px] font-semibold leading-tight tracking-tight text-[hsl(var(--navy-surface))]">
          {vendor.name}
        </span>
        <StatusTag verified={isVerified} />
      </div>
      <span className="truncate font-mono text-[12px] leading-none text-muted-foreground">
        {meta}
      </span>
    </Link>
  );
};

const StatusTag = ({ verified }: { verified: boolean }) => (
  <span
    className="shrink-0 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.1em]"
    style={{
      color: verified ? "hsl(142 55% 38%)" : "hsl(0 60% 65%)",
      letterSpacing: "0.1em",
    }}
  >
    {verified ? "Verified" : "Unverified"}
  </span>
);
