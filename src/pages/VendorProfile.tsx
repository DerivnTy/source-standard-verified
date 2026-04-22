import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ExternalLink, MapPin, Globe, Building2, Flag } from "lucide-react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_PROFILE_NOTE,
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
  tickAccent: string;
  identityRule: string;
};

const THEME: Record<VendorPublicStatus, Theme> = {
  verified: { tickAccent: "bg-verified", identityRule: "bg-verified" },
  "under-review": { tickAccent: "bg-pending", identityRule: "bg-pending" },
  unverified: { tickAccent: "bg-muted-foreground/40", identityRule: "bg-muted-foreground/30" },
  suspended: { tickAccent: "bg-destructive", identityRule: "bg-destructive" },
  removed: { tickAccent: "bg-muted-foreground/40", identityRule: "bg-muted-foreground/30" },
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

const formatFullAddress = (vendor: Vendor): string | null => {
  const parts: string[] = [];
  const cityState = [vendor.city, vendor.state].filter(Boolean).join(", ");
  if (cityState) parts.push(cityState);
  if (vendor.zip) parts.push(vendor.zip);
  return parts.length ? parts.join(" ") : null;
};

const sourceTypeFor = (_v: Vendor): string => "503A / 503B / Retail";

// ---------- Primitives ----------

// Compact label/value pair used inside the right rail and center record.
const Datum = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div className="py-2 first:pt-0 last:pb-0 border-b border-border/50 last:border-0">
      <dt className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground font-semibold">
        {label}
      </dt>
      <dd
        className={`mt-1 t-body-sm text-foreground leading-[1.45] ${
          mono ? "font-mono tabular-nums" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
    </div>
  );
};

// Larger structured field used inside the center record grid.
const Field = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div>
      <p className="t-utility-xs uppercase tracking-[0.1em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className={`mt-1 t-body-sm text-foreground font-medium leading-[1.5] ${
          mono ? "font-mono tabular-nums" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </p>
    </div>
  );
};

// Section heading inside the center column.
const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold mb-3">
    {children}
  </h2>
);

