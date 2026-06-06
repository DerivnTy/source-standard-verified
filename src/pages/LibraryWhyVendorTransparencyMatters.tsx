import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
} from "@/components/ArticleSection";

const DOC_ID = "SS-GUIDE-004";

const LibraryWhyVendorTransparencyMatters = () => {
  return (
    <>
      <PageMeta
        title="Why Vendor Transparency Matters · Resource Library"
        description="Why transparent sourcing relationships help consumers evaluate compounded therapy providers with greater confidence."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Latest Publications" },
        ]}
      />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Why Vendor Transparency Matters"
        lead="Understanding why sourcing transparency has become one of the most important signals in the compounded therapy industry."
        metadata={[
          { label: "Updated", value: "06 / 06 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="The transparency problem">
        <p>
          Most consumers only see the brand, clinic, telehealth provider, or online vendor they purchase from.
        </p>
        <p>
          What they do not see is the supply chain operating behind that organization.
        </p>
        <p>
          Compounded medications often move through multiple entities before reaching the consumer, including suppliers, compounding facilities, dispensing pharmacies, and fulfillment partners.
        </p>
        <p>
          Because much of this process occurs behind the scenes, consumers are often asked to rely on marketing claims rather than verifiable information.
        </p>
        <p>
          Transparency helps close that gap.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Why sourcing relationships matter">
        <p>
          A vendor’s sourcing relationship is one of the most important pieces of information a consumer can understand.
        </p>
        <p>
          When a vendor identifies the facilities involved in its supply chain, consumers gain greater visibility into where medications originate and how those medications move through the system.
        </p>
        <p>
          Facility transparency also allows public records, licensing information, registrations, and supporting documentation to be reviewed independently.
        </p>
        <p>
          Without sourcing transparency, meaningful verification becomes difficult.
        </p>
      </ArticleSection>

      <ArticleSection n={3} title="Documentation creates accountability">
        <p>
          Claims alone are easy to make.
        </p>
        <p>
          Documentation creates accountability.
        </p>
        <p>
          When sourcing relationships are supported by records, invoices, registrations, facility disclosures, or other supporting evidence, consumers have a stronger foundation for evaluating those claims.
        </p>
        <p>
          Documentation does not guarantee outcomes.
        </p>
        <p>
          However, it provides a reviewable record that can be evaluated more objectively than marketing language alone.
        </p>
      </ArticleSection>

      <ArticleSection n={4} title="Why transparency benefits everyone">
        <p>
          Transparency benefits consumers by providing greater visibility into the supply chain.
        </p>
        <p>
          It benefits responsible vendors by allowing them to demonstrate sourcing relationships more clearly.
        </p>
        <p>
          It also benefits the broader industry by encouraging higher standards of disclosure and accountability.
        </p>
        <p>
          As compounded therapies continue to grow in popularity, transparent sourcing practices will become increasingly important for both consumers and providers.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Transparency does not guarantee quality, safety, or clinical outcomes. However, transparent sourcing relationships provide consumers with more information than unsupported claims alone and create a stronger foundation for evaluating compounded therapy vendors.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Resource Library · Why Vendor Transparency Matters, ${DOC_ID}. Last updated 06 / 06 / 2026.`}
      />
    </>
  );
};

export default LibraryWhyVendorTransparencyMatters;
