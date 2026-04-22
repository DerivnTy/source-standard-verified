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
      className={`relative pl-4 py-4 border-b border-border/50 ${
        span ? "md:col-span-2" : ""
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-4 bottom-4 w-[2px] ${tickClassName}`}
      />
      <p className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`mt-1.5 t-body-sm text-foreground leading-[1.55] ${
          mono ? "font-mono tabular-nums" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </p>
    </div>
  );
};

const GroupHeader = ({ children }: { children: ReactNode }) => (
  <div className="md:col-span-2 pt-7 pb-1 first:pt-0">
    <h3 className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold">
      {children}
    </h3>
  </div>
);

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
        <div className="container-wide pt-8 pb-16">
          {/* §1 — Profile Header */}
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0 flex-1">
              <Link
                to="/verified-vendors"
                className="t-utility-xs text-muted-foreground hover:text-foreground mb-3 inline-block"
              >
                ← Back to Directory
              </Link>
              {vendor.category && (
                <p className="t-utility-xs uppercase tracking-[0.12em] text-muted-foreground font-medium mb-2">
                  {vendor.category}
                </p>
              )}
              <h1 className="t-section-title-md font-semibold tracking-tight text-foreground leading-tight break-words max-w-[24ch]">
                {vendor.name}
              </h1>
              <div className="mt-3 flex items-center gap-2 flex-wrap t-body-sm text-muted-foreground">
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
                {vendor.clinicalFocus && vendor.clinicalFocus[0] && (
                  <>
                    <span className="text-border">·</span>
                    <span>{vendor.clinicalFocus[0]}</span>
                  </>
                )}
              </div>
            </div>

            {vendor.website && (
              <div className="flex md:items-start">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 t-utility-xs font-medium tracking-tight"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* §2 — Verified Scope + Exclusions (verified only) */}
          {isVerified && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Verified Scope */}
              <div className="border border-border bg-background p-7">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                  <h2 className="t-section-title-sm font-semibold text-foreground">
                    Verified Scope
                  </h2>
                  {vendor.scopeReviewDate && (
                    <span className="t-utility-xs font-mono tabular-nums text-muted-foreground">
                      Scope reviewed {vendor.scopeReviewDate}
                    </span>
                  )}
                </div>
                <p className="t-body-sm text-muted-foreground leading-[1.6] mb-5">
                  Verification covers the documented sourcing scope listed
                  below, reviewed against the Source Standard framework as of
                  the audit date.
                </p>

                {hasGroups && (
                  <div className="space-y-4">
                    {Object.entries(vendor.verifiedScopeGroups!).map(
                      ([category, compounds]) => (
                        <div key={category}>
                          <p className="t-utility-xs uppercase tracking-[0.06em] text-foreground font-semibold mb-1.5">
                            {category}
                          </p>
                          <ul className="t-body-sm text-foreground/90 leading-[1.7] list-disc pl-5">
                            {compounds.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}

                {!hasGroups && hasFlatCompounds && (
                  <ul className="t-body-sm text-foreground/90 leading-[1.7] list-disc pl-5">
                    {vendor.verifiedCompounds!.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}

                {hasCategoryFallback && (
                  <>
                    <p className="t-utility-xs text-muted-foreground italic mb-2">
                      Verified at category level. Specific compound list
                      pending publication.
                    </p>
                    <ul className="t-body-sm text-foreground/90 leading-[1.7] list-disc pl-5">
                      {vendor.verifiedCategories!.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </>
                )}

                {!hasGroups && !hasFlatCompounds && !hasCategoryFallback && (
                  <p className="t-body-sm text-muted-foreground leading-[1.6]">
                    No verified drug scope is currently published.
                  </p>
                )}

                <p className="mt-5 pt-4 border-t border-border/60 t-utility-xs text-muted-foreground leading-[1.6]">
                  Verification applies only to the products listed. Other
                  products offered by this vendor are not within the published
                  scope.
                </p>
              </div>

              {/* Not Covered */}
              <div className="border border-border bg-surface/40 p-7">
                <h2 className="t-section-title-sm font-semibold text-foreground mb-3">
                  Not Covered by This Verification
                </h2>
                <p className="t-body-sm text-muted-foreground leading-[1.6] mb-4">
                  Verification is bounded. The following are explicitly outside
                  the scope of this record.
                </p>
                <ul className="t-body-sm text-foreground/85 leading-[1.7] space-y-2">
                  {[
                    "Individual treatment outcomes",
                    "Products or categories outside the reviewed scope",
                    "Future conduct beyond the audit date",
                    "Source relationships not disclosed in the reviewed record",
                    "Medical efficacy or safety guarantees",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-[0.55em] inline-block h-[3px] w-[3px] rounded-full bg-muted-foreground shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* §3 — Public Record */}
          <div className="mt-10 border border-border bg-background px-7 md:px-9 py-8">
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
              <h2 className="t-section-title-sm font-semibold text-foreground">
                Public Record
              </h2>
              <span className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground">
                Source Standard Directory
              </span>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              <GroupHeader>Identity</GroupHeader>
              <Field
                label="Public name"
                value={vendor.name}
                tickClassName={theme.tickAccent}
              />
              <Field label="Category" value={vendor.category} />
              <Field
                label="Medical director"
                value={vendor.medicalDirector}
                span
              />

              <GroupHeader>Service</GroupHeader>
              <Field
                label="Fulfillment"
                value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
              />
              <Field label="Clinical focus" value={vendor.clinicalFocus} />
              {isPhysical ? (
                <Field
                  label="Address"
                  value={fullAddress || location}
                  span
                />
              ) : (
                <Field label="Service area" value="Online — nationwide" span />
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

              <GroupHeader>Source</GroupHeader>
              <Field label="Source type" value={sourceType} mono />
              {isVerified && verifiedScopeSummary && (
                <Field
                  label="Verified scope summary"
                  value={verifiedScopeSummary}
                />
              )}

              {isVerified && (
                <>
                  <GroupHeader>Verification record</GroupHeader>
                  {vendor.reviewId && (
                    <Field
                      label="Review ID"
                      value={vendor.reviewId}
                      mono
                      tickClassName={theme.tickAccent}
                    />
                  )}
                  {vendor.reviewDate && (
                    <Field label="Last review date" value={vendor.reviewDate} />
                  )}
                  {vendor.scopeReviewDate && (
                    <Field label="Scope reviewed" value={vendor.scopeReviewDate} />
                  )}
                  {vendor.publicNote && (
                    <Field
                      span
                      label="Upstream source summary"
                      value={vendor.publicNote}
                    />
                  )}
                </>
              )}

              <GroupHeader>Public</GroupHeader>
              <Field label="Website" value={websiteLink} span />
            </dl>
          </div>

          {/* §4 — Footer micro-line */}
          <p className="mt-8 text-center t-utility-xs text-muted-foreground">
            Public record · {isVerified && vendor.reviewDate
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
