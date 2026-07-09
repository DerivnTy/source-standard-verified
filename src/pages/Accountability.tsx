import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const ATTESTATIONS: Item[] = [
  { term: "Submission accuracy", description: "Records, claims, and category descriptions submitted at intake are expected to remain accurate throughout the review term. Material inaccuracies discovered after publication may trigger additional review." },
  { term: "Sourcing transparency", description: "Pharmacy relationships, manufacturer relationships, upstream facilities, and sourcing records tied to reviewed categories are expected to remain documented, supportable, and consistent with the published record." },
  { term: "Renewal and review cooperation", description: "The vendor is expected to respond to renewal requests, clarification requests, and review notices within the published response windows and provide updated records when requested." },
  { term: "Public-claims alignment", description: "Public-facing representations, including websites, advertising, intake materials, and third-party listings, are expected to remain consistent with the records reviewed during the verification term." },
];

const DISCLOSURE: Item[] = [
  { term: "Change in pharmacy, manufacturer, or upstream sourcing relationship", description: "Any substitution, addition, or termination of a disclosed pharmacy, outsourcing facility, or upstream source tied to a reviewed category." },
  { term: "Change in licensure status", description: "Any suspension, lapse, voluntary surrender, or jurisdictional change affecting the vendor or a disclosed upstream facility." },
  { term: "Change in ownership or operating control", description: "Any material change in ownership, controlling interest, operating entity, or registered legal identity." },
  { term: "Change in reviewed category scope", description: "Any addition, removal, or material change affecting the categories represented in the verified record." },
  { term: "Change in public-facing claims", description: "Any material change to public claims regarding sourcing, credentials, accreditation, or verified scope." },
  { term: "Regulatory or public-record action", description: "Any public notice, enforcement action, license change, warning letter, or administrative update affecting the vendor or a disclosed upstream facility." },
];

const TESTING: Item[] = [
  { term: "Scope of independent testing", description: "Source Standard may incorporate independent testing results as part of the framework, including results relating to vendors, facilities, manufacturers, products, and sourcing relationships." },
  { term: "Use of independent testing", description: "Independent testing results may inform the review of sourcing claims, manufacturer standing, facility standing, and public status." },
];

const TRIGGERS: Item[] = [
  { term: "Consumer and clinician reports", description: "Submissions received through the public reporting channel and screened as in scope under the reporting protocol." },
  { term: "Upstream record change", description: "Status change, monitoring event, testing event, registration lapse, licensure issue, sourcing change, or public-record update affecting a disclosed upstream facility or manufacturer." },
  { term: "Regulatory or public-record action", description: "Public action, warning letter, licensure update, or administrative change involving the vendor or a disclosed upstream source." },
  { term: "Claims divergence", description: "A material difference between public-facing claims and the records currently on file." },
  { term: "Non-response", description: "Failure to respond to a renewal notice, clarification request, or disclosure acknowledgment within the published response window." },
  { term: "Credential lapse", description: "Lapse of any required licensure, registration, or accreditation held by the vendor or a disclosed upstream source." },
  { term: "Independent testing result", description: "An outcome from independent testing activity that warrants reassessment of a vendor, facility, manufacturer, product, or supply-chain relationship." },
];

const ACTIONS: Item[] = [
  { term: "Additional review", description: "New information, sourcing updates, public reports, or independent testing results may be reviewed to determine whether any change to the public record is warranted." },
  { term: "Request for clarification", description: "A written request for updated information or clarification. The listing may remain in its current status while the request is being addressed." },
  { term: "Facility review", description: "A more detailed review of a facility may be undertaken when public records, independent testing, or new information indicate that additional review is warranted." },
  { term: "Manufacturer review", description: "A more detailed review of a manufacturer may be undertaken when public records, independent testing, or new information indicate that additional review is warranted." },
  { term: "Scope adjustment", description: "The verified scope may be narrowed to the categories that remain supported by current records. Categories no longer supported may be removed from the public listing." },
  { term: "Suspension", description: "Verified status may be temporarily inactive while an unresolved matter is addressed. The vendor may remain in the registry but no longer displays active Verified status." },
  { term: "Removal", description: "The record may be removed from active verification status. Re-entry requires a new submission and a new review." },
  { term: "Public note", description: "A short factual notation may be attached to a listing when clarification is warranted and supported by verifiable, non-speculative information." },
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol" },
  { to: "/status-definitions", label: "Status Definitions" },
  { to: "/report-a-concern", label: "Reporting & Registry Review" },
  { to: "/governance", label: "Compliance & Operating Boundaries" },
];

const Accountability = () => {
  const lead =
    "How Source Standard records are kept current, and how public standing is maintained over time.";

  return (
    <>
      <PageMeta title="Compliance" description={lead} />

      <ArticleHeader
        category="Governance · Compliance"
        title="Record Maintenance & Ongoing Standing"
        lead={lead}
        backHref="/about"
        backLabel="Back to About"
      />

      <ArticleSection variant="prose">
        <p>
          A Verified record reflects the information supporting a listing at a defined point in time. Standing continues while the underlying sourcing relationships, records, and public information remain consistent with the published scope.
        </p>
        <p>
          This page outlines what vendors are expected to disclose, the conditions under which a record may be revisited, and how public standing may change as new information becomes available.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Attestations">
        <p>The continuing representations accepted when Verified status is issued.</p>
        <DefList items={ATTESTATIONS} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Disclosure">
        <p>
          Events vendors are expected to report within a reasonable window when they materially affect the published record.
        </p>
        <DefList items={DISCLOSURE} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Independent testing activity">
        <p>Source Standard may conduct independent testing activity as part of the framework.</p>
        <DefList items={TESTING} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Review triggers">
        <p>Events that may trigger monitoring activity, evidence review, status reassessment, or reopening of an existing record.</p>
        <DefList items={TRIGGERS} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Status and review actions">
        <p>How public standing may change when a record no longer supports the published scope, or when new information indicates that additional review is warranted.</p>
        <DefList items={ACTIONS} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Re-entry">
        <p>
          A Suspended record may return to Verified status once the underlying matter is resolved and supported by documentation in the review file. A Removed record may return only through a new submission, new review cycle, and reassessment under the then-current framework.
        </p>
        <p>
          Prior status history, including the original determination, triggering events, and disposition, may remain part of the record and may be referenced in future review.
        </p>
      </ArticleSection>

      <ArticleSection variant="callout" kind="Continue reading" title="Related documents">
        <ul className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {RELATED.map((r, i) => (
            <li
              key={r.to}
              className={i > 0 ? "border-t border-border/40 mt-1 pt-1" : ""}
            >
              <Link
                to={r.to}
                className="group flex items-center justify-between gap-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                <span style={{ fontSize: "14.5px", fontWeight: 500 }}>{r.label}</span>
                <span aria-hidden className="font-mono text-muted-foreground/60 group-hover:text-foreground transition-colors" style={{ fontSize: "14px" }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </ArticleSection>

      <div style={{ paddingBottom: "80px" }} />
    </>
  );
};

export default Accountability;
