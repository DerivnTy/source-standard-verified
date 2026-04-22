import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";

/* ───────────────── Hero actions ───────────────── */

const ghostBtnPrimary =
  "border-2 border-white text-white px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-white/10 transition-colors";

const ghostBtnSecondary =
  "border border-white/40 text-white px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-white/10 hover:border-white transition-colors";

const HeroActions = () => (
  <>
    <Link to="/directory" className={ghostBtnPrimary}>
      Access Vendor Registry
    </Link>
    <Link to="/apply" className={ghostBtnSecondary}>
      Begin Verification
    </Link>
  </>
);

/* ───────────────── Static section data ───────────────── */

const whyExists = [
  {
    h: "Claims are easy to make.",
    b: "In this market, any clinic can describe its sourcing in marketing language.",
  },
  {
    h: "Documentation is harder to verify.",
    b: "Licensed pharmacy relationships, invoices, and accreditation records rarely reach the public.",
  },
  {
    h: "Source Standard makes that difference visible.",
    b: "The registry publishes which vendors can substantiate their sourcing and which cannot.",
  },
];

const howItWorks = [
  {
    h: "Upstream sources are reviewed.",
    b: "FDA registration, state licensure, and accreditation records of 503A and 503B pharmacies.",
  },
  {
    h: "Vendors are assessed against those sources.",
    b: "Clinic relationships, invoices, and supply chain are reconciled against the upstream record.",
  },
  {
    h: "Status is published in the public registry.",
    b: "Verified, pending, suspended, or removed — with the date of the most recent review.",
  },
];

const registryFields = [
  { h: "Verification status", b: "The current public standing of each listing." },
  { h: "City and state", b: "The operating jurisdiction of the clinic." },
  { h: "Clinical focus", b: "The therapeutic categories the clinic serves." },
  { h: "Upstream source relationships", b: "The licensed pharmacies the clinic substantiates." },
  { h: "Last review date", b: "When the listing was most recently reconciled." },
  { h: "Status changes", b: "A record of suspensions, reinstatements, and removals." },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "A documented reference point beyond marketing claims.",
  },
  {
    h: "For responsible vendors",
    b: "A public trust signal tied to reviewed records.",
  },
  {
    h: "For the market",
    b: "A clearer line between documented and undocumented sourcing.",
  },
];

const anchors = [
  { k: "FDA", d: "Drug establishment and 503B outsourcing facility records." },
  { k: "USP", d: "Compendial monographs and quality standards." },
  { k: "PCAB", d: "Pharmacy compounding accreditation credentials." },
  { k: "NSF", d: "Public health and supply-chain standards." },
];

const basics = [
  {
    t: "What verification actually means",
    s: "How a Source Standard listing is issued and what it does — and does not — claim.",
    to: "/library/what-source-standard-verification-actually-means",
  },
  {
    t: "503A vs 503B",
    s: "The two regulatory categories of compounding pharmacy and what distinguishes them.",
    to: "/library/what-is-compounding",
  },
  {
    t: "How to read a CoA",
    s: "The structural fields of a Certificate of Analysis and the discrepancies to look for.",
    to: "/library/how-to-read-a-certificate-of-analysis",
  },
  {
    t: "Questions to ask your clinic",
    s: "The sourcing questions a documented clinic should be able to answer directly.",
    to: "/library/questions-to-ask-your-clinic",
  },
];

