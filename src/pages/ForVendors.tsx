import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const docs = [
  {
    t: "Jurisdictional Registrations",
    d: "Active state and federal registrations applicable to the operating entity, including any Board of Pharmacy, Department of Health, or DEA registrations of competent jurisdiction.",
  },
  {
    t: "Procurement Nodes & Supplier Records",
    d: "Itemized disclosure of upstream procurement nodes, pharmacies, outsourcing facilities, qualified suppliers, supporting each reviewed product category, with corresponding records retained in the audit file.",
  },
  {
    t: "Certificates of Analysis (ISO-Accredited Laboratories)",
    d: "Independent third-party analytical records for relevant lots or batches, issued by ISO/IEC 17025-accredited laboratories where applicable to the category under review.",
  },
  {
    t: "Prescriber Credentials of Record",
    d: "For clinical operating models, current licensure and credentialing records for prescribing practitioners associated with the entity.",
  },
  {
    t: "503A / 503B Pharmacy Partnerships",
    d: "Documentation evidencing the relationship between the entity and any 503A compounding pharmacy or 503B outsourcing facility relied upon to fulfill listed categories.",
  },
];

const issued = [
  "A public Verified profile entered in the Source Standard Registry of record.",
  "A unique Audit ID (format SS-AUD-YYYY-NNNNN) that may be cited and independently confirmed against the registry.",
  "A Verification Transcript, the itemized public record of documentation reviewed, examination domains covered, and the standing issued.",
  "A verification badge for use on vendor-controlled surfaces, governed by the framework's attribution terms.",
];

const ForVendors = () => {
  return (
    <>
      <PageMeta
        title="For Vendors"
        description="How clinics, pharmacies, and medical vendors enter the Source Standard verification framework."
      />
      <Breadcrumb
        items={[
          { label: "Vendors" },
          { label: "Overview" },
        ]}
      />

      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-VENDOR-STD-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        eyebrow="Submission standard"
        title="Vendor Submission Standard."
        lead="Technical specifications for the records, credentials, and procurement evidence required at intake. Submitted materials are entered into the controlled audit file and examined under the forensic review protocol."
      />

      {/* §1 Mandatory Evidentiary Inventory */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-3">
                §1 · Mandatory evidentiary inventory
              </p>
              <h2 className="h-section max-w-2xl mb-8">
                Records entered into the controlled audit file.
              </h2>
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 meta-label">Ref</div>
                  <div className="col-span-4 meta-label">Evidentiary record</div>
                  <div className="col-span-6 meta-label">Specification</div>
                </div>
                <ul className="divide-y divide-border">
                  {docs.map((d, i) => (
                    <li key={d.t} className="grid grid-cols-12 px-4 py-4">
                      <div className="col-span-2 meta">§1.{i + 1}</div>
                      <div className="col-span-4">
                        <p className="text-[13px] font-semibold text-foreground">{d.t}</p>
                      </div>
                      <div className="col-span-6">
                        <p className="text-[13px] text-muted-foreground leading-relaxed">{d.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 meta-label">
                Required records vary by operating model. The reviewer of record may identify additional materials during intake; all such requests are logged to the controlled audit file.
              </p>
            </div>

            <aside className="md:col-span-4">
              <div className="md:sticky md:top-28 border border-border bg-background">
                <div className="px-4 py-2.5 border-b border-border bg-surface-muted">
                  <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-foreground">
                    Submission Checklist · SS-VENDOR-STD-2026.01
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {docs.map((d, i) => (
                    <li key={d.t} className="flex items-start gap-3 px-4 py-3">
                      <span className="meta mt-0.5">§1.{i + 1}</span>
                      <span className="text-[13px] text-foreground">{d.t}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 border-t border-border bg-surface-muted">
                  <Link
                    to="/apply"
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
                  >
                    Begin application →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* §2 Registry Deliverables & Attribution */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-3">
                §2 · Registry deliverables & attribution
              </p>
              <h2 className="h-section">
                Public record issued upon verification.
              </h2>
            </div>
            <div className="md:col-span-7 border-t border-border">
              {issued.map((r, i) => (
                <div key={r} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
                  <span className="col-span-2 md:col-span-1 meta">§2.{i + 1}</span>
                  <span className="col-span-10 md:col-span-11 text-[14px] text-foreground leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §3 Administrative Notice */}
      <section className="border-b border-border">
        <div className="container-wide py-10">
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-9">
              <div className="border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3">
                <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-1.5">
                  Administrative notice · SS-VENDOR-STD-2026.01 · §3
                </p>
                <p className="text-[13px] text-foreground leading-relaxed">
                  Initial intake is an administrative submission step and takes approximately fifteen minutes to complete. Intake does not constitute forensic review. Submitted materials are entered into the controlled audit file and examined under the verification protocol prior to any determination of standing.
                </p>
              </div>
            </div>
            <div className="md:col-span-3 md:pt-3">
              <Link
                to="/apply"
                className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover border-b border-primary pb-0.5"
              >
                Begin application →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForVendors;
