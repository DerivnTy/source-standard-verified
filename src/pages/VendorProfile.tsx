import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import {
  ExternalLink,
  MapPin,
  Globe,
  Building2,
  Flag,
  ShieldCheck,
} from "lucide-react";
import {
  getVendor,
  Vendor,
  VENDOR_STATUS_LABEL,
  VENDOR_FULFILLMENT_LABEL,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const FULFILLMENT_ICON: Record<VendorFulfillment, typeof Building2> = {
  "in-person": Building2,
  online: Globe,
  hybrid: MapPin,
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

// (monogram helper removed — no auto-generated logo block)

const isPresent = (v: ReactNode | string[] | undefined | null | false): boolean => {
  if (v === null || v === undefined || v === "" || v === false) return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
};

// ---------- Locked primitives ----------

const FallbackLine = ({ children }: { children: ReactNode }) => (
  <span className="t-body-md text-muted-foreground italic">{children}</span>
);

/**
 * Field — used ONLY inside Public Record (label above value).
 * Renders a muted em-dash when value is empty, so the 6-row matrix never collapses.
 */
const Field = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode | string[];
  mono?: boolean;
}) => {
  const present = isPresent(value);
  return (
    <div>
      <dt className="t-utility-xs text-muted-foreground">{label}</dt>
      <dd
        className={`mt-1.5 t-body-md leading-snug ${
          present ? "text-foreground" : "text-muted-foreground"
        } ${mono && present ? "font-mono tabular-nums" : ""}`}
      >
        {present
          ? Array.isArray(value)
            ? (value as string[]).join(", ")
            : value
          : "—"}
      </dd>
    </div>
  );
};

/**
 * RailRow — used ONLY inside Trust Record (label left, value right).
 * Renders "Not on file" when empty, so the rail never collapses.
 */
const RailRow = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode | string[];
  mono?: boolean;
}) => {
  const present = isPresent(value);
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <span className="t-utility-xs text-muted-foreground shrink-0">
        {label}
      </span>
      {present ? (
        <span
          className={`t-body-sm text-foreground text-right leading-snug ${
            mono ? "font-mono tabular-nums" : ""
          }`}
        >
          {Array.isArray(value) ? (value as string[]).join(", ") : value}
        </span>
      ) : (
        <FallbackLine>Not on file</FallbackLine>
      )}
    </div>
  );
};

