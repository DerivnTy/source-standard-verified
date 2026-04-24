import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_FULFILLMENT_LABEL,
  getVendorFulfillment,
} from "@/data/vendors";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

/**
 * VendorProfile — Surgical Public Record (mirrors GreenlistProfile).
 * One-screen 600px-wide audit card on white. No marketing copy, no
 * "About" prose, no large CTAs. All scope detail collapses into a
 * second hairline-divided grid below the primary record.
 */

const formatLocation = (vendor: Vendor): string =>
  vendor.city && vendor.state
    ? `${vendor.city}, ${vendor.state}`
    : vendor.city || vendor.state || "—";

const sourceTypeFor = (_v: Vendor): string => "503A / 503B / Retail";

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const Cell = ({
  label,
  value,
  mono,
  href,
}: {
  label: string;
  value?: ReactNode;
  mono?: boolean;
  href?: string;
}) => {
  const present =
    value !== undefined && value !== null && value !== "" &&
    !(Array.isArray(value) && value.length === 0);
  const display = Array.isArray(value) ? (value as ReactNode[]).join(", ") : value;
  return (
    <div>
      <dt
        className="font-sans font-semibold uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono tabular-nums" : "font-sans font-medium"} ${
          present ? "text-foreground" : "text-muted-foreground"
        }`}
        style={{ fontSize: "12px", lineHeight: "1.5" }}
      >
        {present ? (
          href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
            >
              {display}
            </a>
          ) : (
            display
          )
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
};

const VendorProfile = () => {
  const { slug } = useParams();
  const vendor = slug ? getVendor(slug) : undefined;

  if (!vendor) {
    return (
      <section className="container-narrow py-24 text-center">
        <p className="eyebrow mb-3">Not Found</p>
        <h1 className="title-page mb-4">No vendor profile found.</h1>
        <Link
          to="/verified-vendors"
          className="t-utility-xs font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
        >
          ← Back to Directory
        </Link>
      </section>
    );
  }

  const status = vendor.status;
  const isVerified = status === "verified";
  const isUnverified = status === "unverified";
  const isUnderReview = status === "under-review";
  const fulfillment = getVendorFulfillment(vendor);
  const isOnline = fulfillment === "online";
  const location = formatLocation(vendor);
  const locationLabel = isOnline ? "Online" : location;
  const sourceType = sourceTypeFor(vendor);

  // Status anchor — registry-card system, never "PENDING".
  const STATUS_ANCHOR: Record<
    VendorPublicStatus,
    { label: string; color: string }
  > = {
    verified: { label: "VERIFIED", color: "#34C759" },
    unverified: { label: "UNVERIFIED", color: "#FF3B30" },
    "under-review": { label: "UNDER REVIEW", color: "#FF9500" },
    suspended: { label: "SUSPENDED", color: "hsl(var(--muted-foreground))" },
    removed: { label: "REMOVED", color: "hsl(var(--muted-foreground))" },
  };
  const statusColor = STATUS_ANCHOR[status].color;
  const statusLabel = STATUS_ANCHOR[status].label;

  // Vendor Type display (Unverified path)
  const vendorTypeLabel =
    fulfillment === "in-person"
      ? "Physical Clinic"
      : fulfillment === "online"
      ? "Online Vendor"
      : "Hybrid";
  const therapyCategory =
    vendor.clinicalFocus?.[0] ?? vendor.category ?? undefined;

  // Verified scope flattening
  const hasGroups =
    isVerified &&
    vendor.verifiedScopeGroups &&
    Object.keys(vendor.verifiedScopeGroups).length > 0;
  const hasFlatCompounds =
    isVerified && vendor.verifiedCompounds && vendor.verifiedCompounds.length > 0;
  const hasCategoryFallback =
    isVerified &&
    !hasGroups &&
    !hasFlatCompounds &&
    vendor.verifiedCategories &&
    vendor.verifiedCategories.length > 0;
  const scopeCompounds = hasGroups
    ? Object.values(vendor.verifiedScopeGroups!).flat()
    : hasFlatCompounds
    ? vendor.verifiedCompounds!
    : hasCategoryFallback
    ? vendor.verifiedCategories!
    : [];
  const hasScope = scopeCompounds.length > 0;

  // Primary "license" label (review id when verified, else fulfillment label)
  const license = isVerified
    ? vendor.reviewId
    : VENDOR_FULFILLMENT_LABEL[fulfillment];
  const verificationDate = isVerified
    ? vendor.reviewDate
    : undefined;

  return (
    <>
      <PageMeta
        title={`${vendor.name} · ${VENDOR_STATUS_LABEL[status]}`}
        description={`Source Standard public record for ${vendor.name}. ${VENDOR_STATUS_LABEL[status]} · ${location}.`}
      />
      <Breadcrumb
        items={[
          { label: "Directory", to: "/verified-vendors" },
          { label: vendor.category ?? "Clinic" },
          { label: vendor.name },
        ]}
      />

      <section className="bg-background">
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "600px", paddingTop: "32px", paddingBottom: "48px" }}
        >
          {/* Back link — outside card */}
          <Link
            to="/verified-vendors"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Registry
          </Link>

          {/* Public Record card */}
          <article
            className="mt-4 bg-card"
            style={{
              border: "0.5px solid hsl(var(--border))",
              borderRadius: "10px",
              padding: "24px",
            }}
          >
            {/* Header: name + status */}
            <header className="flex items-start justify-between gap-4">
              <h1
                className="min-w-0 font-sans font-semibold text-foreground"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.3",
                  letterSpacing: "-0.01em",
                }}
              >
                {vendor.name}
              </h1>
              <span
                className="shrink-0 font-sans font-bold uppercase tabular-nums"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: statusColor,
                }}
              >
                {statusLabel}
              </span>
            </header>

            {/* Metadata row: category pill + vendor id */}
            {(vendor.category || vendor.reviewId) && (
              <div className="mt-3 flex items-center gap-x-2 flex-wrap">
                {vendor.category && (
                  <span
                    className="inline-flex items-center font-sans font-semibold uppercase bg-primary text-primary-foreground"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.06em",
                      padding: "3px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    {vendor.category}
                  </span>
                )}
                {vendor.reviewId && (
                  <span
                    className="font-mono text-muted-foreground"
                    style={{ fontSize: "11px" }}
                  >
                    {vendor.reviewId}
                  </span>
                )}
              </div>
            )}

            {/* Hairline */}
            <div
              aria-hidden
              className="mt-5 mb-5"
              style={{ borderTop: "0.5px solid hsl(var(--border))" }}
            />

            {/* Public Record grid */}
            <dl
              className="grid grid-cols-2"
              style={{ columnGap: "20px", rowGap: "16px" }}
            >
              {isUnverified ? (
                <>
                  <Cell label="Vendor Type" value={vendorTypeLabel} />
                  {therapyCategory && (
                    <Cell label="Therapy Category" value={therapyCategory} />
                  )}
                  {locationLabel !== "—" && (
                    <Cell label="Location" value={locationLabel} />
                  )}
                  <Cell
                    label="Review Status"
                    value="No sufficient documentation reviewed"
                  />
                  {vendor.website && (
                    <Cell
                      label="Website"
                      value={hostname(vendor.website)}
                      href={vendor.website}
                    />
                  )}
                </>
              ) : (
                <>
                  <Cell label="Category" value={vendor.category} />
                  <Cell label="Source Type" value={sourceType} />
                  <Cell label="Location" value={locationLabel !== "—" ? locationLabel : undefined} />
                  <Cell label="License / ID" value={license} mono />
                  {verificationDate && (
                    <Cell label="Verification Date" value={verificationDate} mono />
                  )}
                  <Cell
                    label="Website"
                    value={vendor.website ? hostname(vendor.website) : undefined}
                    href={vendor.website}
                  />
                </>
              )}
            </dl>

            {/* Verified Scope — only when verified */}
            {isVerified && hasScope && (
              <>
                <div
                  aria-hidden
                  className="mt-5 mb-5"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                />
                <dl
                  className="grid grid-cols-2"
                  style={{ columnGap: "20px", rowGap: "16px" }}
                >
                  <Cell
                    label="Audit Date"
                    value={vendor.scopeReviewDate || vendor.reviewDate}
                    mono
                  />
                  <Cell
                    label="Medical Director"
                    value={vendor.medicalDirector}
                  />
                  <Cell label="Clinical Focus" value={vendor.clinicalFocus} />
                  <Cell label="Verified Scope" value={scopeCompounds.join(" · ")} />
                </dl>
              </>
            )}

            {/* Unverified — Status Meaning + Review Boundary */}
            {isUnverified && (
              <>
                <div
                  className="mt-6 pt-6"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                >
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground"
                    style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                  >
                    Status Meaning
                  </p>
                  <p
                    className="mt-2 text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    No sufficient documentation has been reviewed by Source
                    Standard to support the stated sourcing claim within the
                    registry framework.
                  </p>
                </div>

                <div
                  aria-hidden
                  className="mt-5 pt-5"
                  style={{ borderTop: "0.5px solid hsl(var(--border))" }}
                >
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground"
                    style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                  >
                    Review Boundary
                  </p>
                  <p
                    className="mt-2 text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                  >
                    Unverified status does not imply that the vendor is unsafe,
                    unlawful, fraudulent, or clinically inappropriate. It
                    reflects only the absence of sufficient reviewed
                    documentation within the Source Standard framework.
                  </p>
                </div>
              </>
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
