import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  getVendor,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_PROFILE_NOTE,
} from "@/data/vendors";
import { StatusBadge } from "@/components/StatusBadge";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const EYEBROW_BY_STATUS: Record<VendorPublicStatus, string> = {
  verified: "Verified vendor",
  "under-review": "Vendor under review",
  unverified: "Listed vendor · Unverified",
  suspended: "Vendor verification suspended",
  removed: "Removed listing",
};

// status-tinted top border for the hero capsule
const CAPSULE_BORDER: Record<VendorPublicStatus, string> = {
  verified: "border-t-verified",
  "under-review": "border-t-pending",
  unverified: "border-t-muted-foreground/40",
  suspended: "border-t-destructive",
  removed: "border-t-muted-foreground/40",
};

// left border on the §4 current-note card
const NOTE_BORDER: Record<VendorPublicStatus, string> = {
  verified: "border-l-verified",
  "under-review": "border-l-pending",
  unverified: "border-l-muted-foreground/40",
  suspended: "border-l-destructive",
  removed: "border-l-muted-foreground/40",
};

type StatusInterpretation = {
  title: string;
  means: string;
  tells: string;
  doesNotImply: string;
  scopeLede: string;
  notPublishedNote: string;
  pathwayLine: string;
};

const STATUS_INTERPRETATION: Record<VendorPublicStatus, StatusInterpretation> = {
  verified: {
    title: 'What "Verified" means',
    means:
      "Records have been reviewed and support the published scope at the time of review.",
    tells:
      "Source Standard has published a completed verification record for this vendor.",
    doesNotImply:
      "It is not a medical endorsement, a guarantee of treatment outcome, or a warranty of future practice.",
    scopeLede: "What was reviewed and what this listing covers.",
    notPublishedNote: "",
    pathwayLine: "This listing is a published Source Standard verification record.",
  },
  unverified: {
    title: 'What "Unverified" means',
    means:
      "No completed Source Standard verification is currently published for this vendor.",
    tells:
      "The listing reflects market visibility, not a completed Source Standard review.",
    doesNotImply:
      "It does not indicate that the vendor is unsafe, noncompliant, or illegitimate.",
    scopeLede: "Verification status for this vendor.",
    notPublishedNote:
      "No completed Source Standard verification is currently published for this vendor. A vendor seeking review may begin the verification process.",
    pathwayLine:
      "This vendor does not currently have a published Source Standard verification.",
  },
  "under-review": {
    title: 'What "Under Review" means',
    means:
      "An active review is in progress and a status determination has not yet been finalized.",
    tells:
      "Source Standard has accepted an application and is in the process of reviewing records.",
    doesNotImply:
      "It is not a published verification, and it does not indicate the eventual outcome of the review.",
    scopeLede: "Verification status for this vendor.",
    notPublishedNote:
      "An application is currently under review. No completed verification has been published yet.",
    pathwayLine: "This vendor's application is currently under review.",
  },
  suspended: {
    title: 'What "Suspended" means',
    means:
      "A previously published verification status is currently paused pending review or resolution.",
    tells:
      "The prior verification is not currently in effect while Source Standard reviews open questions.",
    doesNotImply:
      "It is not a final determination, and it does not by itself indicate wrongdoing.",
    scopeLede: "Verification status for this vendor.",
    notPublishedNote:
      "A previously published verification has been suspended pending review or resolution.",
    pathwayLine: "This vendor's verification is currently suspended pending review.",
  },
  removed: {
    title: 'What "Removed" means',
    means: "Verification is no longer in effect for the published scope.",
    tells:
      "The previously published verification record has been withdrawn from active status.",
    doesNotImply:
      "The record remains visible for transparency; it is not a private or hidden action.",
    scopeLede: "Verification status for this vendor.",
    notPublishedNote:
      "Verification is no longer in effect for the published scope. A vendor seeking renewed review may begin the verification process.",
    pathwayLine:
      "This vendor does not currently have a published Source Standard verification.",
  },
};

// ---------- Shared primitives ----------

const SectionHeader = ({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) => (
  <div className="text-center max-w-2xl mx-auto mb-10">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="text-[22px] md:text-[26px] font-semibold text-foreground tracking-tight">
      {title}
    </h2>
    {lede && (
      <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65]">
        {lede}
      </p>
    )}
  </div>
);

const Row = ({ label, value }: { label: string; value: ReactNode }) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div className="py-3 border-b border-border/50 last:border-b-0">
      <dt className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] text-foreground/90 leading-[1.6] max-w-[68ch]">
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
    </div>
  );
};

