import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ExternalLink, MapPin, Globe, Building2 } from "lucide-react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_FULFILLMENT_LABEL,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { VerificationShield } from "@/components/registry/VerificationShield";

// ---------- Status theming ----------

type Theme = {
  tickAccent: string; // 2px tick color used inside the public record
};

const THEME: Record<VendorPublicStatus, Theme> = {
  verified: { tickAccent: "bg-verified" },
  "under-review": { tickAccent: "bg-pending" },
  unverified: { tickAccent: "bg-muted-foreground/50" },
  suspended: { tickAccent: "bg-destructive" },
  removed: { tickAccent: "bg-muted-foreground/50" },
};

const FULFILLMENT_ICON: Record<VendorFulfillment, typeof Building2> = {
  "in-person": Building2,
  online: Globe,
  hybrid: MapPin,
};

// ---------- Helpers ----------

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const formatLocation = (vendor: Vendor): string =>
  vendor.city && vendor.state
    ? `${vendor.city}, ${vendor.state}`
    : vendor.city || vendor.state || "—";

// Full address for in-person / hybrid listings.
// Street address isn't in the data model yet; we render the most complete
// address we can build from city/state/zip and label it clearly.
const formatFullAddress = (vendor: Vendor): string | null => {
  const parts: string[] = [];
  const cityState = [vendor.city, vendor.state].filter(Boolean).join(", ");
  if (cityState) parts.push(cityState);
  if (vendor.zip) parts.push(vendor.zip);
  return parts.length ? parts.join(" ") : null;
};

// Source type — placeholder until modeled in data.
const sourceTypeFor = (_v: Vendor): string => "503A / 503B / Retail";

// ---------- Public Record field primitive ----------
// Inherits the modular, ticked-cell language from the registry summary strip.

