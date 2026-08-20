import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { VendorPublicStatus } from "@/data/vendors";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const STATUS_ORDER: VendorPublicStatus[] = [
  "verified",
  "unverified",
  "under-review",
  "active",
  "suspended",
  "expired",
  "removed",
];

const statusLong: Record<
  VendorPublicStatus,
  { meaning: string; tells: string; notImply: string }
> = {
  verified: {
    meaning:
      "This clinic has voluntarily completed Source Standard's independent sourcing verification process.",
    tells:
      "Source Standard reviewed evidence supporting defined sourcing claims within a stated scope, recorded under a public Review ID.",
    notImply:
      "Does not imply endorsement, product approval, clinical recommendation, or a guarantee of safety.",
  },
  unverified: {
    meaning:
      "This clinic has not completed Source Standard's independent sourcing verification process.",
    tells:
      "The clinic is listed in the directory as a public record. No Source Standard verification exists for it.",
    notImply:
      "Does not indicate that Source Standard has evaluated or reached a conclusion regarding the clinic's sourcing, product quality, or safety. It is not a failed verification.",
  },
  "under-review": {
    meaning:
      "This clinic has applied and its submission is currently under review.",
    tells:
      "The record has formally entered the review pipeline and documentation is being examined.",
    notImply:
      "Does not imply any conclusion, positive or adverse, about the clinic.",
  },
  active: {
    meaning:
      "Verification for this clinic is current and in good standing within the reviewed scope.",
    tells:
      "The clinic completed verification and its record remains current as of the listed review date.",
    notImply:
      "Does not imply endorsement, product approval, or a guarantee of safety.",
  },
  suspended: {
    meaning:
      "A previously issued verification is temporarily withdrawn while a specific matter is clarified.",
    tells:
      "New information paused the published verification while additional review takes place.",
    notImply:
      "Does not constitute a final adverse finding or a determination about sourcing or product quality.",
  },
  expired: {
    meaning:
      "A previously issued verification has lapsed and has not been renewed.",
    tells:
      "The verification period ended without a completed renewal review.",
    notImply:
      "Lapse alone does not indicate any change in the clinic's sourcing, product quality, or safety.",
  },
  removed: {
    meaning:
      "The record has been withdrawn from active verification within the framework.",
    tells:
      "Either the clinic was withdrawn at request, or removal was warranted under the framework.",
    notImply:
      "Does not constitute a regulatory finding or an adjudication of wrongdoing.",
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
        title="How to Read the Registry"
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
        eyebrow="Public registry · Reader's guide"
        title="How to read the registry"
        lead="Interpreting vendor records and what each public status does, and does not, say about a vendor."
      />

      <Section density="doc">
        {sectionRow(
          "§1",
          "Scope",
          "What this registry shows.",
          <p>
            The public registry at{" "}
            <Link to="/verified-vendors" className="underline underline-offset-4">
              /verified-vendors
            </Link>{" "}
            lists vendors operating in peptide, TRT, and hormone optimization that are tracked
            by Source Standard. Each record carries a public status indicating whether a
            Source Standard verification has been published for that vendor at the time the
            page is loaded.
          </p>,
        )}
      </Section>

      <Section muted density="doc">
        {sectionRow(
          "§2",
          "Record structure",
          "How vendor records are structured.",
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
              Verified record is reopened based on new information.
            </p>
            <p>
              The status changes when the review concludes. Possible outcomes are: Verified
              (review completed and published), Suspended (verification temporarily
              withdrawn), or Removed (record taken down).
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
              reviewed. The record remains visible with a Suspended status.
            </p>
            <p>
              <span className="text-foreground">Removed</span> indicates that the record has
              been taken down from the public registry. Removal may follow a vendor's
              withdrawal request or a decision made under the Source Standard framework.
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
                Vendor Registry
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
