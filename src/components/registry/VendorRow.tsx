import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment } from "@/data/vendors";

/**
 * VendorRow — Final Two-Row Surgical Card.
 *   Row 1: Name (left) · Status text (right)
 *   Row 2: [Specialty pill + Location] (left) · VIEW › (right)
 */

const focusFor = (vendor: Vendor): { label: string; extra: number } | null => {
  if (vendor.clinicalFocus && vendor.clinicalFocus.length > 0) {
    return {
      label: vendor.clinicalFocus[0].toUpperCase(),
      extra: Math.max(0, vendor.clinicalFocus.length - 1),
    };
  }
  if (vendor.category) return { label: vendor.category.toUpperCase(), extra: 0 };
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
  const hasLocation = location && location !== "—";
  const modelLabel = isOnline ? "Online" : fulfillment === "in-person" ? "In-person" : "Hybrid";
  const locationLine = isOnline
    ? "Online"
    : hasLocation
      ? `${location} · ${modelLabel}`
      : modelLabel;

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name}${focus ? ` — ${focus.label}` : ""}`}
      data-pill
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
      style={{
        border: "0.5px solid hsl(var(--border))",
        borderRadius: "20px",
        padding: "18px 20px",
        minHeight: "112px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "10px" }}>
        {/* Row 1 — Name (left) · Status (right) */}
        <div className="flex items-start justify-between" style={{ gap: "16px" }}>
          <h3
            className="font-sans font-semibold text-foreground truncate"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "15px",
              lineHeight: "1.3",
              letterSpacing: "-0.01em",
            }}
          >
            {vendor.name}
          </h3>

          {isVerified ? (
            <span
              className="inline-flex items-center gap-1 font-sans font-bold uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "#34C759",
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
              className="font-sans font-bold uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "#FF3B30",
              }}
            >
              Unverified
            </span>
          )}
        </div>

        {/* Row 2 — Category pill + Location/model metadata */}
        <div className="flex items-center" style={{ gap: "8px", flexWrap: "wrap" }}>
          {focus && (
            <span
              className="inline-flex items-center gap-1 font-sans font-medium uppercase bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] whitespace-nowrap"
              style={{
                fontSize: "9px",
                letterSpacing: "0.06em",
                padding: "2px 6px",
                borderRadius: "3px",
              }}
            >
              {focus.label}
              {focus.extra > 0 && (
                <span style={{ opacity: 0.7 }}>+{focus.extra}</span>
              )}
            </span>
          )}
          <span
            className="text-muted-foreground"
            style={{ fontSize: "11px", lineHeight: "1.35" }}
          >
            {locationLine}
          </span>
        </div>

        {/* Row 3 — View Record action (right) */}
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <span
            className="inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
            style={{ fontSize: "10px", letterSpacing: "0.06em" }}
          >
            View Record
            <ChevronRight
              aria-hidden
              style={{ width: "11px", height: "11px", strokeWidth: 1.5 }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};
