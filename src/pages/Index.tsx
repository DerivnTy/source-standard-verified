import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";

/* ───────────────── Hero actions (Navy) ─────────────────
   Surgical Ledger button protocol:
   - 2px corner radius (rounded-[2px])
   - 1px border, white on navy
   - Transparent fill; subtle white/10 fill on hover/active */

const ghostBtnPrimary =
  "rounded-[2px] border border-white text-white bg-transparent px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-white/10 active:bg-white/15 transition-colors";

const ghostBtnSecondary =
  "rounded-[2px] border border-white text-white bg-transparent px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-white/10 active:bg-white/15 transition-colors";

const HeroActions = () => (
  <>
    <Link to="/directory" className={ghostBtnPrimary}>
      Search the Registry
    </Link>
    <Link to="/apply" className={ghostBtnSecondary}>
      For Vendors: Get Verified
    </Link>
  </>
);

/* ───────────────── Section 02 actions (White) ─────────────────
   Black/navy 1px border, black text, no fill.
   Same 2px radius — institutional, surgical. */

const darkBtnPrimary =
  "rounded-[2px] border border-foreground text-foreground bg-transparent px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-foreground/5 active:bg-foreground/10 transition-colors";

const darkBtnSecondary =
  "rounded-[2px] border border-foreground text-foreground bg-transparent px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-foreground/5 active:bg-foreground/10 transition-colors";

/* ───────────────── Static section data ───────────────── */

const howItWorks = [
  {
    h: "Map the facilities.",
    b: "We track licensed 503A and 503B compounding pharmacies in the United States and organize them into an upstream reference layer.",
  },
  {
    h: "Audit the vendors.",
    b: "Clinics and online vendors are asked to substantiate their sourcing with documentation tied to those pharmacy relationships.",
  },
  {
    h: "Publish the record.",
    b: "The outcome is published in a public registry. If sourcing cannot be substantiated, the listing remains Unverified.",
  },
];

const registryFields = [
  {
    h: "Verification status",
    b: "Whether documented sourcing verification is published, under review, or not currently on file.",
  },
  {
    h: "Fulfillment model",
    b: "Whether the vendor operates as a local clinic, an online platform, or a hybrid model.",
  },
  {
    h: "Clinical focus",
    b: "The therapeutic categories the vendor publicly operates within.",
  },
  {
    h: "Upstream sources",
    b: "The licensed pharmacies or facilities the vendor is documented to source from when verification is on file.",
  },
];

const whyMatters = [
  {
    h: "For consumers",
    b: "Instant clarity on whether a clinic's sourcing is documented against licensed upstream records.",
  },
  {
    h: "For vendors",
    b: "A public trust standard tied to substantiated sourcing, not presentation alone.",
  },
  {
    h: "For doctors",
    b: "A structured reference point for evaluating whether a vendor is operating with documented sources.",
  },
];

