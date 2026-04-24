import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment } from "@/data/vendors";
import verifiedShield from "@/assets/verified-shield.png";

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
        border: "1px solid rgba(0,16,33,0.08)",
        borderRadius: "22px",
        padding: "14px 18px 12px",
        minHeight: "92px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "7px" }}>
        {/* Row 1 — Name (left) · Status (right) */}
        <div className="flex items-start justify-between" style={{ gap: "16px" }}>
          <h3
            className="font-sans text-foreground truncate"
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "15px",
              fontWeight: 650,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {vendor.name}
          </h3>

          {isVerified ? (
            <span
              className="inline-flex items-center font-sans uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.035em",
                lineHeight: 1,
                gap: "4px",
                color: "#001021",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "13px",
                  width: "11px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={verifiedShield}
                  alt=""
                  style={{
                    height: "180%",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </span>
              Verified
            </span>
          ) : (
            <span
              className="font-sans uppercase tabular-nums"
              style={{
                flexShrink: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.035em",
                lineHeight: 1,
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
              className="inline-flex items-center gap-1 font-sans uppercase whitespace-nowrap"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                padding: "4px 7px",
                borderRadius: "4px",
                background: "rgba(0,16,33,0.07)",
                color: "rgba(0,16,33,0.68)",
              }}
            >
              {focus.label}
              {focus.extra > 0 && (
                <span style={{ opacity: 0.7 }}>+{focus.extra}</span>
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

        {/* Row 3 — View Record action (right) */}
        <div className="flex" style={{ justifyContent: "flex-end", marginTop: "-4px" }}>
          <span
            className="font-sans uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "auto",
              marginRight: "-2px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.035em",
              lineHeight: 1,
            }}
          >
            View Record
            <ChevronRight
              aria-hidden
              style={{ width: "12px", height: "12px", strokeWidth: 1.5, marginRight: "-2px" }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};