/* ───────────────── Reusable atoms ───────────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
    {children}
  </p>
);

/* ───────────────── Page ───────────────── */

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard — The public standard for documented peptide sourcing"
        description="Source Standard verifies whether clinics and vendors can substantiate their sourcing through licensed upstream pharmacies and documented records."
      />

      {/* §1 — Hero (cover variant: homepage only) */}
      <BriefingHero
        variant="cover"
        category="United States Public Registry"
        docId=""
        title="The public standard for documented peptide sourcing"
        statement="Source Standard verifies whether clinics and vendors can substantiate their sourcing through licensed upstream pharmacies and documented records."
        tone="navy"
        actions={<HeroActions />}
      />

      {/* §2 — Why this exists */}
      <section aria-labelledby="why-exists" className="border-b border-border bg-background">
        <div className="container-wide py-16 md:py-20">
          <Eyebrow>Why this exists</Eyebrow>
          <h2
            id="why-exists"
            className="sr-only"
          >
            Why Source Standard exists
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border">
            {whyExists.map((x, i) => (
              <div key={i} className="px-0 md:px-8 first:md:pl-0 py-6 md:py-0">
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-foreground leading-snug max-w-[24ch]">
                  {x.h}
                </h3>
                <p className="mt-4 text-[14.5px] text-muted-foreground leading-[1.7] max-w-[36ch]">
                  {x.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section aria-labelledby="how-it-works" className="border-b border-border bg-surface-muted/30">
        <div className="container-wide py-16 md:py-20">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-it-works" className="sr-only">How the framework works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {howItWorks.map((s, i) => (
              <div key={i}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {(i + 1).toString().padStart(2, "0")}
                </p>
                <div className="mt-3 h-px w-8 bg-border" aria-hidden="true" />
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-foreground leading-snug max-w-[22ch]">
                  {s.h}
                </h3>
                <p className="mt-4 text-[14.5px] text-muted-foreground leading-[1.7] max-w-[38ch]">
                  {s.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §4 — What the registry shows */}
      <section aria-labelledby="registry-shows" className="border-b border-border bg-background">
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-4">
              <Eyebrow>What you can verify</Eyebrow>
              <h2
                id="registry-shows"
                className="mt-4 text-[22px] font-semibold tracking-[-0.01em] text-foreground leading-snug max-w-[18ch]"
              >
                A working public utility, not a concept.
              </h2>
              <p className="mt-5 text-[14.5px] text-muted-foreground leading-[1.7] max-w-[40ch]">
                Each registry entry is a structured record. The fields are consistent across listings and reviewed on a published cadence.
              </p>
              <Link
                to="/directory"
                className="mt-7 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
              >
                Open the registry →
              </Link>
            </div>

            <div className="col-span-12 md:col-span-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
                {registryFields.map((f) => (
                  <li key={f.h}>
                    <p className="text-[14.5px] font-semibold text-foreground tracking-[-0.005em]">
                      {f.h}
                    </p>
                    <p className="mt-1.5 text-[14px] text-muted-foreground leading-[1.65]">
                      {f.b}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Why verification matters */}
      <section aria-labelledby="why-matters" className="border-b border-border bg-surface-muted/30">
        <div className="container-wide py-16 md:py-20">
          <Eyebrow>Why verification matters</Eyebrow>
          <h2 id="why-matters" className="sr-only">Why verification matters</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border">
            {whyMatters.map((w, i) => (
              <div key={i} className="px-0 md:px-8 first:md:pl-0 py-6 md:py-0">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  {w.h}
                </p>
                <p className="mt-5 text-[16px] text-foreground leading-[1.6] max-w-[32ch]">
                  {w.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §6 — Governance & standards */}
      <section aria-labelledby="governance" className="border-b border-border bg-background">
        <div className="container-wide py-16 md:py-20">
          <Eyebrow>Governance &amp; standards</Eyebrow>
          <h2 id="governance" className="sr-only">Governance and standards</h2>
          <div className="mt-10 grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-5">
              <p className="text-[16px] text-foreground leading-[1.65] max-w-[44ch]">
                The framework is reviewed under medical oversight and anchored to recognized regulatory and compendial records.
              </p>
              <Link
                to="/medical-advisory"
                className="mt-6 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
              >
                Medical Advisory Board →
              </Link>
            </div>
            <div className="col-span-12 md:col-span-7">
              <ul className="divide-y divide-border border-y border-border">
                {anchors.map((a) => (
                  <li key={a.k} className="grid grid-cols-12 gap-4 py-3.5 items-baseline">
                    <span className="col-span-3 sm:col-span-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">
                      {a.k}
                    </span>
                    <span className="col-span-9 sm:col-span-10 text-[14.5px] text-muted-foreground leading-[1.6]">
                      {a.d}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/governance"
                className="mt-6 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
              >
                Governance &amp; oversight →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Resource Library entry */}
      <section aria-labelledby="basics" className="border-b border-border bg-surface-muted/30">
        <div className="container-wide py-16 md:py-20">
          <Eyebrow>Start with the basics</Eyebrow>
          <h2 id="basics" className="sr-only">Start with the basics</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {basics.map((b) => (
              <Link
                key={b.t}
                to={b.to}
                className="bg-background p-6 flex flex-col group hover:bg-surface-muted/50 transition-colors"
              >
                <h3 className="text-[15.5px] font-semibold text-foreground tracking-[-0.005em] leading-snug">
                  {b.t}
                </h3>
                <p className="mt-3 text-[14px] text-muted-foreground leading-[1.6] flex-1">
                  {b.s}
                </p>
                <span className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-foreground transition-colors">
                  Read →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/education"
              className="inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
            >
              Resource Library →
            </Link>
          </div>
        </div>
      </section>

      {/* §8 — Final split CTA */}
      <section
        aria-labelledby="final-cta"
        className="bg-[hsl(var(--navy-surface))] text-white"
      >
        <h2 id="final-cta" className="sr-only">Next steps</h2>
        <div className="container-wide py-10 md:py-12">
          <div className="max-w-[1080px] mx-auto">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/75">
                Choose your path
              </p>
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/40">
                §8
              </span>
            </div>
            <div className="border border-white/15 rounded-[2px] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/15">
              <div className="p-9 md:p-11">
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white">
                  01 / For consumers
                </p>
                <h3 className="mt-5 text-[26px] md:text-[30px] font-semibold tracking-[-0.015em] leading-tight">
                  Search the Registry
                </h3>
                <p className="mt-3 min-h-[3.6rem] text-[14.5px] text-white/80 leading-[1.7]">
                  Look up a clinic and see what its public record actually documents.
                </p>
                <Link
                  to="/directory"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-white border-b border-white/55 hover:border-white pb-1 transition-colors"
                >
                  Open the Registry <span aria-hidden>→</span>
                </Link>
              </div>
              <div className="p-9 md:p-11">
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white">
                  02 / For vendors
                </p>
                <h3 className="mt-5 text-[26px] md:text-[30px] font-semibold tracking-[-0.015em] leading-tight">
                  Apply for Verification
                </h3>
                <p className="mt-3 min-h-[3.6rem] text-[14.5px] text-white/80 leading-[1.7]">
                  A public listing is a trust asset, not just a status marker.
                </p>
                <Link
                  to="/apply"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-white border-b border-white/55 hover:border-white pb-1 transition-colors"
                >
                  Begin Verification <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
