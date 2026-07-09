import { Link } from "react-router-dom";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const CITATION: Item[] = [
  { term: "Source Standard ID", description: "Include the unique registry identifier associated with the record, where applicable." },
  { term: "Status date", description: "Include the date the referenced status was published or last updated." },
  { term: "Attribution", description: "Provide a direct link to the source registry page so the current public record can be reviewed." },
  { term: "Citation integrity", description: "Citations that omit identifying details may misstate the status, scope, or timing of the published record." },
];

const INTEGRITY: Item[] = [
  { term: "Bulk extraction", description: "No automated extraction, scraping, crawling, replication, or aggregation of registry content for resale, republication, or creation of derivative databases without authorization." },
  { term: "Status misrepresentation", description: "No display or implication of Verified status for any entity not currently published under that status in the registry." },
  { term: "Unauthorized use of marks", description: "No use of Source Standard names or marks in a way that implies an uncontracted partnership, endorsement, verified status, or formal relationship." },
  { term: "Registry interference", description: "No activity intended to disrupt, falsify, manipulate, or degrade the integrity of public records or related framework materials." },
  { term: "Policy response", description: "Confirmed violations may be addressed under the applicable Source Standard operating policies, registry access controls, or legal remedies." },
];

const WARRANTY: Item[] = [
  { term: "Reference basis", description: "The registry reflects Source Standard's review of available documentation, sourcing evidence, facility relationships, public records, and related materials within a defined scope and at a defined point in time." },
  { term: "As-is publication", description: "Registry data is provided as a public reference only and is not warranted as fit for any specific medical, legal, commercial, regulatory, or investment purpose." },
  { term: "Reliance limits", description: "Use of registry data is at the user's discretion. Medical decisions should be made with licensed clinicians and not on the basis of registry information alone." },
  { term: "No guarantee", description: "Source Standard does not guarantee product safety, treatment effectiveness, clinical outcomes, vendor quality, regulatory compliance, or the completeness of third-party information." },
];

const RELATED = [
  { to: "/privacy", label: "Data Governance & Privacy Policy" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/accountability", label: "Compliance & Operating Boundaries" },
  { to: "/status-definitions", label: "Status Definitions" },
];

const Terms = () => {
  const lead =
    "The terms governing access to, use of, citation of, and reliance upon Source Standard registry records, publications, and framework materials.";

  return (
    <>
      <PageMeta title="Terms of Use" description={lead} />

      <ArticleHeader
        category="Policy · Terms of Use"
        title="Terms of Use"
        lead={lead}
        backHref="/"
        backLabel="Back to Home"
      />

      <ArticleSection variant="prose">
        <p>
          These terms govern public access to Source Standard registry records, publications, framework materials, and public-reference resources. They establish the rules governing access, the permitted use of registry information, citation requirements, prohibited conduct, and the limits under which Source Standard information may be relied upon.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Registry access and acceptance">
        <p>
          Access to Source Standard registry records, publications, and framework materials constitutes acceptance of these terms and the related policies referenced on this page. If a user does not accept these terms, use of Source Standard materials should be discontinued.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Citation and reference use">
        <p>
          Registry records may be cited in journalistic, academic, clinical, or commercial contexts provided the citation preserves enough detail for the reader to identify the referenced record accurately.
        </p>
        <DefList items={CITATION} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Integrity and prohibitions">
        <p>
          Conduct that is not permitted in connection with Source Standard registry records, publications, framework materials, and public-reference resources.
        </p>
        <DefList items={INTEGRITY} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Warranty and liability">
        <p>How registry information should be understood and relied upon.</p>
        <DefList items={WARRANTY} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Jurisdiction">
        <p>
          These terms are governed by the laws of the State of Florida and applicable laws of the United States. Any dispute arising under these terms is subject to the jurisdiction of the appropriate state and federal courts located in Florida.
        </p>
      </ArticleSection>

      <ArticleSection variant="callout" kind="Continue reading" title="Related framework documents">
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

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default Terms;
