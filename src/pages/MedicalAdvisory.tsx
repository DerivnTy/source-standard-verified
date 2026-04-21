import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { PlaceholderSection } from "@/components/PlaceholderSection";

const MedicalAdvisory = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-MAB-2026.01" },
        { label: "Status", value: "Draft" },
        { label: "Updated", value: "04/20/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Medical Advisory Board"
      title="Physician oversight and clinical review of framework criteria"
      lead="Reference page documenting the medical advisory roster, credentials, advisory role, and the function of clinical oversight in standard maintenance."
    />
    <PlaceholderSection docId="SS-MAB-2026.01" citeName="Medical Advisory Board" />

    {/* Read deeper */}
    <section className="border-t border-border">
      <div className="container-wide py-6">
        <div className="border border-border bg-surface-muted">
          <div className="px-4 py-2.5 border-b border-border bg-background">
            <p className="meta-label text-foreground">Read deeper</p>
          </div>
          <ul className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { to: "/governance", l: "Governance & oversight" },
              { to: "/about", l: "About Source Standard" },
              { to: "/accountability", l: "Accountability & enforcement" },
            ].map((r) => (
              <li key={r.to} className="px-4 py-3">
                <Link
                  to={r.to}
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  {r.l} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </>
);

export default MedicalAdvisory;