// Calm "withheld" line used when verification-only data is unavailable.
const Withheld = ({ children }: { children: ReactNode }) => (
  <p className="t-body-sm text-muted-foreground leading-[1.55] italic">
    {children}
  </p>
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

  // Verified scope rendering data
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
  const hasScope = hasGroups || hasFlatCompounds || hasCategoryFallback;

  const serviceArea = (vendor as Vendor & { serviceArea?: string }).serviceArea;

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
        <div className="container-wide pt-6 pb-16">
          <Link
            to="/verified-vendors"
            className="t-utility-xs text-muted-foreground hover:text-foreground mb-5 inline-block"
          >
            ← Back to Directory
          </Link>

          {/* Trust dossier — 12-col grid on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ---------- LEFT: Identity ---------- */}
            <aside className="lg:col-span-3 lg:sticky lg:top-6 lg:self-start">
              <div className="border border-border bg-background">
                <div className={`h-[3px] w-full ${theme.identityRule}`} aria-hidden />
                <div className="p-5">
                  {vendor.category && (
                    <p className="t-utility-xs uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1.5">
                      {vendor.category}
                    </p>
                  )}
                  <h1 className="t-section-title-md font-semibold tracking-tight text-foreground leading-tight break-words">
                    {vendor.name}
                  </h1>

                  <div className="mt-3">
                    <StatusBadge status={status} size="md" />
                  </div>

                  <p className="mt-3 t-body-sm text-muted-foreground leading-[1.5]">
                    {VENDOR_STATUS_PROFILE_NOTE[status]}
                  </p>

                  <dl className="mt-4 pt-4 border-t border-border/70 space-y-2.5">
                    <div className="flex items-start gap-2 t-body-sm text-foreground">
                      <FulfillmentIcon
                        className="h-3.5 w-3.5 mt-[3px] text-muted-foreground shrink-0"
                        aria-hidden
                      />
                      <span>{VENDOR_FULFILLMENT_LABEL[fulfillment]}</span>
                    </div>
                    <div className="flex items-start gap-2 t-body-sm text-foreground">
                      <MapPin
                        className="h-3.5 w-3.5 mt-[3px] text-muted-foreground shrink-0"
                        aria-hidden
                      />
                      <span>{location}</span>
                    </div>
                    {vendor.website && (
                      <div className="flex items-start gap-2 t-body-sm text-foreground">
                        <Globe
                          className="h-3.5 w-3.5 mt-[3px] text-muted-foreground shrink-0"
                          aria-hidden
                        />
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary break-all"
                        >
                          {hostname(vendor.website)}
                        </a>
                      </div>
                    )}
                  </dl>

                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-foreground text-background hover:bg-foreground/90 t-utility-xs font-medium tracking-tight"
                    >
                      Visit website <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </aside>

            {/* ---------- CENTER: Record & narrative ---------- */}
            <main className="lg:col-span-6 space-y-6">
              {/* About */}
              <div className="border border-border bg-background p-6">
                <SectionTitle>About</SectionTitle>
                {vendor.summary || vendor.publicNote ? (
                  <p className="t-body-sm text-foreground/85 leading-[1.65]">
                    {vendor.summary || vendor.publicNote}
                  </p>
                ) : (
                  <Withheld>
                    No public description on file. Source Standard has not
                    published an editorial summary for this vendor.
                  </Withheld>
                )}
              </div>

              {/* Public Record */}
              <div className="border border-border bg-background p-6">
                <SectionTitle>Public Record</SectionTitle>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <Field label="Category" value={vendor.category} />
                  <Field label="Fulfillment" value={VENDOR_FULFILLMENT_LABEL[fulfillment]} />
                  <Field label="Clinical focus" value={vendor.clinicalFocus} />
                  <Field label="Medical director" value={vendor.medicalDirector} />
                  <Field label="Source type" value={sourceType} mono />
                  {isPhysical ? (
                    <Field label="Address" value={fullAddress || location} />
                  ) : (
                    <Field label="Service area" value={serviceArea || "Online — nationwide"} />
                  )}
                </dl>
              </div>

              {/* Verified Scope (verified vendors only) */}
              {isVerified && (
                <div className="border border-border bg-background p-6">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                    <SectionTitle>Verified Scope</SectionTitle>
                    {vendor.scopeReviewDate && (
                      <span className="t-utility-xs font-mono tabular-nums text-muted-foreground">
                        Reviewed {vendor.scopeReviewDate}
                      </span>
                    )}
                  </div>

                  {hasScope ? (
                    <>
                      {hasGroups && (
                        <div className="space-y-3">
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
                            Verified at category level. Specific compound list
                            pending publication.
                          </span>
                        </p>
                      )}

                      <p className="mt-4 pt-3 border-t border-border/60 t-utility-xs text-muted-foreground leading-[1.55]">
                        Verification applies only to the products listed.
                      </p>
                    </>
                  ) : (
                    <Withheld>Scope detail not yet published.</Withheld>
                  )}
                </div>
              )}

              {/* Reviewed Components (verified vendors only) */}
              {isVerified && (
                <div className="border border-border bg-background p-6">
                  <SectionTitle>Reviewed Components</SectionTitle>
                  <ul className="space-y-2.5">
                    {[
                      "Sourcing documents reviewed",
                      "Pharmacy relationship reviewed",
                      "Public claims reconciled",
                      "Clinical oversight reviewed",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 t-body-sm text-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-[6px] w-[6px] bg-verified shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {vendor.reviewDate && (
                    <p className="mt-4 pt-3 border-t border-border/60 t-utility-xs text-muted-foreground">
                      Last audit: <span className="font-mono tabular-nums text-foreground">{vendor.reviewDate}</span>
                    </p>
                  )}
                </div>
              )}
            </main>

            {/* ---------- RIGHT: Trust rail ---------- */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="border border-border bg-background">
                <div className="px-5 py-3 border-b border-border/70 bg-muted/30">
                  <p className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold">
                    Trust Record
                  </p>
                </div>
                <dl className="px-5 py-2">
                  <Datum label="Status" value={VENDOR_STATUS_LABEL[status]} />
                  {isVerified && vendor.reviewDate && (
                    <Datum label="Last reviewed" value={vendor.reviewDate} />
                  )}
                  {isVerified && vendor.reviewId ? (
                    <Datum label="Review ID" value={vendor.reviewId} mono />
                  ) : !isVerified ? (
                    <Datum
                      label="Review ID"
                      value={
                        <span className="text-muted-foreground italic">
                          Not on file
                        </span>
                      }
                    />
                  ) : null}
                  <Datum label="Source type" value={sourceType} mono />
                  {vendor.clinicalFocus && vendor.clinicalFocus.length > 0 && (
                    <Datum label="Clinical focus" value={vendor.clinicalFocus} />
                  )}
                  {serviceArea && (
                    <Datum label="States served" value={serviceArea} />
                  )}
                </dl>
                {isVerified && (
                  <div className="px-5 py-3 border-t border-border/70 flex items-center justify-center">
                    <VerificationShield
                      reviewId={vendor.reviewId}
                      reviewDate={vendor.reviewDate}
                      size="md"
                    />
                  </div>
                )}
              </div>

              <Link
                to="/report-concern"
                className="group flex items-center justify-between gap-2 border border-border bg-background px-5 py-4 hover:border-foreground/40 transition-colors"
              >
                <div>
                  <p className="t-utility-xs uppercase tracking-[0.12em] text-foreground font-semibold">
                    Report a concern
                  </p>
                  <p className="mt-1 t-utility-xs text-muted-foreground leading-[1.45]">
                    Flag an inaccuracy or sourcing issue.
                  </p>
                </div>
                <Flag
                  className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0"
                  aria-hidden
                />
              </Link>
            </aside>
          </div>

          {/* Footer micro-line */}
          <p className="mt-8 text-center t-utility-xs text-muted-foreground">
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
