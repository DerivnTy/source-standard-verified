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
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 hover:border-[hsl(var(--foreground))]/20 active:scale-[0.99]"
      style={{
        border: "1px solid rgba(0,16,33,0.08)",
        borderRadius: "22px",
        padding: "12px 16px 10px",
        minHeight: "84px",
      }}
    >
      <div className="flex flex-col" style={{ gap: "5px" }}>
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

          <span
            className="inline-flex items-center justify-end font-sans uppercase tabular-nums"
            style={{
              flexShrink: 0,
              height: "12px",
              fontSize: isVerified ? "12px" : "10.5px",
              fontWeight: isVerified ? 700 : 600,
              letterSpacing: "0.04em",
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
        </div>

        {/* Row 2 — Location · Vendor type */}
        <div
          className="text-muted-foreground truncate"
          style={{ fontSize: "11.5px", lineHeight: 1.35 }}
        >
          {locationLine}
        </div>

        {/* Row 3 — Category badge on its own line */}
        {focus && (
          <div style={{ marginTop: "1px" }}>
            <span
              className="inline-flex items-center font-sans uppercase whitespace-nowrap"
              style={{
                gap: "4px",
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "hsl(var(--foreground))",
                background: "hsl(var(--muted))",
                border: "1px solid rgba(0,16,33,0.08)",
                borderRadius: "6px",
                padding: "3px 7px",
                lineHeight: 1,
              }}
            >
              {focus.label}
              {focus.extra > 0 && (
                <span style={{ opacity: 0.6 }}>+{focus.extra}</span>
              )}
            </span>
          </div>
        )}

        {/* Row 4 — View Record action */}
        <div className="flex items-center" style={{ justifyContent: "flex-end", marginTop: "1px" }}>
          <span
            className="font-sans uppercase text-foreground group-hover:translate-x-[1px] transition-transform"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginRight: "-2px",
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.09em",
              lineHeight: 1,
            }}
          >
            View Record
            <ChevronRight
              aria-hidden
              style={{ width: "11px", height: "11px", strokeWidth: 2, marginRight: "-2px" }}
            />
          </span>
        </div>

      </div>
    </Link>
  );
};
