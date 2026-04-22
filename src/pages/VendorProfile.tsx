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

// ---------- Status theming ----------

type Theme = {
  hairline: string; // top hairline above hero
  monogramRing: string; // monogram tile border tint
};

const THEME: Record<VendorPublicStatus, Theme> = {
  verified: { hairline: "bg-verified", monogramRing: "border-verified/40" },
  "under-review": { hairline: "bg-pending", monogramRing: "border-pending/40" },
  unverified: {
    hairline: "bg-muted-foreground/30",
    monogramRing: "border-border",
  },
  suspended: {
    hairline: "bg-destructive",
    monogramRing: "border-destructive/40",
  },
  removed: {
    hairline: "bg-muted-foreground/30",
    monogramRing: "border-border",
  },
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

const monogramOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "·";

const isPresent = (v: ReactNode | string[] | undefined | null | false): boolean => {
  if (v === null || v === undefined || v === "" || v === false) return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
};

// ---------- Locked primitives ----------

const FallbackLine = ({ children }: { children: ReactNode }) => (
  <span className="t-body-sm text-muted-foreground italic">{children}</span>
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
      <dt className="t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">
        {label}
      </dt>
      <dd
        className={`mt-1.5 t-body-sm font-medium leading-[1.5] ${
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
      <span className="t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground shrink-0">
        {label}
      </span>
      {present ? (
        <span
          className={`t-body-sm text-foreground text-right leading-[1.45] ${
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
      <p className="t-utility-xs uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1.5">
        {eyebrow}
      </p>
    )}
    <h2 className="t-section-title-sm font-semibold tracking-tight text-foreground">
      {children}
    </h2>
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
  const monogram = monogramOf(vendor.name);
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
        <div className="container-wide pt-4 pb-6">
          {/* Top nav row */}
          <Link
            to="/verified-vendors"
            className="t-utility-xs text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← Back to Directory
          </Link>

          {/* ============================================================
              UNIFIED PROFILE SURFACE — locked template
          ============================================================ */}
          <article className="border border-border bg-background">
            {/* Status hairline */}
            <div className={`h-[3px] w-full ${theme.hairline}`} aria-hidden />

            {/* ---------- IDENTITY BAND (locked: px-6 md:px-10 pt-9 pb-8) ---------- */}
            <header className="px-6 md:px-10 pt-9 pb-8 border-b border-border">
              <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
                {/* Monogram tile */}
                <div
                  className={`hidden sm:flex h-20 w-20 shrink-0 items-center justify-center border-2 ${theme.monogramRing} bg-muted/30`}
                  aria-hidden
                >
                  <span className="t-section-title-md font-semibold tracking-tight text-foreground">
                    {monogram}
                  </span>
                </div>

                {/* Identity */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    {vendor.category && (
                      <span className="t-utility-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        {vendor.category}
                      </span>
                    )}
                    <span className="text-border" aria-hidden>·</span>
                    <span className="t-utility-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                      Source Standard Public Record
                    </span>
                  </div>

                  <h1 className="t-page-title font-semibold tracking-tight text-foreground leading-[1.1] break-words max-w-[24ch]">
                    {vendor.name}
                  </h1>

                  {/* Identity meta line */}
                  <div className="mt-4 flex items-center gap-x-5 gap-y-2 flex-wrap t-body-sm text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <FulfillmentIcon
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden
                      />
                      {VENDOR_FULFILLMENT_LABEL[fulfillment]}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden
                      />
                      {location}
                    </span>
                    {vendor.clinicalFocus && vendor.clinicalFocus.length > 0 && (
                      <span className="text-muted-foreground">
                        {vendor.clinicalFocus.join(" · ")}
                      </span>
                    )}
                    {vendor.website && (
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"
                      >
                        <Globe
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden
                        />
                        {hostname(vendor.website)}
                      </a>
                    )}
                  </div>
                </div>

                {/* Status + CTA cluster */}
                <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                  <StatusBadge status={status} size="md" />
                  <p className="t-body-sm text-muted-foreground leading-[1.45] max-w-[28ch] lg:text-right">
                    {VENDOR_STATUS_PROFILE_NOTE[status]}
                  </p>
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 t-utility-xs font-medium tracking-tight"
                    >
                      Visit website <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </header>

            {/* ---------- BODY GRID — 12-col, items-stretch, divide-x ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch lg:divide-x lg:divide-border">
              {/* ===== Main column (8/12) ===== */}
              <div className="lg:col-span-8">
                {/* About — locked py-8 md:py-10, min-h to stabilize layout */}
                <section className="px-6 md:px-10 py-8 md:py-10 border-b border-border">
                  <SectionHeading eyebrow="Profile">About</SectionHeading>
                  <div className="min-h-[5.5rem]">
                    {aboutText ? (
                      <p className="t-body text-foreground/90 leading-[1.7] max-w-[68ch]">
                        {aboutText}
                      </p>
                    ) : (
                      <p className="t-body-sm text-muted-foreground italic leading-[1.6] max-w-[68ch]">
                        No public description on file. Source Standard has not
                        published an editorial summary for this vendor.
                      </p>
                    )}
                  </div>
                </section>

                {/* Public Record — locked 6-row, 2-col matrix */}
                <section
                  className={`px-6 md:px-10 py-8 md:py-10 ${
                    isVerified ? "border-b border-border" : ""
                  }`}
                >
                  <SectionHeading eyebrow="Record">Public Record</SectionHeading>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
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
                  </dl>
                </section>

                {/* Verified Scope — verified only */}
                {isVerified && (
                  <section className="px-6 md:px-10 py-8 md:py-10">
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

              {/* ===== Trust Rail (4/12) ===== */}
              <aside className="lg:col-span-4 bg-muted/20">
                <div className="px-6 md:px-8 py-8 md:py-10">
                  <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="t-utility-xs uppercase tracking-[0.16em] text-foreground font-semibold">
                      Trust Record
                    </p>
                  </div>

                  {/* Locked rail order — always-rendered rows */}
                  <dl className="border-t border-border/50">
                    <RailRow
                      label="Status"
                      value={VENDOR_STATUS_LABEL[status]}
                    />
                    <RailRow
                      label="Last reviewed"
                      value={isVerified ? vendor.reviewDate : undefined}
                    />
                    <RailRow
                      label="Review ID"
                      value={isVerified ? vendor.reviewId : undefined}
                      mono={isVerified && !!vendor.reviewId}
                    />
                    <RailRow label="Source type" value={sourceType} mono />
                    <RailRow
                      label="Clinical focus"
                      value={vendor.clinicalFocus}
                    />
                    <RailRow
                      label="Medical director"
                      value={vendor.medicalDirector}
                    />
                  </dl>

                  {isVerified && (
                    <div className="mt-6 pt-5 border-t border-border/50">
                      <p className="t-utility-xs uppercase tracking-[0.14em] text-foreground font-semibold mb-3">
                        Reviewed Components
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Sourcing documents",
                          "Pharmacy relationship",
                          "Public claims",
                          "Clinical oversight",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 t-body-sm text-foreground"
                          >
                            <span
                              aria-hidden
                              className="mt-[7px] h-[6px] w-[6px] bg-verified shrink-0"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    to="/report-concern"
                    className="group mt-6 flex items-center justify-between gap-3 border border-border bg-background px-4 py-3.5 hover:border-foreground/40 transition-colors"
                  >
                    <div>
                      <p className="t-utility-xs uppercase tracking-[0.12em] text-foreground font-semibold">
                        Report a concern
                      </p>
                      <p className="mt-0.5 t-utility-xs text-muted-foreground leading-[1.45]">
                        Flag an inaccuracy or sourcing issue.
                      </p>
                    </div>
                    <Flag
                      className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0"
                      aria-hidden
                    />
                  </Link>
                </div>
              </aside>
            </div>

            {/* ---------- FOOTER STRIP ---------- */}
            <div className="px-6 md:px-10 py-4 border-t border-border bg-muted/10 flex items-center justify-between gap-4 flex-wrap">
              <p className="t-utility-xs text-muted-foreground">
                Source Standard public record ·{" "}
                {isVerified && vendor.reviewDate
                  ? `Updated ${vendor.reviewDate}`
                  : "Listed in the directory"}
              </p>
              <p className="t-utility-xs text-muted-foreground">
                No payment influences inclusion or status.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