const SectionHeading = ({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) => (
  <div className="mb-5">
    {eyebrow && (
      <p className="t-eyebrow-sm text-muted-foreground mb-1.5">{eyebrow}</p>
    )}
    <h2 className="t-section-title-sm text-foreground">{children}</h2>
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
  
  const location = formatLocation(vendor);
  const fulfillment = getVendorFulfillment(vendor);
  
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
  const aboutText = vendor.summary || vendor.publicNote;

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
        <div className="container-wide pt-4 pb-6 px-6">
          {/* Top nav row */}
          <Link
            to="/verified-vendors"
            className="t-utility-xs text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← Back to Directory
          </Link>

          {/* ============================================================
              UNIFIED PROFILE SURFACE — Elite Marketplace Profile
          ============================================================ */}
          <article
            className="bg-card overflow-hidden"
            style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "20px" }}
          >
            {/* ---------- IDENTITY BAND ---------- */}
            <header className="px-6 md:px-8 pt-6 pb-6">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {vendor.category && (
                  <span className="t-eyebrow-sm text-muted-foreground">
                    {vendor.category}
                  </span>
                )}
                <span className="text-border" aria-hidden>·</span>
                <span className="t-eyebrow-sm text-muted-foreground">
                  Public Record
                </span>
              </div>

              {/* Row: Name + inline status */}
              <div className="flex items-start justify-between gap-x-4 flex-wrap gap-y-2">
                <h1
                  className="font-sans font-semibold text-foreground min-w-0"
                  style={{
                    fontSize: "22px",
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em",
                    wordBreak: "normal",
                    overflowWrap: "break-word",
                  }}
                >
                  {vendor.name}
                </h1>

                {isVerified ? (
                  <span
                    className="shrink-0 inline-flex items-center gap-1.5 font-sans font-bold uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                      color: "hsl(142 70% 30%)",
                      marginTop: "4px",
                    }}
                  >
                    <ShieldCheck
                      aria-hidden
                      style={{ width: "13px", height: "13px", strokeWidth: 1.5 }}
                    />
                    Verified
                  </span>
                ) : (
                  <span
                    className="shrink-0 font-sans font-bold uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                      color: "#FF3B30",
                      marginTop: "4px",
                    }}
                  >
                    Unverified
                  </span>
                )}
              </div>

              {/* Context row — Specialty pill + Location/ONLINE, tight 4px gap under name */}
              {(() => {
                const isOnline = fulfillment === "online";
                const locationLabel = isOnline
                  ? "ONLINE"
                  : location && location !== "—"
                    ? location
                    : null;
                const focus =
                  vendor.clinicalFocus && vendor.clinicalFocus.length > 0
                    ? vendor.clinicalFocus[0]
                    : vendor.category ?? null;

                if (!focus && !locationLabel) return null;

                return (
                  <div
                    className="flex items-center gap-x-2 flex-wrap"
                    style={{ marginTop: "4px" }}
                  >
                    {focus && (
                      <span
                        className="inline-flex items-center font-sans font-semibold uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] whitespace-nowrap"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {focus}
                      </span>
                    )}
                    {locationLabel && (
                      <span
                        className="font-mono text-muted-foreground"
                        style={{ fontSize: "12px", letterSpacing: isOnline ? "0.04em" : "0" }}
                      >
                        {locationLabel}
                      </span>
                    )}
                  </div>
                );
              })()}

              {/* Visit Website CTA — sleek, full-width on mobile */}
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-pill
                  className="mt-5 inline-flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-all active:scale-[0.97] hover:opacity-90"
                  style={{
                    padding: "10px 18px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Visit Website
                  <ExternalLink
                    aria-hidden
                    style={{ width: "12px", height: "12px", strokeWidth: 1.5 }}
                  />
                </a>
              )}
            </header>

            <div className="border-b border-border" />

            {/* ---------- BODY — single column ---------- */}
            <div>
              {/* spacer wrapper open */}
              <div>

                {/* Public Record — locked 6-row, 2-col matrix (first) */}
                <section className="px-6 md:px-8 py-6 border-b border-border">
                  <SectionHeading eyebrow="Record">Public Record</SectionHeading>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                    <Field label="Category" value={vendor.category} />
                    <Field
                      label="Fulfillment"
                      value={VENDOR_FULFILLMENT_LABEL[fulfillment]}
                    />
                    <Field
                      label="Clinical focus"
                      value={vendor.clinicalFocus}
                    />
                    <Field
                      label="Medical director"
                      value={vendor.medicalDirector}
                    />
                    <Field label="Source type" value={sourceType} mono />
                    {isPhysical ? (
                      <Field label="Address" value={fullAddress || location} />
                    ) : (
                      <Field
                        label="Service area"
                        value={serviceArea || "Online — nationwide"}
                      />
                    )}
                    {isVerified && vendor.reviewDate && (
                      <Field label="Last reviewed" value={vendor.reviewDate} mono />
                    )}
                    {isVerified && vendor.reviewId && (
                      <Field label="Review ID" value={vendor.reviewId} mono />
                    )}
                  </dl>
                </section>

                {/* About — moved below Public Record */}
                <section
                  className={`px-6 md:px-8 py-6 ${
                    isVerified ? "border-b border-border" : ""
                  }`}
                >
                  <SectionHeading eyebrow="Profile">About</SectionHeading>
                  <div>
                    {aboutText ? (
                      <p className="t-body-md text-foreground/90 max-w-[68ch]">
                        {aboutText}
                      </p>
                    ) : (
                      <p className="t-body-md text-muted-foreground italic max-w-[68ch]">
                        No public description on file. Source Standard has not
                        published an editorial summary for this vendor.
                      </p>
                    )}
                  </div>
                </section>

                {/* Verified Scope — verified only */}
                {isVerified && (
                  <section className="px-6 md:px-8 py-6">
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <SectionHeading eyebrow="Verification">
                        Verified Scope
                      </SectionHeading>
                      {vendor.scopeReviewDate && (
                        <span className="t-utility-xs font-mono tabular-nums text-muted-foreground -mt-3">
                          Reviewed {vendor.scopeReviewDate}
                        </span>
                      )}
                    </div>

                    {hasScope ? (
                      <>
                        {hasGroups && (
                          <div className="space-y-4">
                            {Object.entries(vendor.verifiedScopeGroups!).map(
                              ([category, compounds]) => (
                                <div key={category}>
                                  <p className="t-utility-xs uppercase tracking-[0.08em] text-foreground font-semibold mb-1.5">
                                    {category}
                                  </p>
                                  <p className="t-body-sm text-foreground/85 leading-[1.6]">
                                    {compounds.join(" · ")}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {!hasGroups && hasFlatCompounds && (
                          <p className="t-body-sm text-foreground/85 leading-[1.6]">
                            {vendor.verifiedCompounds!.join(" · ")}
                          </p>
                        )}

                        {hasCategoryFallback && (
                          <p className="t-body-sm text-foreground/85 leading-[1.6]">
                            {vendor.verifiedCategories!.join(" · ")}
                            <span className="block mt-1 t-utility-xs text-muted-foreground italic">
                              Verified at category level. Specific compound list
                              pending publication.
                            </span>
                          </p>
                        )}

                        <p className="mt-5 pt-4 border-t border-border/60 t-utility-xs text-muted-foreground leading-[1.55]">
                          Verification applies only to the products listed.
                        </p>
                      </>
                    ) : (
                      <FallbackLine>Scope detail not yet published.</FallbackLine>
                    )}
                  </section>
                )}
              </div>

            </div>

            {/* ---------- FOOTER STRIP ---------- */}
            <div className="px-6 md:px-10 py-4 border-t border-border bg-muted/10 flex items-center justify-between gap-4 flex-wrap">
              <p className="t-utility-xs text-muted-foreground">
                Source Standard public record ·{" "}
                {isVerified && vendor.reviewDate
                  ? `Updated ${vendor.reviewDate}`
                  : "Listed in the directory"}
              </p>
              <Link
                to="/report-concern"
                className="inline-flex items-center gap-1.5 t-utility-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Flag aria-hidden style={{ width: "12px", height: "12px", strokeWidth: 1.5 }} />
                Report a concern
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
