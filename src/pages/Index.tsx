import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { Stat, StatRow } from "@/components/system/Stat";
import { vendors } from "@/data/vendors";
import { greenlistEntries, getGreenlistStates } from "@/data/greenlist";

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

/* Dark-on-light primary button used below the hero */
const darkBtnPrimary =
  "border-2 border-foreground text-foreground px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-foreground hover:text-background transition-colors";

const darkBtnSecondary =
  "border border-foreground/40 text-foreground px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:border-foreground hover:bg-foreground/5 transition-colors";

/* ───────────────── Static section data ───────────────── */

const howItWorks = [
  {
    h: "Upstream sources are reviewed.",
    b: "Public records, registration data, and facility information are gathered into the upstream reference layer.",
  },
  {
    h: "Vendors are assessed against those sources.",
    b: "Public claims, sourcing relationships, and documentation are reconciled against the reviewed record.",
  },
  {
    h: "Status is published in the public registry.",
    b: "The registry records whether verification is on file, under review, or not currently published.",
  },
];

const registryFields = [
  { h: "Verification status", b: "The current public standing of each listing." },
  { h: "City and state", b: "The operating jurisdiction of the clinic." },
  { h: "Fulfillment model", b: "Whether the vendor operates in-person, online, or hybrid." },
  { h: "Clinical focus", b: "The therapeutic categories the clinic serves." },
  { h: "Upstream source relationships", b: "The licensed pharmacies the listing substantiates." },
  { h: "Last review date", b: "When the listing was most recently reconciled." },
];

const whyMatters = [
  { h: "For consumers", b: "A documented reference point beyond marketing claims." },
  { h: "For responsible vendors", b: "A public trust signal tied to reviewed records." },
  { h: "For the market", b: "A clearer line between documented and undocumented sourcing." },
];

const basics = [
  {
    t: "What verification actually means",
    s: "How a Source Standard listing is issued and what it does, and does not, claim.",
    to: "/library/what-source-standard-verification-actually-means",
  },
  {
    t: "What is compounding",
    s: "The two regulatory categories of compounding pharmacy and what distinguishes them.",
    to: "/library/what-is-compounding",
  },
  {
    t: "Questions to ask your clinic",
    s: "The sourcing questions a documented clinic should be able to answer directly.",
    to: "/library/questions-to-ask-your-clinic",
  },
];

const governanceLinks = [
  { k: "Advisory Board", to: "/medical-advisory" },
  { k: "Audit Methodology", to: "/governance" },
  { k: "Status Definitions", to: "/status-definitions" },
];

/* ───────────────── Reusable atoms ───────────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="t-eyebrow-sm text-muted-foreground">{children}</p>
);

/* ───────────────── Live registry counts ───────────────── */

const computeRegistryStats = () => {
  const total = vendors.length;
  const verified = vendors.filter((v) => v.status === "verified").length;
  const underReview = vendors.filter((v) => v.status === "under-review").length;
  const facilities = greenlistEntries.length;
  const states = getGreenlistStates().length;

  // Most recent review date across vendors (ISO yyyy-mm-dd). Falls back to today.
  const dates = vendors
    .map((v) => v.reviewDate)
    .filter((d): d is string => Boolean(d))
    .sort();
  const mostRecent = dates.length ? dates[dates.length - 1] : null;
  const lastUpdated = mostRecent
    ? new Date(mostRecent).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return { total, verified, underReview, facilities, states, lastUpdated };
};

/* ───────────────── Page ───────────────── */

