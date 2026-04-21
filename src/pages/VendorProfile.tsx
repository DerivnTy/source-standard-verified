import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  getVendor,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_PROFILE_NOTE,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { MetadataBar } from "@/components/MetadataBar";

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="px-4 py-3 border-b border-border last:border-b-0 grid grid-cols-3 gap-3">
    <dt className="meta-label text-foreground col-span-1">{label}</dt>
    <dd className="text-[13px] text-foreground col-span-2">{value || "—"}</dd>
  </div>
);

const VendorProfile = () => {
  const { slug } = useParams();
  const vendor = slug ? getVendor(slug) : undefined;

  if (!vendor) {
    return (
      <section className="container-narrow py-32 text-center">
        <p className="eyebrow mb-4">Not Found</p>
        <h1 className="text-2xl font-semibold mb-4">No vendor profile found.</h1>
        <Link
          to="/verified-vendors"
          className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
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
      <MetadataBar
        items={[
          { label: "Doc", value: `SS-REG-${(vendor.slug || "").toUpperCase().slice(0, 16)}` },
          { label: "Listing", value: VENDOR_STATUS_LABEL[vendor.status] },
          { label: "Updated", value: vendor.reviewDate || "—" },
          { label: "Jurisdiction", value: vendor.state ? `${vendor.state} · US` : "US" },
        ]}
      />

      <section className="bg-background border-b border-border">
        <div className="container-wide pt-6">
          <Link
            to="/verified-vendors"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Public Directory
          </Link>
        </div>
        <div className="container-wide py-8 md:py-12">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={vendor.status} size="md" />
                {vendor.reviewId && (
                  <span className="text-[12px] font-mono text-muted-foreground">
                    Review ID: {vendor.reviewId}
                  </span>
                )}
              </div>
              <p className="eyebrow mb-3">Public Directory · Vendor Listing</p>
              <h1 className="text-[1.5rem] md:text-[1.875rem] font-semibold tracking-tight leading-[1.2]">
                {vendor.name}
              </h1>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {(vendor.category || "Vendor")} · {location}
              </p>
              {vendor.summary && (
                <p className="mt-5 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
                  {vendor.summary}
                </p>
              )}
            </div>

            <div className="md:col-span-4">
              <div className="border border-border bg-surface-muted/60">
                <div className="px-4 py-3 border-b border-border">
                  <p className="meta-label text-foreground">Status</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    {VENDOR_STATUS_PROFILE_NOTE[vendor.status]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listing detail */}
      <section>
        <div className="container-wide py-8 md:py-10">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 border border-border bg-background">
              <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
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
                <div className="border border-border bg-background">
                  <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                    <p className="meta-label text-foreground">Public note</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {vendor.publicNote}
                    </p>
                  </div>
                </div>
              )}

              <div className="border border-border bg-surface-muted/60">
                <div className="px-4 py-2.5 border-b border-border">
                  <p className="meta-label text-foreground">Reference</p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    {VENDOR_STATUS_PROFILE_NOTE[vendor.status]}
                  </p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Directory inclusion does not constitute medical advice, product endorsement,
                    or a guarantee of clinical outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorProfile;
