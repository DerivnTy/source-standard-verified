import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { VendorPublicStatus } from "@/data/vendors";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const STATUS_ORDER: VendorPublicStatus[] = [
  "verified",
  "under-review",
  "unverified",
  "suspended",
  "removed",
];

const statusLong: Record<
  VendorPublicStatus,
  { meaning: string; tells: string; notImply: string }
> = {
  verified: {
    meaning:
      "A documented Source Standard review has been completed and published for this vendor.",
    tells:
      "Records, licensing, and sourcing documentation were reviewed and found consistent with public claims within the listed scope at the time of publication.",
    notImply:
      "Does not imply endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.",
  },
  "under-review": {
    meaning:
      "An active Source Standard review is in progress for this vendor.",
    tells:
      "The listing has formally entered the review pipeline and documentation is being examined.",
    notImply:
      "Does not imply any conclusion about the vendor's records or sourcing.",
  },
  unverified: {
    meaning:
      "No Source Standard verification is currently published for this vendor.",
    tells:
      "Either the vendor has not entered the verification process, or a previously published verification is no longer current.",
    notImply:
      "Does not by itself indicate that the vendor is unsafe, noncompliant, or illegitimate.",
  },
  suspended: {
    meaning:
      "A previously published verification has been temporarily withdrawn pending clarification or correction.",
    tells:
      "A triggering event has paused the public verification while review is reopened.",
    notImply:
      "Does not constitute a final adverse finding against the vendor.",
  },
  removed: {
    meaning:
      "The listing has been removed from the public directory.",
    tells:
      "Either the vendor was withdrawn at request, or removal was warranted under the framework.",
    notImply:
      "Reasons for removal are not always disclosed publicly.",
  },
};

const sectionRow = (
  number: string,
  eyebrow: string,
  title: string,
  body: React.ReactNode,
) => (
  <div className="grid md:grid-cols-12 gap-8">
    <div className="md:col-span-4">
      <SectionLabel number={number} eyebrow={eyebrow} title={title} />
    </div>
    <div className="md:col-span-8 prose-readable t-body-sm text-foreground leading-relaxed">
      {body}
    </div>
  </div>
);

const HowToReadTheDirectory = () => {
  return (
    <>
      <PageMeta
        title="How to Read the Directory"
        description="Reference guide for interpreting the Source Standard registry: status definitions, scope categories, and citation discipline."
      />
      <Breadcrumb
        items={[
          { label: "Registry", to: "/verified-vendors" },
          { label: "How to Read" },
        ]}
      />

      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-DIR-GUIDE-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        eyebrow="Reference"
        title="How to read the directory"
        lead="Interpreting vendor listings and what each public status does, and does not, say about a vendor."
      />

      <Section density="doc">
        {sectionRow(
          "§1",
          "Scope",
          "What this directory shows.",
          <p>
            The public directory at{" "}
            <Link to="/verified-vendors" className="underline underline-offset-4">
              /verified-vendors
            </Link>{" "}
            lists vendors operating in peptide, TRT, and hormone optimization that are tracked
            by Source Standard. Each listing carries a public status indicating whether a
            Source Standard verification has been published for that vendor at the time the
            page is loaded.
          </p>,
        )}
      </Section>

      <Section muted density="doc">
        {sectionRow(
          "§2",
          "Listing structure",
          "How vendor listings are structured.",
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            <li>
              <span className="text-foreground">Name and location:</span> vendor name and the
              primary city/state of operation.
            </li>
            <li>
              <span className="text-foreground">Status:</span> current public verification
              status (one of five values defined below).
            </li>
            <li>
              <span className="text-foreground">Review reference:</span> when present, links
              to the published review record for the vendor.
            </li>
            <li>
              <span className="text-foreground">Clinical focus:</span> categorization of the
              vendor's stated clinical scope.
            </li>
          </ul>,
        )}
      </Section>

      <Section density="doc">
        {sectionRow(
          "§3",
          "Definitions",
          "Status definitions.",
          <div className="space-y-6">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="border-l-2 border-border pl-4">
                <StatusBadge status={s} size="md" />
                <p className="mt-2 text-foreground">{statusLong[s].meaning}</p>
                <p className="mt-1 t-body-sm text-muted-foreground">
                  <span className="text-foreground">What it tells the public:</span>{" "}
                  {statusLong[s].tells}
                </p>
                <p className="mt-1 t-body-sm text-muted-foreground">
                  <span className="text-foreground">What it does not imply:</span>{" "}
                  {statusLong[s].notImply}
                </p>
              </div>
            ))}
          </div>,
        )}
      </Section>

      <Section muted density="doc">
        {sectionRow(
          "§4",
          "Clarification",
          "What “Unverified” does and does not mean.",
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground">Unverified</span> means that Source Standard
              verification is not currently published for the vendor. This may be because the
              vendor has not entered the verification process, or because a previously
              published verification is no longer current.
            </p>
            <p>
              It does <span className="text-foreground">not</span> by itself indicate that the
              vendor is unsafe, noncompliant, or illegitimate. Many lawful and well-operated
              vendors may carry an Unverified status simply because they have not been
              reviewed under this framework.
            </p>
            <p>
              Consumers should treat Unverified as the absence of a Source Standard signal,
              not the presence of a negative one.
            </p>
          </div>,
        )}
      </Section>

      <Section density="doc">
        {sectionRow(
          "§5",
          "Process",
          "How review status works.",
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground">Under Review</span> is assigned when an active
              review opens, either at intake of a new application, or when an existing
              Verified listing is reopened in response to a triggering event.
            </p>
            <p>
              The status changes when the review concludes. Possible outcomes are: Verified
              (review completed and published), Suspended (verification temporarily
              withdrawn), or Removed (listing taken down).
            </p>
          </div>,
        )}
      </Section>

      <Section muted density="doc">
        {sectionRow(
          "§6",
          "Distinction",
          "Suspended vs. Removed.",
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground">Suspended</span> indicates that a previously
              published verification has been temporarily paused while a matter is being
              reviewed. The listing remains visible with a Suspended status.
            </p>
            <p>
              <span className="text-foreground">Removed</span> indicates that the listing has
              been taken down from the public directory. Removal may follow a vendor's
              withdrawal request or a determination by the framework.
            </p>
          </div>,
        )}
      </Section>

      <Section density="doc">
        {sectionRow(
          "§7",
          "Interpretation",
          "What status alone does and does not say.",
          <div className="space-y-3 text-muted-foreground">
            <p>
              A public status is a single signal about whether a Source Standard verification
              has been published. It is not a substitute for clinical judgment, individual
              evaluation of a vendor's services, or independent due diligence by a consumer.
            </p>
            <p>
              Verified does not guarantee outcomes. Unverified does not condemn. Under Review
              does not prejudge. Status should be read in combination with the linked review
              record (when present) and the vendor's own disclosures.
            </p>
          </div>,
        )}
      </Section>

      <Section muted bordered={false} density="doc">
        {sectionRow(
          "§8",
          "Cross-reference",
          "Related references.",
          <ul className="space-y-2">
            <li>
              <Link to="/verified-vendors" className="underline underline-offset-4">
                Verified Vendors directory
              </Link>
            </li>
            <li>
              <Link to="/status-definitions" className="underline underline-offset-4">
                Status Definitions (formal)
              </Link>
            </li>
            <li>
              <Link to="/verification-disclaimer" className="underline underline-offset-4">
                Verification Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/accountability" className="underline underline-offset-4">
                Accountability
              </Link>
            </li>
          </ul>,
        )}
      </Section>
    </>
  );
};

export default HowToReadTheDirectory;