const Index = () => {
  const stats = computeRegistryStats();

  return (
    <>
      <PageMeta
        title="Source Standard · The public standard for documented peptide sourcing"
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

      {/* §1 — The trust problem */}
      <section aria-labelledby="trust-problem" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>The trust problem</Eyebrow>
            <h2
              id="trust-problem"
              className="mt-4 t-section-title-sm text-foreground max-w-[28ch]"
            >
              Marketing claims are easy. Documentation is harder to verify.
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              Consumers and clinicians are often asked to rely on branding, website language, and
              trust signals without clear public visibility into sourcing and documentation. Source
              Standard exists to make those records easier to interpret.
            </p>
          </div>
        </div>
      </section>

      {/* §2 — How Source Standard works */}
      <section aria-labelledby="how-it-works" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-it-works" className="sr-only">How Source Standard works</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {howItWorks.map((s, i) => (
                <div key={i}>
                  <p className="t-utility-xs text-muted-foreground">
                    {(i + 1).toString().padStart(2, "0")}
                  </p>
                  <div className="mt-3 h-px w-8 bg-border" aria-hidden="true" />
                  <h3 className="mt-5 t-h4 text-foreground max-w-[24ch]">{s.h}</h3>
                  <p className="mt-5 t-body-sm text-muted-foreground max-w-[38ch]">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §3 — Live registry proof */}
      <section aria-labelledby="live-registry" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>Live registry</Eyebrow>
            <h2
              id="live-registry"
              className="mt-4 t-section-title-sm text-foreground max-w-[34ch]"
            >
              An active public reference, updated on a published cadence.
            </h2>

            <div className="mt-10">
              <StatRow>
                <Stat label="Vendors tracked" value={stats.total} />
                <Stat label="Verified" value={stats.verified} />
                <Stat label="Under review" value={stats.underReview} />
                <Stat label="Facilities recognized" value={stats.facilities} />
                <Stat label="States represented" value={stats.states} />
                <Stat label="Last updated" value={stats.lastUpdated} />
              </StatRow>
            </div>

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

      {/* §4 — What you can verify */}
      <section aria-labelledby="registry-shows" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <div className="grid grid-cols-12 gap-8 md:gap-12">
              <div className="col-span-12 md:col-span-4">
                <Eyebrow>What you can verify</Eyebrow>
                <h2
                  id="registry-shows"
                  className="mt-4 t-section-title-sm text-foreground max-w-[18ch]"
                >
                  A working public utility, not a concept.
                </h2>
                <p className="mt-5 t-body-sm text-muted-foreground max-w-[40ch]">
                  Each registry entry is a structured record. The fields are consistent across
                  listings and reviewed on a published cadence.
                </p>
                <Link
                  to="/directory"
                  className="mt-7 inline-block t-utility-xs text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
                >
                  Open the registry →
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

      {/* §5 — Why this matters */}
      <section aria-labelledby="why-matters" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>Why this matters</Eyebrow>
            <h2 id="why-matters" className="sr-only">Why this matters</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border">
              {whyMatters.map((w, i) => (
                <div key={i} className="px-0 md:px-8 first:md:pl-0 py-6 md:py-0">
                  <p className="t-utility-xs text-muted-foreground">{w.h}</p>
                  <p className="mt-5 t-body-md text-foreground max-w-[32ch]">{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Start here */}
      <section aria-labelledby="basics" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>Start here</Eyebrow>
            <h2 id="basics" className="sr-only">Start here</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {basics.map((b) => (
                <Link
                  key={b.t}
                  to={b.to}
                  className="bg-background p-6 flex flex-col group hover:bg-surface-muted/50 transition-colors"
                >
                  <h3 className="t-h4 text-foreground">{b.t}</h3>
                  <p className="mt-3 t-body-sm text-muted-foreground flex-1">{b.s}</p>
                  <span className="mt-5 t-utility-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/education"
                className="inline-block t-utility-xs text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5"
              >
                Browse Resource Library →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §7 — Governance & standards */}
      <section aria-labelledby="governance" className="border-b border-border bg-background">
        <div className="page-shell section-pad pb-0">
          <div className="mx-auto w-standard">
            <Eyebrow>Governance &amp; standards</Eyebrow>
            <h2 id="governance" className="sr-only">Governance and standards</h2>
            <p className="mt-4 t-body-md text-foreground max-w-[60ch]">
              The framework operates under published standards, recurring review, and medical
              advisory oversight.
            </p>
            <ul className="mt-10 divide-y divide-border border-y border-border">
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
                      View →
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
