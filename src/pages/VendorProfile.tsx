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
import { VerifiedShieldMark } from "@/components/registry/VerifiedShieldMark";

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

  // Profile status renderer (top-right of card).
  // Verified is a dedicated branch — never routed through a generic color
  // map, so legacy green treatments cannot win on the profile page.
  const renderProfileStatus = (s: VendorPublicStatus) => {
    const baseStyle = {
      fontSize: "10px",
      letterSpacing: "0.08em",
      lineHeight: 1,
      gap: "4px",
    } as const;

    if (s === "verified") {
      return (
        <span
          className="shrink-0 inline-flex items-center justify-end font-sans font-bold uppercase tabular-nums"
          style={{ ...baseStyle, color: "#001021" }}
        >
          VERIFIED
          <span
            aria-hidden
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10px",
              width: "16px",
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
              <VerifiedShieldMark height={18} color="#001021" />
            </span>
          </span>
        </span>
      );
    }

    const FALLBACK: Record<
      Exclude<VendorPublicStatus, "verified">,
      { label: string; color: string }
    > = {
      unverified: { label: "UNVERIFIED", color: "#FF3B30" },
      "under-review": { label: "UNDER REVIEW", color: "#FF9500" },
      suspended: { label: "SUSPENDED", color: "hsl(var(--muted-foreground))" },
      removed: { label: "REMOVED", color: "hsl(var(--muted-foreground))" },
    };
    const { label, color } = FALLBACK[s];
    return (
      <span
        className="shrink-0 inline-flex items-center justify-end font-sans font-bold uppercase tabular-nums"
        style={{ ...baseStyle, color }}
      >
        {label}
      </span>
    );
  };

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
          style={{ maxWidth: "600px", paddingTop: "16px", paddingBottom: "48px" }}
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
              {renderProfileStatus(status)}
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

            {/* Public Record grid — unified across all statuses */}
            <dl
              className="grid grid-cols-2"
              style={{ columnGap: "20px", rowGap: "16px" }}
            >
              <Cell label="Category" value={vendor.category} />
              <Cell label="Source Type" value={isVerified ? sourceType : undefined} />
              <Cell label="Location" value={locationLabel !== "—" ? locationLabel : undefined} />
              <Cell
                label="License / ID"
                value={isVerified ? license : undefined}
                mono
              />
              <Cell
                label="Verification Date"
                value={isVerified ? verificationDate : undefined}
                mono
              />
              <Cell
                label="Website"
                value={vendor.website ? hostname(vendor.website) : undefined}
                href={vendor.website}
              />
              <Cell
                label="Audit Date"
                value={
                  isVerified
                    ? vendor.scopeReviewDate || vendor.reviewDate
                    : undefined
                }
                mono
              />
              <Cell
                label="Medical Director"
                value={isVerified ? vendor.medicalDirector : undefined}
              />
              <Cell
                label="Clinical Focus"
                value={isVerified ? vendor.clinicalFocus : undefined}
              />
              <Cell
                label="Verified Scope"
                value={
                  isVerified && hasScope ? scopeCompounds.join(" · ") : undefined
                }
              />
            </dl>

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
                    className="mt-2"
                    style={{ fontSize: "13.5px", lineHeight: 1.55, color: "rgba(0,16,33,0.6)" }}
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
