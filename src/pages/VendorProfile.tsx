import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  getVendor,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_PROFILE_NOTE,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { Section } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="px-5 py-3 border-b border-border last:border-b-0 grid grid-cols-12 gap-3">
    <dt className="text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground/80 col-span-4">{label}</dt>
    <dd className="text-[13px] text-foreground col-span-8">{value || "—"}</dd>
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

  return (
    <>
  return (
    <>
      <PageMeta
        title={`${vendor.name} · Verified Vendor`}
        description={`Source Standard verified vendor profile for ${vendor.name}. ${VENDOR_STATUS_LABEL[vendor.status]} · ${location}.`}
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
        eyebrow="Verified vendor"
        title={vendor.name}
        identity={
          <span className="inline-flex items-center gap-3">
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
        lead={vendor.summary}
        rightSlot={
          <div className="border border-border bg-surface-muted/60 p-5">
            <p className="meta-label text-foreground mb-2">Status</p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              {VENDOR_STATUS_PROFILE_NOTE[vendor.status]}
            </p>
          </div>
        }
      />

      <Section density="doc">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 border border-border bg-background">
            <div className="px-5 py-2.5 border-b border-border bg-surface-muted">
              <p className="meta-label text-foreground">Listing record</p>
            </div>
            <dl>
              <Field label="Vendor" value={vendor.name} />
              <Field label="Public status" value={VENDOR_STATUS_LABEL[vendor.status]} />
              <Field
                label="Location"
                value={
                  <>
                    {vendor.city || "—"}
                    {vendor.state ? `, ${vendor.state}` : ""}
                    {vendor.zip ? ` ${vendor.zip}` : ""}
                  </>
                }
              />
              <Field
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
              <Field label="Medical director" value={vendor.medicalDirector || "—"} />
              <Field label="Category" value={vendor.category || "—"} />
              <Field
                label="Clinical focus"
                value={
                  vendor.clinicalFocus && vendor.clinicalFocus.length > 0
                    ? vendor.clinicalFocus.join(" · ")
                    : "—"
                }
              />
              <Field
                label="Verified categories"
                value={
                  vendor.verifiedCategories && vendor.verifiedCategories.length > 0
                    ? vendor.verifiedCategories.join(" · ")
                    : "—"
                }
              />
              <Field
                label="Review ID"
                value={
                  vendor.reviewId ? (
                    <span className="font-mono">{vendor.reviewId}</span>
                  ) : (
                    "—"
                  )
                }
              />
              <Field label="Review date" value={vendor.reviewDate || "—"} />
            </dl>
          </div>

          <div className="md:col-span-5 space-y-6">
            {vendor.publicNote && (
              <div className="border border-border bg-background p-5">
                <p className="meta-label text-foreground mb-2">Public note</p>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                  {vendor.publicNote}
                </p>
              </div>
            )}

            <div className="border border-border bg-surface-muted/60 p-5">
              <p className="meta-label text-foreground mb-2">Reference</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                {VENDOR_STATUS_PROFILE_NOTE[vendor.status]}
              </p>
              <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                Directory inclusion does not constitute medical advice, product endorsement,
                or a guarantee of clinical outcome.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ProfileFootnote
        items={[
          { label: "Doc", value: `SS-REG-${(vendor.slug || "").toUpperCase().slice(0, 16)}` },
          { label: "Listing", value: VENDOR_STATUS_LABEL[vendor.status] },
          { label: "Updated", value: vendor.reviewDate || "—" },
          { label: "Jurisdiction", value: vendor.state ? `${vendor.state} · US` : "US" },
        ]}
      />
    </>
  );
};

export default VendorProfile;
