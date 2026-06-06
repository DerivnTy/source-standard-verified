import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment } from "@/data/vendors";
import { VerifiedShieldMark } from "@/components/registry/VerifiedShieldMark";

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
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 hover:border-[hsl(var(--foreground))]/20 active:scale-[0.99] relative"
      style={{
        border: "1px solid rgba(0,16,33,0.08)",
        borderRadius: "22px",
        padding: "12px 16px 10px",
        minHeight: "104px",
      }}
    >
      {/* Status — pinned top-right */}
      <span
        className="absolute inline-flex items-center justify-end font-sans uppercase tabular-nums"
        style={{
          top: "12px",
          right: "16px",
          height: "12px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.035em",
          lineHeight: 1,
          gap: "4px",
          color: isVerified ? "#001021" : "#FF3B30",
          opacity: isVerified ? 1 : 0.85,
        }}
      >
        {isVerified ? "Verified" : "Unverified"}
        {isVerified && (
          <span
            aria-hidden
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "12px",
              width: "19px",
              overflow: "visible",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(calc(-50% - 1px))",
                display: "block",
              }}
            >
              <VerifiedShieldMark height={22} color="#001021" />
            </span>
          </span>
        )}
      </span>

      {/* View Record — pinned bottom-right */}
      <span
        className="absolute font-sans uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
        style={{
          bottom: "10px",
          right: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.035em",
          lineHeight: 1,
        }}
      >
        View
        <ChevronRight
          aria-hidden
          style={{ width: "12px", height: "12px", strokeWidth: 1.5, marginRight: "-2px" }}
        />
      </span>

      {/* Centered content group: name, location, category */}
      <div
        className="flex flex-col justify-center h-full"
        style={{
          gap: "8px",
          minHeight: "84px",
          paddingRight: "92px",
        }}
      >
        <h3
          className="font-sans text-foreground truncate"
          style={{
            minWidth: 0,
            fontSize: "15px",
            fontWeight: 650,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {vendor.name}
        </h3>

        <div
          className="min-w-0"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
        >
          {focus && (
            <span
              className="inline-flex items-center font-sans uppercase whitespace-nowrap"
              style={{
                gap: "4px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                padding: "4px 7px",
                borderRadius: "4px",
                background: "rgba(0,16,33,0.07)",
                color: "rgba(0,16,33,0.68)",
                lineHeight: 1,
              }}
            >
              {focus.label}
              {focus.extra > 0 && (
                <span style={{ opacity: 0.6 }}>+{focus.extra}</span>
              )}
            </span>
          )}
          <span
            className="text-muted-foreground truncate"
            style={{ minWidth: 0, fontSize: "11px", lineHeight: 1.35 }}
          >
            {locationLine}
          </span>
        </div>
      </div>
    </Link>
  );
};

