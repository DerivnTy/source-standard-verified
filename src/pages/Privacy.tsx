import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const PARTITIONING: Item[] = [
  {
    term: "Public registry data",
    description:
      "Vendor identity, facility relationships, status classifications, review scope, status history, and other information published to support transparency and public understanding.",
  },
  {
    term: "Protected review materials",
    description:
      "Invoices, sourcing records, facility documentation, certificates of analysis, licensing materials, submitted evidence, internal review materials, concern reports, and other records used to support verification activities.",
  },
  {
    term: "Independent verification records",
    description:
      "Laboratory testing reports, chain-of-custody records, product acquisition records, manufacturer testing records, facility monitoring records, and other verification-generated evidence produced by Source Standard.",
  },
  {
    term: "Access restriction",
    description:
      "Protected review materials and independent verification records are maintained within restricted environments and are accessible only to authorized personnel and approved infrastructure partners operating under confidentiality and access-control requirements.",
  },
];

const COLLECTION: Item[] = [
  { term: "Vendor intake", description: "Business credentials, operating details, sourcing records, facility relationship documentation, and related materials submitted for verification or review." },
  { term: "Monitoring data", description: "Records associated with vendor monitoring, facility monitoring, manufacturer monitoring, testing-triggered review activity, public-record monitoring, and supply-chain monitoring conducted under the framework." },
  { term: "Concern reports", description: "Supporting documentation and contact details submitted through the public reporting channel." },
  { term: "Verification activity", description: "Records generated through documentation review, evidence assessment, status review, monitoring activity, and registry maintenance processes." },
  { term: "Site analytics", description: "Site usage may be monitored through aggregate, non-identifying signals. Source Standard does not rely on advertising trackers or cross-site identification systems." },
  { term: "Independent testing activity", description: "Records generated through product acquisition, laboratory analysis, chain-of-custody tracking, facility testing, manufacturer testing, verification investigations, and supply-chain monitoring." },
];

const RETENTION: Item[] = [
  { term: "Active records", description: "Protected review materials may be retained for the duration of an entity's active status in the registry and for the period reasonably necessary to administer review, renewal, record maintenance, and related compliance processes." },
  { term: "Status history", description: "Public status transitions and related public record history may be retained to preserve the integrity and continuity of the registry timeline." },
  { term: "Withdrawn or closed submissions", description: "Documentation associated with withdrawn, denied, closed, or incomplete submissions may be held for a limited administrative period before secure disposal." },
  { term: "Secure disposal", description: "Sensitive records scheduled for deletion are disposed of through documented internal procedures designed to reduce the risk of unauthorized recovery." },
];


const Privacy = () => {
  const lead =
    "How Source Standard collects, stores, protects, and administers registry records, review materials, and verification-related information.";

  return (
    <>
      <PageMeta title="Privacy" description={lead} />

      <ArticleHeader
        category="Policy · Privacy"
        title="Privacy"
        lead={lead}
        backHref="/"
        backLabel="Back to Home"
      />

      <ArticleSection variant="prose" first>
        <p>
          Source Standard maintains two distinct information environments: public-reference records that support transparency, and protected review materials that support verification. This policy describes how those records are collected, maintained, protected, and administered throughout the verification lifecycle.
        </p>
        <p>
          The goal of this framework is to preserve the integrity of the public record while limiting access to sensitive review materials that are not published as part of the registry.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="What information we maintain">
        <p>How public registry information is separated from protected review materials.</p>
        <DefList items={PARTITIONING} />
      </ArticleSection>

      <ArticleSection variant="prose" title="How records are collected">
        <p>Categories of information that may be collected under the framework.</p>
        <DefList items={COLLECTION} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Retention">
        <p>How long records are maintained under different conditions.</p>
        <DefList items={RETENTION} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Access and use">
        <p>
          Information maintained by Source Standard is used solely to support verification activities, registry administration, monitoring processes, public-reference records, operational infrastructure, and related governance functions. Access is limited to authorized personnel and approved service providers operating under confidentiality obligations.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Privacy requests">
        <p>
          Individuals may request access to or correction of personal data held by Source Standard where applicable under law and within the limits of the framework&rsquo;s record-retention obligations. Deletion requests are reviewed in light of the organization&rsquo;s need to preserve legitimate administrative, legal, and historical recordkeeping obligations.
        </p>
      </ArticleSection>

      <ArticleSection variant="callout" kind="Contact" title="Data requests or questions">
        <p>
          Privacy inquiries may be directed to{" "}
          <a
            href="mailto:privacy@sourcestandard.org"
            className="text-foreground font-medium hover:text-primary"
          >
            privacy@sourcestandard.org
          </a>
          .
        </p>
      </ArticleSection>

      <EditorialBackLink />
    </>
  );
};

export default Privacy;
