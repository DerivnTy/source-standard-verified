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
      Search the Registry
    </Link>
    <Link to="/apply" className={ghostBtnSecondary}>
      For Vendors: Get Verified
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
    h: "Map the facilities.",
    b: "We track every licensed 503A and 503B compounding pharmacy in the United States.",
  },
  {
    h: "Audit the vendors.",
    b: "We require clinics and online vendors to substantiate their sourcing with documented proof of these pharmacy relationships.",
  },
  {
    h: "Publish the truth.",
    b: "We list the results in a public database. If they can't prove it, they stay Unverified.",
  },
];

const registryFields = [
  { h: "Verification status", b: "A simple red/green indicator of documented sourcing." },
  { h: "Fulfillment model", b: "Whether the vendor is a local clinic or an online-only platform." },
  { h: "Clinical focus", b: "The medical services the vendor is authorized to provide." },
  { h: "Upstream sources", b: "The licensed pharmacies supplying the vendor." },
];

const whyMatters = [
  { h: "For consumers", b: "Instant clarity on whether your clinic is using legal, licensed sources." },
  { h: "For vendors", b: "A professional seal of approval that separates you from the research-only grey market." },
  { h: "For doctors", b: "A clinical reference for referring patients to documented facilities." },
];

const basics = [
  {
    t: "What \"Verified\" means",
    s: "The audit standard a listing must meet to carry the Source Standard mark.",
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

      {/* §1 — The trust problem */}
      <section aria-labelledby="trust-problem" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>The trust problem</Eyebrow>
            <h2
              id="trust-problem"
              className="mt-4 t-section-title-sm text-foreground max-w-[28ch]"
            >
              Branding is not documentation.
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              In the peptide industry, marketing claims are easy to make but difficult to prove.
              Most consumers are forced to rely on trust. We believe you should rely on records.
              We audit the supply chain to ensure what you're being sold is what's on the label.
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
              Total market visibility.
            </h2>
            <p className="mt-6 t-body-md text-muted-foreground max-w-[70ch]">
              Our database tracks the entire peptide economy in real time.
            </p>

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

      {/* §5 — Function of the framework */}
      <section aria-labelledby="why-matters" className="border-b border-border bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>Function</Eyebrow>
            <h2 id="why-matters" className="sr-only">Function of the framework</h2>
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

      {/* §6 — Foundational reference */}
      <section aria-labelledby="basics" className="border-b border-border bg-surface-muted/30">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Eyebrow>Foundational reference</Eyebrow>
            <h2 id="basics" className="sr-only">Foundational reference</h2>
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
