import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const LibrarySterilePreparationIntegrity = () => {
  return (
    <>
      <PageMeta title="Why Supply Chains Matter in Compounded Therapy · Source Standard" description="How compounded medications move through facilities, vendors, and consumers, and why sourcing transparency matters." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Supply Chain Transparency" },
        ]} />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Why Supply Chains Matter in Compounded Therapy"
        lead="How compounded medications move through facilities, vendors, and consumers, and why sourcing transparency matters."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <ArticleSection n={1} title="Understanding the supply chain">
        <p>
          Consumers often interact with only one organization when obtaining a compounded medication: a clinic, telehealth provider, or online vendor. Yet behind that single point of contact, multiple organizations may participate in the supply chain.
        </p>
        <p>
          A compounded medication can move from an active pharmaceutical ingredient supplier to a compounding facility, then to a dispensing pharmacy, and finally to the vendor that the consumer sees. Each step represents a different organization with its own records, standards, and regulatory classification.
        </p>
        <p>
          Because consumers typically see only the final vendor, understanding what happens upstream is not always straightforward. Source Standard helps create greater transparency by organizing facility records, sourcing claims, documentation, and public-reference information into a structured review framework.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="The facility layer">
        <p>
          Compounding facilities are the organizations where raw or bulk ingredients are transformed into finished medications. These facilities fall into distinct regulatory categories, and their classification matters when evaluating sourcing claims.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "503A facilities", description: "Traditional compounding pharmacies that prepare medications for specific patients pursuant to individual prescriptions. They are regulated primarily by state boards of pharmacy and are not required to register with the FDA." },
            { term: "503B facilities", description: "Outsourcing facilities that can produce sterile medications in larger batches for office use without patient-specific prescriptions. They must register with the FDA and comply with current good manufacturing practice (cGMP) standards." },
            { term: "Upstream production", description: "Some facilities source active ingredients from third-party suppliers or manufacturers. Understanding where ingredients originate adds another layer to the supply chain and can affect the documentation available for review." },
            { term: "Publicly available facility information", description: "FDA registration records, state pharmacy licenses, and inspection reports can provide objective information about a facility's status, history, and regulatory standing." },
            { term: "Why facility identification matters", description: "Knowing which facility compounded a medication allows consumers to verify whether that facility is appropriately licensed, registered, and documented. Unsupported facility claims are a common red flag in sourcing review." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="The vendor layer">
        <p>
          The vendor is the organization the consumer typically sees: the brand, clinic, or platform that handles consultation, ordering, and delivery. Vendor records are distinct from facility records, and both matter for a complete sourcing picture.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Clinics", description: "Physical or hybrid clinics that provide consultations and partner with compounding pharmacies to dispense medications. Clinic-level sourcing claims should be matched against the facility actually performing the compounding." },
            { term: "Telehealth providers", description: "Remote healthcare platforms that connect patients with prescribers and coordinate with pharmacies. Telehealth models can add intermediaries to the supply chain, making facility transparency even more important." },
            { term: "Online vendors", description: "E-commerce or direct-to-consumer platforms that sell compounded products. These vendors may or may not disclose their compounding partners publicly, and their sourcing claims should be evaluated against available documentation." },
            { term: "Facility relationships", description: "A vendor's relationship with its compounding facility is one of the most important pieces of the sourcing puzzle. Documentation of that relationship provides context that marketing language alone cannot replace." },
            { term: "Sourcing claims", description: "Public statements about where medications are compounded, what standards are followed, and which facilities are involved. These claims are most useful when they can be cross-referenced against public records and documentation." },
            { term: "Supporting documentation", description: "Invoices, certificates of analysis, facility registrations, and pharmacy licenses are examples of records that can support or clarify a vendor's sourcing claims. Source Standard reviews these materials as part of its documentation process." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="Why transparency matters">
        <p>
          Sourcing transparency allows consumers to better understand where medications originate and whether public claims are supported by evidence. Without transparency, consumers are left to trust marketing language without a way to verify the underlying supply chain.
        </p>
        <p>
          Transparency also benefits the industry as a whole. Vendors that document their facility relationships and maintain clear public records demonstrate a commitment to accountability. Consumers, in turn, can make more informed evaluations when they have access to organized, reviewable information.
        </p>
        <p>
          Source Standard does not evaluate clinical outcomes or product quality directly. Its role is to create a clearer public record by documenting facility relationships, reviewing sourcing claims, and making that information available for independent evaluation.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          The organization dispensing medication is often only one part of a larger supply chain. Understanding facility relationships, sourcing claims, and supporting documentation provides greater visibility into how compounded medications move from production to patient delivery.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation="Source Standard · Resource Library. Last updated 04 / 21 / 2026."
      />
    </>
  );
};

export default LibrarySterilePreparationIntegrity;
