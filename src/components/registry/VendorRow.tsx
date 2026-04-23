import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment } from "@/data/vendors";

/**
 * VendorRow — Two-Row High-Efficiency Marketplace Card.
 *   Row 1: Name (left) · [Status + View Full Audit] stack (right)
 *   Row 2: Specialty pill + Location (or ONLINE)
 */

const focusFor = (vendor: Vendor): string | null => {
  if (vendor.clinicalFocus && vendor.clinicalFocus.length > 0) {
    return vendor.clinicalFocus[0].toUpperCase();
  }
  if (vendor.category) return vendor.category.toUpperCase();
  return null;
};

export const VendorRow = ({
  vendor,
  fulfillment,
  location,
}: {
  vendor: Vendor;
  fulfillment: VendorFulfillment;
  location: string;
}) => {
  const isVerified = vendor.status === "verified";
  const focus = focusFor(vendor);

  const isOnline = fulfillment === "online";
  const locationLabel = isOnline
    ? "ONLINE"
    : location && location !== "—"
      ? location
      : null;

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name}${focus ? ` — ${focus}` : ""}`}
      data-pill
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.97]"
      style={{
        border: "0.5px solid hsl(var(--border))",
        borderRadius: "20px",
        padding: "12px 14px",
      }}
    >
      {/* Row 1 — Name (left) · Status + CTA stack (right) */}
      <div className="flex items-start justify-between gap-x-3">
        <h3
          className="min-w-0 truncate font-sans font-semibold text-foreground"
          style={{
            fontSize: "15px",
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
          }}
        >
          {vendor.name}
        </h3>

        <div className="shrink-0 flex flex-col items-end gap-y-1">
          {isVerified ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full font-mono font-semibold uppercase tabular-nums"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "2px 7px",
                backgroundColor: "rgba(52, 199, 89, 0.10)",
                color: "hsl(142 70% 28%)",
              }}
            >
              <span
                aria-hidden
                className="inline-block rounded-full"
                style={{ width: "4px", height: "4px", backgroundColor: "#34C759" }}
              />
              Verified
            </span>
          ) : (
            <span
              className="inline-flex items-center font-sans font-bold uppercase tabular-nums"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "2px 7px",
                borderRadius: "2px",
                backgroundColor: "rgba(255, 59, 48, 0.05)",
                color: "#FF3B30",
              }}
            >
              Unverified
            </span>
          )}

          <span
            className="inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View Full Audit
            <ChevronRight
              aria-hidden
              style={{ width: "11px", height: "11px", strokeWidth: 1.5 }}
            />
          </span>
        </div>
      </div>

      {/* Row 2 — Specialty pill + Location */}
      {(focus || locationLabel) && (
        <div className="mt-1 flex items-center gap-x-2 min-w-0">
          {focus && (
            <span
              className="shrink-0 inline-flex items-center font-sans font-semibold uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] whitespace-nowrap"
              style={{
                fontSize: "10px",
                letterSpacing: "0.06em",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {focus}
            </span>
          )}
          {locationLabel && (
            <span
              className="min-w-0 truncate font-mono text-muted-foreground"
              style={{ fontSize: "12px", lineHeight: "1.35" }}
            >
              {locationLabel}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};
