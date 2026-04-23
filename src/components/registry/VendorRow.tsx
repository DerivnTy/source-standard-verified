import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment, VENDOR_FULFILLMENT_LABEL } from "@/data/vendors";

/**
 * VendorRow — Elite Marketplace card (DoorDash/Uber Eats density).
 * - 20px radius, 0.5px hairline border, white surface
 * - Name (Inter SemiBold 17px) as the hook
 * - Subtitle: "City, ST • Focus" in 12px Geist Mono
 * - Top-right status pill (Verified = soft green w/ dot, Unverified = muted)
 * - Chevron-right affordance on the far right
 * - Tap gives a 0.97 scale via global active styles
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
  const subtitle = `${location} • ${focusLabel}`;
  const isVerified = vendor.status === "verified";

  return (
    <Link
      to={`/directory/${vendor.slug}`}
      aria-label={`${vendor.name} — ${subtitle}`}
      data-pill
      className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.97]"
      style={{
        border: "0.5px solid hsl(var(--border))",
        borderRadius: "20px",
        padding: "12px 14px",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className="truncate font-sans font-semibold text-foreground"
              style={{ fontSize: "17px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
            >
              {vendor.name}
            </h3>

            {/* Status pill — top right */}
            {isVerified ? (
              <span
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full font-mono font-semibold uppercase tabular-nums"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  padding: "3px 8px",
                  backgroundColor: "rgba(52, 199, 89, 0.10)",
                  color: "hsl(142 70% 28%)",
                }}
              >
                <span
                  aria-hidden
                  className="inline-block rounded-full"
                  style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#34C759",
                  }}
                />
                Verified
              </span>
            ) : (
              <span
                className="shrink-0 font-mono font-medium uppercase tabular-nums text-muted-foreground"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  paddingTop: "3px",
                }}
              >
                Unverified
              </span>
            )}
          </div>

          <p
            className="mt-1 truncate font-mono text-muted-foreground"
            style={{ fontSize: "12px", lineHeight: "1.35" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Chevron affordance */}
        <ChevronRight
          aria-hidden
          className="shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5"
          style={{ width: "16px", height: "16px", strokeWidth: 1.5 }}
        />
      </div>
    </Link>
  );
};
