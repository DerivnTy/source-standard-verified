import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const beliefs = [
  "Consumers deserve more than marketing language when evaluating a vendor.",
  "Vendors who operate with transparency should be easier to distinguish.",
  "Public clarity helps everyone understand the landscape more accurately.",
  "Documentation matters.",
];

const weDo = [
  "Maintain a public system to review verified vendors.",
  "Publish recognized upstream sources.",
  "Document verification definitions.",
  "Provide educational material on sourcing, documentation, storage, and due diligence.",
];

const weDoNot = [
  "Prescribe treatment.",
  "Endorse specific medical protocols.",
  "Replace medical advice, physician judgment, or regulatory oversight.",
  "Function as a marketing arm for any clinic or vendor.",
];

const About = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-ORG-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        eyebrow="About · Organization Reference"
        title="About Source Standard."
        lead="Source Standard was created to bring more clarity to a market where sourcing claims are often easy to make and difficult to evaluate."
        summary={[
          { label: "Founded", value: "2026" },
          { label: "Headquarters", value: "Tampa, FL" },
          { label: "Jurisdiction", value: "FL · US" },
          { label: "Model", value: "Documentation-first" },
        ]}
      />

      {/* §1 Context */}
      <section className="border-b border-border/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Context</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Why this exists.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                In peptide, TRT, and hormone optimization markets, consumers are frequently asked to make decisions based
                on website language, branding, and trust signals that are not always easy to verify independently. At the
                same time, vendors who invest in proper sourcing, documentation, and oversight often operate in the same
                landscape as those who do not.
              </p>
              <p className="text-foreground">
                Source Standard exists to make that landscape easier to understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Our role */}
      <section className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Our Role</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                A public reference for vendor verification.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                Source Standard serves as a public reference for vendor verification and recognized upstream sources.
              </p>
              <p>
                Its purpose is not to market clinics, promote treatments, or influence care decisions. Its purpose is to
                help make sourcing and verification information more visible, more structured, and easier to interpret.
              </p>
              <p>
                When documentation is clearer, consumers are better informed and responsible operators are easier to
                recognize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Why we formed */}
      <section className="border-b border-border/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Formation</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Formed to address an information gap.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                A growing industry now carries real consumer demand, real clinical interest, and real variation in how
                claims are presented.
              </p>
              <p>
                Some operators invest heavily in documentation, sourcing standards, and oversight. Others present similar
                claims with far less visibility into what stands behind them. To the outside observer, those differences
                are not always easy to see.
              </p>
              <p className="text-foreground">
                Source Standard did not form to control the market. It formed to make it more legible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Beliefs */}
      <section className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§4 — Beliefs</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Four beliefs that shape the framework.
              </h2>
            </div>
            <div className="md:col-span-8 border-t border-border">
              {beliefs.map((b, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-5 border-b border-border/60">
                  <div className="col-span-2 md:col-span-1 meta">§4.{i + 1}</div>
                  <div className="col-span-10 md:col-span-11">
                    <p className="text-[14px] text-foreground leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §5 Scope */}
      <section className="border-b border-border/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§5 — Scope</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Scope of the framework.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted border-b border-border/60">
                  <div className="col-span-1 meta-label">Ref</div>
                  <div className="col-span-5 meta-label">What we do</div>
                  <div className="col-span-6 meta-label">What we do not do</div>
                </div>
                <ul className="divide-y divide-border">
                  {weDo.map((item, i) => (
                    <li key={i} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
                      <div className="col-span-1 meta">§5.{i + 1}</div>
                      <div className="col-span-5 text-[13px] text-foreground leading-relaxed">{item}</div>
                      <div className="col-span-6 text-[13px] text-muted-foreground leading-relaxed">{weDoNot[i]}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Stance */}
      <section className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§6 — Stance</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                A single operating principle.
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background p-6 md:p-8">
                <p className="text-[16px] md:text-[17px] text-foreground leading-relaxed font-medium">
                  If documentation is present and supports the published status, that status can be shown publicly. If it
                  is not, it cannot.
                </p>
                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-[14px] text-muted-foreground leading-relaxed">
                    The role here is not to persuade. The role is to provide a clearer public reference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Who this serves */}
      <section className="border-b border-border/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§7 — Stakeholders</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Who this serves.
              </h2>
            </div>
            <div className="md:col-span-8 grid md:grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <p className="text-[12.5px] font-semibold text-foreground mb-3">For consumers.</p>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Consumers should be able to understand more about the vendors they are evaluating. That does not make
                  every decision simple. It does mean the public has better tools for interpreting what is being claimed,
                  what has been reviewed, and what has not.
                </p>
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-foreground mb-3">For responsible vendors.</p>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  Responsible operators often absorb the cost of doing things carefully while competing in markets where
                  those differences are not immediately visible. When transparency is easier to see, the market becomes
                  easier to interpret — fairer to vendors willing to stand behind their documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §8 Mission */}
      <section className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide py-10 md:py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§8 — Mission</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                Mission.
              </h2>
            </div>
            <div className="md:col-span-8 border-t border-border pt-6 space-y-5">
              <p className="text-[17px] md:text-[18px] text-foreground leading-relaxed font-medium max-w-2xl">
                To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide,
                TRT, and hormone optimization markets.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed max-w-2xl">
                Source Standard exists to make the market easier to understand for the people moving through it.
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Medical advisory oversight and the standards authorities the framework references are documented in{" "}
                <Link to="/governance" className="text-primary hover:text-primary-hover underline-offset-4 hover:underline">
                  Governance & Oversight
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="meta-label text-foreground mr-2">Cite as ·</span>
            Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 21 / 2026.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