const CapsuleRow = ({
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
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-border/40 last:border-b-0">
      <dt className="text-[11.5px] text-muted-foreground">{label}</dt>
      <dd
        className={`text-[12.5px] text-foreground tabular-nums text-right ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
};

// ---------- Helpers ----------

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const firstSentence = (text?: string): string | undefined => {
  if (!text) return undefined;
  const trimmed = text.trim();
  const m = trimmed.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : trimmed).replace(/\.+$/, "") + ".";
};

const formatLocation = (vendor: Vendor): string =>
  vendor.city && vendor.state
    ? `${vendor.city}, ${vendor.state}`
    : vendor.city || vendor.state || "—";

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
  const interp = STATUS_INTERPRETATION[status];
  const location = formatLocation(vendor);
  const lead = firstSentence(vendor.summary) ?? VENDOR_STATUS_PROFILE_NOTE[status];

  const websiteValue = vendor.website ? (
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

  // §7 status-history rows
  const historyRows: { label: string; value: ReactNode }[] = [
    { label: "Current status", value: VENDOR_STATUS_LABEL[status] },
    { label: "Status since", value: isVerified ? vendor.reviewDate : undefined },
    { label: "Last review date", value: vendor.reviewDate },
    {
      label: "Active review",
      value: status === "under-review" ? "Yes" : "No",
    },
    {
      label:
        status === "suspended"
          ? "Suspended"
          : status === "removed"
          ? "Removed"
          : "Lapsed",
      value:
        status === "suspended" || status === "removed"
          ? vendor.reviewDate
          : undefined,
    },
  ];
  const populatedHistory = historyRows.filter((r) => r.value);

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

      {/* §1 — Identity hero */}
      <ProfileHeader
        backHref="/verified-vendors"
        backLabel="Public Directory"
        eyebrow={EYEBROW_BY_STATUS[status]}
        title={vendor.name}
        identity={
          <span className="inline-flex items-center gap-3 flex-wrap">
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
          </span>
        }
        lead={lead}
        rightSlot={
          <div className={`border border-border border-t-2 ${CAPSULE_BORDER[status]} p-5`}>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Status capsule
            </p>
            <dl className="space-y-0">
              <CapsuleRow label="Status" value={VENDOR_STATUS_LABEL[status]} />
              {isVerified && (
                <CapsuleRow label="Public since" value={vendor.reviewDate} />
              )}
              <CapsuleRow label="Last review" value={vendor.reviewDate} />
              {isVerified && (
                <CapsuleRow label="Review ID" value={vendor.reviewId} mono />
              )}
              {isVerified && (
                <CapsuleRow label="Renewal interval" value="Annual" />
              )}
              <CapsuleRow label="Website" value={websiteValue} />
            </dl>
          </div>
        }
      >
        {isVerified && vendor.reviewId && (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Review ID · <span className="text-foreground">{vendor.reviewId}</span>
          </p>
        )}
      </ProfileHeader>

      {/* §2 — What this status means */}
      <section className="bg-surface-muted border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <SectionHeader eyebrow="Interpretation" title={interp.title} />
          <dl className="max-w-3xl mx-auto">
            <Row label="What it means" value={interp.means} />
            <Row label="What it tells the public" value={interp.tells} />
            <Row label="What it does not imply" value={interp.doesNotImply} />
          </dl>
        </div>
      </section>

      {/* §3 — Public record summary */}
      <section className="bg-background border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <SectionHeader
            title="Public record"
            lede="The factual record on file with Source Standard."
          />
          <dl className="max-w-3xl mx-auto">
            <Row label="Vendor" value={vendor.name} />
            <Row label="Public status" value={VENDOR_STATUS_LABEL[status]} />
            <Row label="Location" value={location} />
            <Row label="Website" value={websiteValue} />
            <Row label="Medical director" value={vendor.medicalDirector} />
            <Row label="Category" value={vendor.category} />
            <Row label="Clinical focus" value={vendor.clinicalFocus} />
            {vendor.reviewDate && (
              <Row label="Last review" value={vendor.reviewDate} />
            )}
            {isVerified && verifiedScope && (
              <Row label="Verified scope" value={verifiedScope} />
            )}
            {isVerified && vendor.reviewId && (
              <Row
                label="Review ID"
                value={<span className="font-mono">{vendor.reviewId}</span>}
              />
            )}
          </dl>
        </div>
      </section>

      {/* §4 — Current review note (conditional) */}
      {vendor.publicNote &&
        (status === "under-review" ||
          status === "suspended" ||
          status === "removed") && (
          <section className="bg-background border-t border-border/60">
            <div className="container-wide py-12">
              <div
                className={`max-w-3xl mx-auto border border-border border-l-2 ${NOTE_BORDER[status]} p-6`}
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Current note · as of {vendor.reviewDate || "—"}
                </p>
                <p className="text-[14px] text-foreground leading-[1.7]">
                  {vendor.publicNote}
                </p>
              </div>
            </div>
          </section>
        )}

      {/* §5 — Verified scope */}
      <section className="bg-surface-muted border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <SectionHeader title="Verified scope" lede={interp.scopeLede} />
          {isVerified ? (
            <div className="max-w-3xl mx-auto">
              <dl>
                <Row label="Verified category" value={verifiedScope} />
                <Row label="Review date" value={vendor.reviewDate} />
                <Row label="Renewal interval" value="Annual" />
                {vendor.reviewId && (
                  <Row
                    label="Review ID"
                    value={<span className="font-mono">{vendor.reviewId}</span>}
                  />
                )}
              </dl>
              <p className="mt-6 text-[13px] text-muted-foreground leading-[1.7]">
                The listing reflects reviewed documentation within this scope at
                the time of review.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto border border-border bg-background p-6">
              <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium mb-2">
                Verification not currently published
              </p>
              <p className="text-[14px] text-foreground/90 leading-[1.7]">
                {interp.notPublishedNote}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* §6 — Upstream sourcing relationship (verified + publicNote only) */}
      {isVerified && vendor.publicNote && (
        <section className="bg-background border-t border-border/60">
          <div className="container-wide py-16 md:py-20">
            <SectionHeader
              title="Upstream sourcing"
              lede="How this vendor connects to the upstream reference layer."
            />
            <p className="max-w-3xl mx-auto text-[14.5px] text-foreground/90 leading-[1.75]">
              {vendor.publicNote}
            </p>
          </div>
        </section>
      )}

      {/* §7 — Status history */}
      <section className="bg-surface-muted border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <SectionHeader title="Status history" />
          <div className="max-w-3xl mx-auto">
            {populatedHistory.length >= 2 ? (
              <dl>
                {populatedHistory.map((r) => (
                  <Row key={r.label} label={r.label} value={r.value} />
                ))}
              </dl>
            ) : (
              <p className="text-center text-[13.5px] text-muted-foreground">
                No prior status events on file.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* §8 — How to read this listing */}
      <section className="bg-background border-t border-border/60">
        <div className="container-wide py-16 md:py-20">
          <SectionHeader title="How to read this listing" />
          <ul className="max-w-3xl mx-auto">
            {[
              "A verified listing reflects completed review within the published scope.",
              "An unverified listing means no completed review is currently published.",
              "This page is a public reference. Clinical decisions still belong with licensed providers.",
            ].map((line) => (
              <li
                key={line}
                className="py-3 border-b border-border/50 last:border-b-0 text-[14px] text-foreground/90 leading-[1.65]"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §9 — Vendor pathway (status-aware) */}
      <section className="bg-surface-muted border-t border-border/60">
        <div className="container-wide py-14">
          {status === "unverified" || status === "removed" ? (
            <>
              <SectionHeader title="For this vendor" />
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-[14px] text-foreground/90 leading-[1.7] mb-4">
                  {interp.pathwayLine}
                </p>
                <Link
                  to="/apply"
                  className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary hover:text-primary-hover"
                >
                  Begin verification →
                </Link>
              </div>
            </>
          ) : (
            <p className="max-w-3xl mx-auto text-center text-[13.5px] text-muted-foreground leading-[1.7]">
              {interp.pathwayLine}
            </p>
          )}
        </div>
      </section>

      {/* §10 — Continue reading */}
      <section className="bg-background border-t border-border/60">
        <div className="container-wide py-12">
          <p className="eyebrow text-center mb-5">Continue reading</p>
          <ul className="max-w-3xl mx-auto grid gap-0 md:grid-cols-4">
            {[
              { to: "/verified-vendors", label: "Back to Verified Vendors" },
              { to: "/how-it-works", label: "How Verification Works" },
              { to: "/greenlist", label: "View Upstream Greenlist" },
              { to: "/status-definitions", label: "Status Definitions" },
            ].map((l, i) => (
              <li
                key={l.to}
                className={`py-3 md:py-2 text-center border-b border-border/50 md:border-b-0 ${
                  i > 0 ? "md:border-l md:border-border/50" : ""
                }`}
              >
                <Link
                  to={l.to}
                  className="text-[13px] text-foreground/90 hover:text-primary"
                >
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §11 — Footer */}
      <ProfileFootnote
        items={[
          { label: "Listing", value: VENDOR_STATUS_LABEL[status] },
          { label: "Updated", value: vendor.reviewDate || "—" },
          {
            label: "Jurisdiction",
            value: vendor.state ? `${vendor.state} · US` : "US",
          },
        ]}
        note="Public record. No payment influences inclusion or status."
      />
    </>
  );
};

export default VendorProfile;
