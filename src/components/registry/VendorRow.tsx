import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vendor, VendorFulfillment } from "@/data/vendors";

/**
 * VendorRow — Horizontal Marketplace Decision Card.
 * Three strict rows:
 *   Row 1 — Name (left)        ·  Status (right)
 *   Row 2 — Focus pill · Location (horizontal, vertically centered)
 *   Row 3 — Utility tags (left)  ·  View Full Audit › (right)
 */

const SYSTEM_GRAY_BG = "#F2F2F7";
const SYSTEM_GRAY_TEXT = "#48484A";

const UtilityTag = ({ label }: { label: string }) => (
  <span
    className="inline-flex items-center font-sans font-semibold uppercase whitespace-nowrap"
    style={{
      fontSize: "11px",
      letterSpacing: "0.04em",
      padding: "3px 7px",
      borderRadius: "4px",
      backgroundColor: SYSTEM_GRAY_BG,
      color: SYSTEM_GRAY_TEXT,
    }}
  >
    {label}
  </span>
);

const focusFor = (vendor: Vendor): string | null => {
  if (vendor.clinicalFocus && vendor.clinicalFocus.length > 0) {
    return vendor.clinicalFocus[0].toUpperCase();
  }
  if (vendor.category) return vendor.category.toUpperCase();
  return null;
};

const buildDecisionTags = (
  vendor: Vendor,
  fulfillment: VendorFulfillment,
): string[] => {
  const tags: string[] = [];
  const cat = (vendor.category ?? "").toLowerCase();
  if (cat.includes("compounding")) tags.push("503B");
  if (fulfillment === "online") tags.push("Online Only");
  else if (fulfillment === "in-person") tags.push("In-Person");
  else if (fulfillment === "hybrid") tags.push("Online + In-Person");
  const blob = `${vendor.publicNote ?? ""} ${vendor.summary ?? ""}`.toLowerCase();
  if (blob.includes("insurance")) tags.push("Insurance");
  return tags;
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
  const decisionTags = buildDecisionTags(vendor, fulfillment);

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
        padding: "16px",
      }}
    >
      {/* Row 1 — Identity (flex-between) */}
      <div className="flex items-center justify-between gap-x-3">
        <h3
          className="min-w-0 truncate font-sans font-semibold text-foreground"
          style={{
            fontSize: "17px",
            lineHeight: "1.25",
            letterSpacing: "-0.01em",
          }}
        >
          {vendor.name}
        </h3>

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
              style={{ width: "4px", height: "4px", backgroundColor: "#34C759" }}
            />
            Verified
          </span>
        ) : (
          <span
            className="shrink-0 font-mono font-medium uppercase tabular-nums text-muted-foreground"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            Unverified
          </span>
        )}
      </div>

      {/* Row 2 — Specialty + Location (horizontal, vertically centered) */}
      {(focus || locationLabel) && (
        <div
          className="flex items-center gap-x-2 min-w-0"
          style={{ marginTop: "8px" }}
        >
          {focus && (
            <span
              className="shrink-0 inline-flex items-center font-sans font-semibold uppercase bg-foreground text-background whitespace-nowrap"
              style={{
                fontSize: "10px",
                letterSpacing: "0.06em",
                padding: "3px 7px",
                borderRadius: "4px",
              }}
            >
              {focus}
            </span>
          )}
          {focus && locationLabel && (
            <span
              aria-hidden
              className="shrink-0 text-border"
              style={{ fontSize: "12px" }}
            >
              •
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

      {/* Row 3 — Utility tags (left) · View Full Audit (right) */}
      <div
        className="flex items-center justify-between gap-x-3"
        style={{ marginTop: "12px" }}
      >
        <div className="flex items-center gap-x-1.5 flex-wrap min-w-0">
          {decisionTags.map((tag) => (
            <UtilityTag key={tag} label={tag} />
          ))}
        </div>
        <span
          className="shrink-0 inline-flex items-center gap-1 font-sans font-bold uppercase text-muted-foreground group-hover:text-foreground transition-colors"
          style={{ fontSize: "11px", letterSpacing: "0.06em" }}
        >
          View Full Audit
          <ChevronRight
            aria-hidden
            style={{ width: "12px", height: "12px", strokeWidth: 1.5 }}
          />
        </span>
      </div>
    </Link>
  );
};
