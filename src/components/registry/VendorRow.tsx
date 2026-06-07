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
        padding: "10px 14px 8px",
      }}
    >
      {/* Status — pinned top-right */}
      <span
        className="absolute inline-flex items-center font-sans"
        style={{
          top: "10px",
          right: "14px",
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: 1,
          gap: "5px",
          color: isVerified ? "#001021" : "#FF3B30",
        }}
      >
        {isVerified ? "Verified" : "Unverified"}
        {isVerified && (
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "16px",
              width: "20px",
            }}
          >
            <VerifiedShieldMark height={22} color="#001021" />
          </span>
        )}
      </span>

      {/* View — pinned bottom-right */}
      <span
        className="absolute font-sans text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
        style={{
          bottom: "8px",
          right: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        View
        <ChevronRight aria-hidden style={{ width: "14px", height: "14px", strokeWidth: 1.75 }} />
      </span>

      {/* Stacked content: name, location/type, therapy tag */}
      <div
        className="flex flex-col"
        style={{ gap: "6px", paddingRight: "108px" }}
      >
        <h3
          className="font-sans text-foreground truncate"
          style={{
            minWidth: 0,
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {vendor.name}
        </h3>

        <p
          className="text-muted-foreground truncate"
          style={{
            minWidth: 0,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {locationLine}
        </p>

        {focus && (
          <div style={{ marginTop: "2px" }}>
            <span
              className="inline-flex items-center font-sans uppercase whitespace-nowrap"
              style={{
                gap: "5px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "5px 9px",
                borderRadius: "5px",
                background: "rgba(0,16,33,0.07)",
                color: "rgba(0,16,33,0.72)",
                lineHeight: 1,
              }}
            >
              {focus.label}
              {focus.extra > 0 && <span style={{ opacity: 0.6 }}>+{focus.extra}</span>}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

