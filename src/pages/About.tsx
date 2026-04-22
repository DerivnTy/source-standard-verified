import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const beliefs = [
  "Consumers deserve more than marketing language when evaluating a vendor.",
  "Vendors who operate with transparency should be easier to distinguish.",
  "Public clarity helps everyone understand the landscape more accurately.",
  "Documentation matters.",
];

const weVerify = [
  "Maintain a public system to review verified vendors.",
  "Publish recognized upstream sources.",
  "Document verification definitions.",
  "Provide educational material on sourcing, documentation, storage, and due diligence.",
];

const weFlag = [
  "Prescribe treatment.",
  "Endorse specific medical protocols.",
  "Replace medical advice, physician judgment, or regulatory oversight.",
  "Function as a marketing arm for any clinic or vendor.",
];

const sections = [
  { id: "why", number: "§1", label: "Why this exists" },
  { id: "reference", number: "§2", label: "Public reference" },
  { id: "gap", number: "§3", label: "Information gap" },
  { id: "beliefs", number: "§4", label: "Four beliefs" },
  { id: "scope", number: "§5", label: "Scope" },
  { id: "principle", number: "§6", label: "Operating principle" },
  { id: "audience", number: "§7", label: "Who it serves" },
  { id: "mission", number: "§8", label: "Mission" },
];

const readDeeper = [
  { to: "/governance", label: "Governance & Oversight", desc: "Clinical advisory and statutory anchors." },
  { to: "/how-it-works", label: "How verification works", desc: "Process, review, and renewal." },
  { to: "/status-definitions", label: "Status Definitions", desc: "Glossary of regulatory standings." },
  { to: "/accountability", label: "Accountability & Enforcement", desc: "Compliance protocol." },
];

