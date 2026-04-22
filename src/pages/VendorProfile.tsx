import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  getVendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_PROFILE_NOTE,
  VENDOR_STATUS_DISCLOSURE,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { Section } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const EYEBROW_BY_STATUS: Record<VendorPublicStatus, string> = {
  verified: "Verified vendor",
  "under-review": "Vendor under review",
  unverified: "Listed vendor · Unverified",
  suspended: "Vendor verification suspended",
  removed: "Removed listing",
};

const DLRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-12 gap-3 py-3 border-b border-border/50 last:border-b-0">
    <dt className="col-span-12 md:col-span-4 text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
      {label}
    </dt>
    <dd className="col-span-12 md:col-span-8 text-[13.5px] text-foreground leading-relaxed">
      {value || "—"}
    </dd>
  </div>
);

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

  const location =
    vendor.city && vendor.state
      ? `${vendor.city}, ${vendor.state}${vendor.zip ? ` ${vendor.zip}` : ""}`
      : vendor.city || vendor.state || "—";

  const isVerified = vendor.status === "verified";
  const lead = vendor.summary || VENDOR_STATUS_PROFILE_NOTE[vendor.status];

  return (
    <>
      <PageMeta
        title={`${vendor.name} · ${VENDOR_STATUS_LABEL[vendor.status]}`}
        description={`Source Standard public record for ${vendor.name}. ${VENDOR_STATUS_LABEL[vendor.status]} · ${location}.`}
      />
      <Breadcrumb
        items={[
          { label: "Directory", to: "/verified-vendors" },
          { label: vendor.category ?? "Clinic" },
          { label: vendor.name },
        ]}
      />
      <ProfileHeader
        backHref="/verified-vendors"
        backLabel="Public Directory"
        eyebrow={EYEBROW_BY_STATUS[vendor.status]}
        title={vendor.name}
        identity={
          <span className="inline-flex items-center gap-3 flex-wrap">
            <StatusBadge status={vendor.status} size="md" />
            <span className="text-border">·</span>
            <span>{location}</span>
            {vendor.category && (
              <>
                <span className="text-border">·</span>
                <span>{vendor.category}</span>
              </>
            )}
          </span>
        }
        lead={lead}
        rightSlot={
          <div className="border border-border p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Status at a glance
            </p>
            <p className="text-[14px] font-semibold text-foreground mb-2">
              {VENDOR_STATUS_LABEL[vendor.status]}
            </p>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed mb-4">
              {VENDOR_STATUS_PROFILE_NOTE[vendor.status]}
            </p>
            <dl className="space-y-2 text-[12px]">
              {vendor.reviewDate && (
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Last review</dt>
                  <dd className="text-foreground tabular-nums">{vendor.reviewDate}</dd>
                </div>
              )}
              {isVerified && vendor.reviewId && (
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Review ID</dt>
                  <dd className="text-foreground font-mono">{vendor.reviewId}</dd>
                </div>
              )}
            </dl>
          </div>
        }
      />

      <Section density="doc">
        {(vendor.status === "suspended" || vendor.status === "removed") && vendor.publicNote && (
          <div className="mb-8 border border-border p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">
              Current note
            </p>
            <p className="text-[13.5px] text-foreground leading-relaxed">
              {vendor.publicNote}
            </p>
          </div>
        )}

        <h2 className="text-[14px] font-semibold text-foreground mb-4">
          Public record
        </h2>
        <dl className="border-t border-border/50">
          <DLRow label="Vendor" value={vendor.name} />
          <DLRow label="Public status" value={VENDOR_STATUS_LABEL[vendor.status]} />
          <DLRow
            label="Location"
            value={
              <>
                {vendor.city || "—"}
                {vendor.state ? `, ${vendor.state}` : ""}
                {vendor.zip ? ` ${vendor.zip}` : ""}
              </>
            }
          />
          <DLRow
            label="Website"
            value={
              vendor.website ? (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:text-primary"
                >
                  {vendor.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "—"
              )
            }
          />
          <DLRow label="Medical director" value={vendor.medicalDirector || "—"} />
          <DLRow label="Category" value={vendor.category || "—"} />
          <DLRow
            label="Clinical focus"
            value={
              vendor.clinicalFocus && vendor.clinicalFocus.length > 0
                ? vendor.clinicalFocus.join(" · ")
                : "—"
            }
          />
          {isVerified && (
            <DLRow
              label="Verified scope"
              value={
                vendor.verifiedCategories && vendor.verifiedCategories.length > 0
                  ? vendor.verifiedCategories.join(" · ")
                  : "—"
              }
            />
          )}
          {vendor.reviewDate && (
            <DLRow label="Last review date" value={vendor.reviewDate} />
          )}
          {isVerified && vendor.reviewId && (
            <DLRow
              label="Review ID"
              value={<span className="font-mono">{vendor.reviewId}</span>}
            />
          )}
        </dl>

        {vendor.status === "unverified" && (
          <p className="mt-6 text-[13px] text-foreground">
            This vendor has not completed Source Standard verification.
          </p>
        )}

        {vendor.publicNote && vendor.status !== "suspended" && vendor.status !== "removed" && (
          <>
            <h2 className="mt-12 text-[14px] font-semibold text-foreground mb-4">
              Upstream sourcing relationship
            </h2>
            <p className="text-[13.5px] text-muted-foreground leading-[1.75] max-w-[70ch]">
              {vendor.publicNote}
            </p>
          </>
        )}

        <div className="mt-12 border border-border p-5">
          <p className="text-[13px] text-muted-foreground leading-[1.7]">
            {VENDOR_STATUS_DISCLOSURE[vendor.status]}
          </p>
          <p className="mt-3 text-[13px] text-muted-foreground leading-[1.7]">
            Directory inclusion does not constitute medical advice, product endorsement, or a guarantee of clinical outcome.
          </p>
        </div>
      </Section>

      <ProfileFootnote
        items={[
          { label: "Listing", value: VENDOR_STATUS_LABEL[vendor.status] },
          { label: "Updated", value: vendor.reviewDate || "—" },
          { label: "Jurisdiction", value: vendor.state ? `${vendor.state} · US` : "US" },
        ]}
      />
    </>
  );
};

export default VendorProfile;