const Field = ({
  label,
  value,
  tickClassName = "bg-foreground",
  mono,
  span,
}: {
  label: string;
  value: ReactNode;
  tickClassName?: string;
  mono?: boolean;
  span?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div
      className={`relative pl-3 py-2 ${
        span ? "md:col-span-2 lg:col-span-4" : ""
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-2 bottom-2 w-[2px] ${tickClassName}`}
      />
      <p className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`mt-1 t-body-sm text-foreground leading-[1.45] ${
          mono ? "font-mono tabular-nums" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </p>
    </div>
  );
};

// ---------- Page ----------

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
          ← Back to directory
        </Link>
      </section>
    );
  }

  const status = vendor.status;
  const isVerified = status === "verified";
  const theme = THEME[status];
  const location = formatLocation(vendor);
  const fulfillment = getVendorFulfillment(vendor);
  const FulfillmentIcon = FULFILLMENT_ICON[fulfillment];
  const sourceType = sourceTypeFor(vendor);
  const isPhysical = fulfillment === "in-person" || fulfillment === "hybrid";
  const fullAddress = isPhysical ? formatFullAddress(vendor) : null;

  // Verified Drug Scope rendering data
  const hasGroups =
    isVerified &&
    vendor.verifiedScopeGroups &&
    Object.keys(vendor.verifiedScopeGroups).length > 0;
  const hasFlatCompounds =
    isVerified &&
    vendor.verifiedCompounds &&
    vendor.verifiedCompounds.length > 0;
  const hasCategoryFallback =
    isVerified &&
    !hasGroups &&
    !hasFlatCompounds &&
    vendor.verifiedCategories &&
    vendor.verifiedCategories.length > 0;
  const verifiedScopeSummary =
    isVerified && vendor.verifiedCategories && vendor.verifiedCategories.length > 0
      ? vendor.verifiedCategories.join(" · ")
      : isVerified
      ? vendor.category
      : undefined;

  const websiteLink = vendor.website ? (
    <a
      href={vendor.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-foreground hover:text-primary"
    >
      {hostname(vendor.website)}
      <ExternalLink className="h-3 w-3" />
    </a>
  ) : (
    <span className="text-muted-foreground">Not listed</span>
  );

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
        <div className="container-wide pt-6 pb-12">
          <Link
            to="/verified-vendors"
            className="t-utility-xs text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← Back to Directory
          </Link>

          {/* Unified Profile Card */}
          <article className="border border-border bg-background">
            {/* Header band */}
            <header className="px-6 md:px-8 pt-6 pb-5 border-b border-border/70">
              <div className="flex items-start justify-between gap-5 flex-wrap">
                <div className="min-w-0 flex-1">
                  {vendor.category && (
                    <p className="t-utility-xs uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1.5">
                      {vendor.category}
                    </p>
                  )}
                  <h1 className="t-section-title-md font-semibold tracking-tight text-foreground leading-tight break-words max-w-[28ch]">
                    {vendor.name}
                  </h1>
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap t-body-sm text-muted-foreground">
                    <StatusBadge status={status} size="md" />
                    {isVerified && (
                      <VerificationShield
                        reviewId={vendor.reviewId}
                        reviewDate={vendor.reviewDate}
                        size="md"
                      />
                    )}
                    <span className="text-border">·</span>
                    <span className="inline-flex items-center gap-1">
                      <FulfillmentIcon className="h-3.5 w-3.5" aria-hidden />
                      {VENDOR_FULFILLMENT_LABEL[fulfillment]}
                    </span>
                    <span className="text-border">·</span>
                    <span>{location}</span>
                  </div>
                </div>

                {vendor.website && (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 t-utility-xs font-medium tracking-tight shrink-0"
                  >
                    Visit website <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </header>

            {/* Compact record grid */}
            <div className="px-6 md:px-8 py-5">
              <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-1">
                <Field
                  label="Status"
                  value={VENDOR_STATUS_LABEL[status]}
                  tickClassName={theme.tickAccent}
                />
                <Field
                  label="Fulfillment"
                  value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
                />
                <Field label="Source type" value={sourceType} mono />
                <Field label="Clinical focus" value={vendor.clinicalFocus} />
                <Field
                  label="Medical director"
                  value={vendor.medicalDirector}
                />
                <Field label="Category" value={vendor.category} />
                {isPhysical ? (
                  <Field
                    label="Address"
                    value={fullAddress || location}
                    span
                  />
                ) : (
                  <Field
                    label="Service area"
                    value="Online — nationwide"
                    span
                  />
                )}
                {(vendor as Vendor & { serviceArea?: string }).serviceArea && (
                  <Field
                    label="States served"
                    value={
                      (vendor as Vendor & { serviceArea?: string }).serviceArea
                    }
                    span
                  />
                )}
                <Field label="Website" value={websiteLink} span />
                {isVerified && vendor.reviewId && (
                  <Field
                    label="Review ID"
                    value={vendor.reviewId}
                    mono
                    tickClassName={theme.tickAccent}
                  />
                )}
                {isVerified && vendor.reviewDate && (
                  <Field label="Last reviewed" value={vendor.reviewDate} />
                )}
                {isVerified && verifiedScopeSummary && (
                  <Field
                    label="Verified scope"
                    value={verifiedScopeSummary}
                  />
                )}
              </dl>
            </div>

            {/* About */}
            {(vendor.summary || vendor.publicNote) && (
              <div className="px-6 md:px-8 py-5 border-t border-border/70">
                <h2 className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold mb-2">
                  About
                </h2>
                <p className="t-body-sm text-foreground/85 leading-[1.6]">
                  {vendor.summary || vendor.publicNote}
                </p>
              </div>
            )}

            {/* Verified scope detail (verified only, compact) */}
            {isVerified && (hasGroups || hasFlatCompounds || hasCategoryFallback) && (
              <div className="px-6 md:px-8 py-5 border-t border-border/70">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2">
                  <h2 className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold">
                    Verified Scope
                  </h2>
                  {vendor.scopeReviewDate && (
                    <span className="t-utility-xs font-mono tabular-nums text-muted-foreground">
                      Reviewed {vendor.scopeReviewDate}
                    </span>
                  )}
                </div>

                {hasGroups && (
                  <div className="space-y-2.5">
                    {Object.entries(vendor.verifiedScopeGroups!).map(
                      ([category, compounds]) => (
                        <div key={category}>
                          <p className="t-utility-xs uppercase tracking-[0.06em] text-foreground font-semibold mb-1">
                            {category}
                          </p>
                          <p className="t-body-sm text-foreground/85 leading-[1.55]">
                            {compounds.join(" · ")}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}

                {!hasGroups && hasFlatCompounds && (
                  <p className="t-body-sm text-foreground/85 leading-[1.55]">
                    {vendor.verifiedCompounds!.join(" · ")}
                  </p>
                )}

                {hasCategoryFallback && (
                  <p className="t-body-sm text-foreground/85 leading-[1.55]">
                    {vendor.verifiedCategories!.join(" · ")}
                    <span className="block mt-1 t-utility-xs text-muted-foreground italic">
                      Verified at category level. Specific compound list pending publication.
                    </span>
                  </p>
                )}

                <p className="mt-3 t-utility-xs text-muted-foreground leading-[1.55]">
                  Verification applies only to the products listed.
                </p>
              </div>
            )}
          </article>

          {/* Footer micro-line */}
          <p className="mt-5 text-center t-utility-xs text-muted-foreground">
            Public record ·{" "}
            {isVerified && vendor.reviewDate
              ? `Updated ${vendor.reviewDate}`
              : "Listed in the Source Standard directory"}{" "}
            · No payment influences inclusion or status.
          </p>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