const About = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-ORG-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        eyebrow="Reference · Organization profile"
        title="About Source Standard."
        lead="An independent reference framework for vendor sourcing claims in peptide, TRT, and hormone-optimization markets."
      />

      {/* Sticky horizontal contents bar */}
      <nav
        aria-label="Document sections"
        className="sticky top-0 z-30 border-b border-border bg-background"
      >
        <div className="container-wide overflow-x-auto">
          <ul className="flex gap-x-6 py-2.5 min-w-max">
            {sections.map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`font-mono text-[10.5px] uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.number} · {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* §1 — Why this exists */}
      <section id="why" className="scroll-mt-20 border-b border-border bg-background py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§1 · Foundation</p>
            <h2 className="h-section">Why this exists.</h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              In peptide, TRT, and hormone optimization markets, consumers are frequently asked to make decisions
              based on website language, branding, and trust signals that are not always easy to verify
              independently. At the same time, vendors who invest in proper sourcing, documentation, and oversight
              often operate in the same landscape as those who do not.
            </p>
            <p className="text-[14.5px] text-foreground font-medium leading-relaxed">
              Source Standard exists to make that landscape easier to understand.
            </p>
          </div>
        </div>
      </section>

      {/* §2 — Public reference */}
      <section id="reference" className="scroll-mt-20 border-b border-border bg-surface-muted py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§2 · Mandate</p>
            <h2 className="h-section">A public reference for vendor verification.</h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              Source Standard serves as a public reference for vendor verification and recognized upstream sources.
              Its purpose is not to market clinics, promote treatments, or influence care decisions. Its purpose is
              to help make sourcing and verification information more visible, more structured, and easier to
              interpret.
            </p>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              When documentation is clearer, consumers are better informed and responsible operators are easier to
              recognize.
            </p>
          </div>
        </div>
      </section>

      {/* §3 — Information gap */}
      <section id="gap" className="scroll-mt-20 border-b border-border bg-background py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§3 · Context</p>
            <h2 className="h-section">Formed to address an information gap.</h2>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              A growing industry now carries real consumer demand, real clinical interest, and real variation in how
              claims are presented. Some operators invest heavily in documentation, sourcing standards, and
              oversight. Others present similar claims with far less visibility into what stands behind them. To the
              outside observer, those differences are not always easy to see.
            </p>
            <p className="text-[14.5px] text-foreground font-medium leading-relaxed">
              Source Standard did not form to control the market. It formed to make it more legible.
            </p>
          </div>
        </div>
      </section>

      {/* §4 — Four beliefs */}
      <section id="beliefs" className="scroll-mt-20 border-b border-border bg-surface-muted py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§4 · Principles</p>
            <h2 className="h-section">Four beliefs that shape the framework.</h2>
            <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
              Foundational tenets that govern every editorial and verification decision.
            </p>
          </div>
          <div className="md:col-span-8">
            <ol className="border border-border bg-background divide-y divide-border">
              {beliefs.map((b, i) => (
                <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
                  <div className="col-span-2 meta text-primary">§4.{i + 1}</div>
                  <p className="col-span-10 text-[14.5px] text-foreground leading-relaxed">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* §5 — Scope */}
      <section id="scope" className="scroll-mt-20 border-b border-border bg-background py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§5 · Audit boundary</p>
            <h2 className="h-section">Scope of the framework — verified vs. flagged.</h2>
            <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
              A legal definition of what falls inside the auditing body's mandate, and what is recorded as outside
              it. Source Standard is the census of the industry — verified, unverified, and flagged alike.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="border border-border bg-background">
              <div className="grid grid-cols-12 gap-3 px-5 py-2.5 bg-surface-muted border-b border-border">
                <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Ref</div>
                <div className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What we verify</div>
                <div className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What we flag / exclude</div>
              </div>
              <ul className="divide-y divide-border">
                {weVerify.map((item, i) => (
                  <li key={i} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
                    <div className="col-span-2 meta text-primary">§5.{i + 1}</div>
                    <div className="col-span-5 text-[14.5px] text-foreground leading-relaxed">{item}</div>
                    <div className="col-span-5 text-[14.5px] text-muted-foreground leading-relaxed">{weFlag[i]}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Operating principle */}
      <section id="principle" className="scroll-mt-20 border-b border-border bg-surface-muted py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§6 · Doctrine</p>
            <h2 className="h-section">A single operating principle.</h2>
          </div>
          <div className="md:col-span-8">
            <div className="border border-border bg-background px-6 py-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Operating principle · §6
              </p>
              <p className="text-[15px] text-foreground leading-relaxed font-medium">
                If documentation is present and supports the published status, that status can be shown publicly. If
                it is not, it cannot.
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-[14.5px] text-muted-foreground leading-relaxed">
                  The role here is not to persuade. The role is to provide a clearer public reference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Audience */}
      <section id="audience" className="scroll-mt-20 border-b border-border bg-background py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§7 · Audience</p>
            <h2 className="h-section">Who this serves.</h2>
          </div>
          <div className="md:col-span-8">
            <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
              <li className="bg-background p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary mb-2">
                  §7.1 · For consumers
                </p>
                <p className="text-[14.5px] text-muted-foreground leading-relaxed">
                  Consumers should be able to understand more about the vendors they are evaluating. That does not
                  make every decision simple. It does mean the public has better tools for interpreting what is being
                  claimed, what has been reviewed, and what has not.
                </p>
              </li>
              <li className="bg-background p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary mb-2">
                  §7.2 · For responsible vendors
                </p>
                <p className="text-[14.5px] text-muted-foreground leading-relaxed">
                  Responsible operators often absorb the cost of doing things carefully while competing in markets
                  where those differences are not immediately visible. When transparency is easier to see, the market
                  becomes easier to interpret — fairer to vendors willing to stand behind their documentation.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* §8 — Mission */}
      <section id="mission" className="scroll-mt-20 border-b border-border bg-surface-muted py-12 md:py-16">
        <div className="container-wide grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="meta mb-3">§8 · Mission</p>
            <h2 className="h-section">Mission.</h2>
          </div>
          <div className="md:col-span-8 space-y-5">
            <p className="text-[17px] md:text-[18px] text-foreground leading-[1.6] font-semibold">
              To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide,
              TRT, and hormone optimization markets.
            </p>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              Source Standard exists to make the market easier to understand for the people moving through it.
            </p>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">
              Medical advisory oversight and the standards authorities the framework references are documented in{" "}
              <Link to="/governance" className="text-primary underline-offset-4 hover:underline">
                Governance & Oversight
              </Link>
              .
            </p>

            {/* Read deeper bar */}
            <div className="mt-8 border border-border bg-background">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground px-5 py-3 border-b border-border bg-surface-muted">
                Read deeper
              </p>
              <ul className="divide-y divide-border">
                {readDeeper.map((d) => (
                  <li key={d.to}>
                    <Link
                      to={d.to}
                      className="group grid grid-cols-12 gap-4 items-baseline px-5 py-4 hover:bg-surface-muted transition-colors"
                    >
                      <p className="col-span-12 sm:col-span-4 text-[14px] font-medium text-foreground group-hover:text-primary">
                        {d.label}
                      </p>
                      <p className="col-span-12 sm:col-span-7 text-[13px] text-muted-foreground leading-relaxed">
                        {d.desc}
                      </p>
                      <span className="hidden sm:block col-span-1 text-right text-primary text-[14px] group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cite footer */}
      <section className="bg-surface-muted py-8">
        <div className="container-wide">
          <p className="text-[12.5px] text-muted-foreground leading-[1.7]">
            <span className="font-mono uppercase tracking-[0.12em] text-foreground mr-2">Cite as ·</span>
            Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 21 / 2026.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
