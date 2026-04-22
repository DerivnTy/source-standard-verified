import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

// status-tinted top border for the profile card
const CAPSULE_BORDER: Record<VendorPublicStatus, string> = {
  verified: "border-t-verified",
  "under-review": "border-t-pending",
  unverified: "border-t-muted-foreground/40",
  suspended: "border-t-destructive",
  removed: "border-t-muted-foreground/40",
};

const NON_VERIFIED_NOTE: Record<VendorPublicStatus, string> = {
  verified: "",
  unverified:
    "No completed Source Standard verification is currently published.",
  "under-review":
    "An application is currently under review. No completed verification has been published.",
  suspended:
    "A previously published verification has been suspended pending review.",
  removed:
    "Verification is no longer in effect for the published scope.",
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

// ---------- Row primitive (fits 2-col grid) ----------

const Row = ({
  label,
  value,
  span,
  mono,
}: {
  label: string;
  value: ReactNode;
  span?: boolean;
  mono?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div
      className={`py-3 border-b border-border/50 ${
        span ? "md:col-span-2" : ""
      }`}
    >
      <dt className="text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd
        className={`mt-1 text-[14px] text-foreground/90 leading-[1.55] ${
          mono ? "font-mono text-[13px]" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
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
          className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
        >
          ← Back to directory
        </Link>
      </section>
    );
  }

  const status = vendor.status;
  const isVerified = status === "verified";
  const location = formatLocation(vendor);

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

  const verifiedScope =
    isVerified && vendor.verifiedCategories && vendor.verifiedCategories.length > 0
      ? vendor.verifiedCategories.join(" · ")
      : isVerified
      ? vendor.category
      : undefined;

  const verifiedScope =
    isVerified && vendor.verifiedCategories && vendor.verifiedCategories.length > 0
      ? vendor.verifiedCategories.join(" · ")
      : isVerified
      ? vendor.category
      : undefined;

  // Verified Drug Scope rendering data
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
        <div className="container-wide pt-8 pb-4">
          {/* §1 — Identity row */}
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0">
              <Link
                to="/verified-vendors"
                className="text-[12px] text-muted-foreground hover:text-foreground mb-3 inline-block"
              >
                ← Back to Directory
              </Link>
              <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-foreground leading-tight">
                {vendor.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 flex-wrap text-[13px] text-muted-foreground">
                <StatusBadge status={status} size="md" />
                <span className="text-border">·</span>
                <span>{location}</span>
                {vendor.category && (
                  <>
                    <span className="text-border">·</span>
                    <span>{vendor.category}</span>
                  </>
                )}
                {vendor.clinicalFocus && vendor.clinicalFocus[0] && (
                  <>
                    <span className="text-border">·</span>
                    <span>{vendor.clinicalFocus[0]}</span>
                  </>
                )}
              </div>
            </div>

            {vendor.website && (
              <div className="hidden md:flex items-center gap-4 text-[12.5px]">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* §2 — Profile card */}
          <div
            className={`mt-6 border border-border border-t-2 ${CAPSULE_BORDER[status]} bg-background p-8 md:p-10`}
          >
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              <Row
                label="Public status"
                value={
                  <span className="inline-flex items-center gap-2">
                    <StatusBadge status={status} size="sm" />
                    <span>{VENDOR_STATUS_LABEL[status]}</span>
                  </span>
                }
              />
              <Row label="Legal / public name" value={vendor.name} />
              <Row label="Location" value={location} />
              <Row label="Website" value={websiteLink} />
              <Row label="Medical director" value={vendor.medicalDirector} />
              <Row label="Category" value={vendor.category} />
              <Row label="Clinical focus" value={vendor.clinicalFocus} />
              {vendor.state && <Row label="State" value={vendor.state} />}
              {isVerified && verifiedScope && (
                <Row label="Verified scope" value={verifiedScope} />
              )}
              {vendor.reviewDate && (
                <Row label="Last review date" value={vendor.reviewDate} />
              )}
              {isVerified && vendor.reviewId && (
                <Row label="Review ID" value={vendor.reviewId} mono />
              )}

              {isVerified && vendor.publicNote && (
                <Row
                  span
                  label="Upstream source summary"
                  value={vendor.publicNote}
                />
              )}

              {!isVerified && (
                <div className="md:col-span-2 py-3 border-b border-border/50">
                  <p className="text-[13px] text-muted-foreground leading-[1.6]">
                    {NON_VERIFIED_NOTE[status]}
                  </p>
                </div>
              )}

              {/* Verified Drug Scope — full-width inside card */}
              <div className="md:col-span-2 py-4 border-b border-border/50">
                <dt className="text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground font-medium">
                  Verified drug scope
                </dt>
                <dd className="mt-2">
                  {!isVerified && (
                    <p className="text-[13px] text-muted-foreground leading-[1.6]">
                      No verified drug scope is currently published.
                    </p>
                  )}

                  {isVerified && hasGroups && (
                    <div className="space-y-4">
                      {Object.entries(vendor.verifiedScopeGroups!).map(
                        ([category, compounds]) => (
                          <div key={category}>
                            <p className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium mb-1.5">
                              {category}
                            </p>
                            <ul className="text-[14px] text-foreground/90 leading-[1.7]">
                              {compounds.map((c) => (
                                <li key={c}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {isVerified && !hasGroups && hasFlatCompounds && (
                    <ul className="text-[14px] text-foreground/90 leading-[1.7]">
                      {vendor.verifiedCompounds!.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}

                  {isVerified && hasCategoryFallback && (
                    <>
                      <p className="text-[12.5px] text-muted-foreground italic mb-2">
                        Verified at category level. Specific compound list pending
                        publication.
                      </p>
                      <ul className="text-[14px] text-foreground/90 leading-[1.7]">
                        {vendor.verifiedCategories!.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {isVerified &&
                    (hasGroups || hasFlatCompounds || hasCategoryFallback) && (
                      <>
                        <p className="mt-4 text-[12.5px] text-muted-foreground leading-[1.6]">
                          Verification applies only to the products listed above.
                          Other products offered by this vendor are not within the
                          published scope.
                        </p>
                        {vendor.scopeReviewDate && (
                          <p className="mt-1 text-[12.5px] text-muted-foreground">
                            Scope reviewed {vendor.scopeReviewDate}.
                          </p>
                        )}
                      </>
                    )}

                  {isVerified &&
                    !hasGroups &&
                    !hasFlatCompounds &&
                    !hasCategoryFallback && (
                      <p className="text-[13px] text-muted-foreground leading-[1.6]">
                        No verified drug scope is currently published.
                      </p>
                    )}
                </dd>
              </div>
            </dl>

            {/* §3 — Action area */}
            {vendor.website && (
              <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-end gap-5 flex-wrap text-[12.5px]">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* §4 — Footer micro-line */}
          <p className="mt-6 pb-12 text-center text-[11.5px] text-muted-foreground">
            Public record · Updated {vendor.reviewDate || "—"} · No payment
            influences inclusion or status.
          </p>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