const basics = [
  {
    t: "What \"Verified\" means",
    s: "The audit standard a listing must meet to carry Source Standard verification.",
    to: "/library/what-source-standard-verification-actually-means",
  },
  {
    t: "503A vs. 503B",
    s: "The two regulatory categories of licensed compounding pharmacy.",
    to: "/library/what-is-compounding",
  },
  {
    t: "The patient checklist",
    s: "The sourcing questions every clinic should be able to answer directly.",
    to: "/library/questions-to-ask-your-clinic",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory" },
  { k: "Audit Methodology", to: "/governance" },
  { k: "Status Definitions", to: "/status-definitions" },
];

/* ───────────────── Page ───────────────── */

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard · The United States Public Peptide Registry"
        description="We verify clinical sourcing so you don't have to. Source Standard cross-references clinics and vendors against licensed pharmacy records to separate documented medical sourcing from the grey market."
      />

      {/* §1 — Hero (cover variant: homepage only) */}
      <BriefingHero
        variant="cover"
        category="United States Public Peptide Registry"
        docId=""
        title="The United States Public Peptide Registry"
        statement="We verify clinical sourcing so you don't have to. Source Standard cross-references clinics and vendors against licensed pharmacy records to separate documented medical sourcing from the grey market."
        tone="navy"
        actions={<HeroActions />}
      />

      {/* §2 — The trust problem */}
      <section aria-labelledby="trust-problem" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <h2
              id="trust-problem"
              className="t-section-title-sm text-foreground max-w-[28ch]"
            >
              Branding is not documentation.
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              In the peptide industry, marketing claims are easy to make and difficult to prove.
              Most consumers are left to rely on trust signals, presentation, and website language.
              Source Standard exists to shift that standard back to records. We audit the supply
              chain so the public can better understand whether what is being sold is supported by
              documented sourcing.
            </p>
          </div>
        </div>
      </section>

      {/* §3 — How it works */}
      <section aria-labelledby="how-it-works" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <h2
              id="how-it-works"
              className="t-section-title-sm text-foreground max-w-[34ch]"
            >
              How Source Standard works
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {howItWorks.map((s, i) => (
                <div key={i}>
                  <p className="t-utility-xs text-muted-foreground">
                    {(i + 1).toString().padStart(2, "0")}
                  </p>
                  <div className="mt-3 h-px w-8 bg-border" aria-hidden="true" />
                  <h3 className="mt-5 t-h4 text-foreground max-w-[24ch]">{s.h}</h3>
                  <p className="mt-5 t-body-sm text-muted-foreground max-w-[42ch]">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Live registry */}
      <section aria-labelledby="live-registry" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <h2
              id="live-registry"
              className="t-section-title-sm text-foreground max-w-[34ch]"
            >
              Total market visibility.
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              Our database tracks the peptide economy as a live public-reference system.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/directory" className={darkBtnPrimary}>
                Search Verified Vendors
              </Link>
              <Link to="/greenlist" className={darkBtnSecondary}>
                Explore Greenlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Registry fields */}
      <section aria-labelledby="registry-shows" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <div className="grid grid-cols-12 gap-8 md:gap-12">
              <div className="col-span-12 md:col-span-4">
                <h2
                  id="registry-shows"
                  className="t-section-title-sm text-foreground max-w-[18ch]"
                >
                  Search. Verify. Proceed.
                </h2>
                <p className="mt-5 t-body-sm text-muted-foreground max-w-[40ch]">
                  Every listing in the registry provides a structured snapshot of public sourcing
                  status and operating profile.
                </p>
                <Link
                  to="/directory"
                  className="mt-7 inline-block t-utility-xs text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
                >
                  Open the registry
                </Link>
              </div>

              <div className="col-span-12 md:col-span-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
                  {registryFields.map((f) => (
                    <li key={f.h}>
                      <p className="t-body-sm font-semibold text-foreground">{f.h}</p>
                      <p className="mt-1.5 t-body-sm text-muted-foreground">{f.b}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Function of the framework */}
      <section aria-labelledby="why-matters" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <h2
              id="why-matters"
              className="t-section-title-sm text-foreground max-w-[34ch]"
            >
              Function of the framework
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border">
              {whyMatters.map((w, i) => (
                <div key={i} className="px-0 md:px-8 first:md:pl-0 py-6 md:py-0">
                  <p className="t-utility-xs text-muted-foreground">{w.h}</p>
                  <p className="mt-5 t-body-md text-foreground max-w-[34ch]">{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Foundational reference */}
      <section aria-labelledby="basics" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <h2
              id="basics"
              className="t-section-title-sm text-foreground max-w-[34ch]"
            >
              Foundational reference
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              Core reference materials that define the terms, regulatory distinctions, and
              verification standards used throughout the registry.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {basics.map((b) => (
                <Link
                  key={b.t}
                  to={b.to}
                  className="bg-background p-6 flex flex-col group hover:bg-surface-muted/50 transition-colors"
                >
                  <h3 className="t-h4 text-foreground">{b.t}</h3>
                  <p className="mt-3 t-body-sm text-muted-foreground flex-1">{b.s}</p>
                  <span className="mt-5 t-utility-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Read
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/education"
                className="inline-block t-utility-xs text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
              >
                Browse Resource Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §8 — Governance & standards */}
      <section aria-labelledby="governance" className="border-b border-border bg-background">
        <div className="page-shell section-pad pb-0">
          <div className="mx-auto w-standard">
            <h2
              id="governance"
              className="t-section-title-sm text-foreground max-w-[34ch]"
            >
              Governance and standards
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              The framework operates under published standards, recurring review, and medical
              advisory oversight.
            </p>
            <ul className="mt-12 divide-y divide-border border-y border-border">
              {governanceLinks.map((g) => (
                <li key={g.k}>
                  <Link
                    to={g.to}
                    className="grid grid-cols-12 gap-4 py-5 items-baseline group hover:bg-surface-muted/40 transition-colors"
                  >
                    <span className="col-span-9 sm:col-span-10 t-body-md text-foreground pl-0 sm:pl-4">
                      {g.k}
                    </span>
                    <span className="col-span-3 sm:col-span-2 t-utility-xs text-muted-foreground text-right pr-0 sm:pr-4 group-hover:text-foreground transition-colors">
                      View
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
