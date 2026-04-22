import { Link } from "react-router-dom";
import { greenlist } from "@/data/greenlist";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";

/* ───────────────── Block I — REGISTRIES (vendor + upstream) ───────────────── */

const registries = [
  {
    code: "I.A",
    label: "Vendor Registry",
    title: "Compliance Assessment record.",
    body: "Each listing carries a Unique Audit Identifier, the categories assessed, and the date of the most recent compliance review.",
    to: "/verified-vendors",
    cta: "Open vendor registry",
  },
  {
    code: "I.B",
    label: "Upstream Registry",
    title: "Recognized 503A / 503B sources.",
    body: "Inclusion is based on FDA Drug Establishment Registration, state pharmacy licensure, and accreditation records held by the upstream facility.",
    to: "/greenlist",
    cta: "Open upstream registry",
  },
];

/* ───────────────── Block II — AUTHORITY & ANCHORS (governance + standards) ───── */

const mabRows = [
  { l: "Function", v: "Clinical review of framework criteria" },
  { l: "Scope", v: "Peptide therapy · TRT · hormone optimization" },
  { l: "Roster", v: "Published openly · physician-credentialed" },
  { l: "Conflict policy", v: "Disclosed · governance-published" },
  { l: "Review cycle", v: "Annual standard review · interim flags" },
];

const anchors = [
  { k: "FDA", d: "Drug Establishment Registration · 503B outsourcing facility records." },
  { k: "PCAB", d: "Pharmacy Compounding Accreditation Board credentials." },
  { k: "NSF", d: "Public health and supply-chain standards." },
  { k: "USP", d: "Compendial monographs and quality standards." },
];

/* ───────────────── Block III — REFERENCE & PROCEDURE (library + procedural) ── */

const eduPreview = [
  { ref: "REF-101", c: "503B facilities", t: "Authenticating an FDA 503B outsourcing facility registration." },
  { ref: "REF-201", c: "Certificates of analysis", t: "Reading a Certificate of Analysis: structural fields and document discrepancies." },
  { ref: "REF-601", c: "Due diligence", t: "Source authentication: the questions an auditor asks before a listing is issued." },
  { ref: "REF-801", c: "Document discrepancies", t: "Document discrepancies and unverifiable supply: indicators flagged during assessment." },
];

const procedural = [
  { t: "Verification protocol", d: "Procedural reference for the framework, evidence categories, and review timeline.", to: "/how-it-works" },
  { t: "Status definitions", d: "Public meaning of Verified, Pending, Suspended, Removed, Greenlisted, Under Review.", to: "/status-definitions" },
  { t: "Enforcement & oversight", d: "Vendor obligations, randomized batch testing, supply-chain disclosures, and procedures for suspension or removal.", to: "/accountability" },
  { t: "Governance", d: "Charter, conflict-of-interest policy, and standard maintenance.", to: "/governance" },
];

const Index = () => {
  return (
    <>
      <PageMeta
        title="Source Standard"
        description="The public Clinical Transparency Framework auditing vendors against FDA-registered upstream sources."
      />

      {/* 100vh System Portal */}
      <BriefingHero
        category="SOURCE STANDARD · SS-FRAMEWORK-2026.01"
        docId="SS-FRAMEWORK-2026.01"
        title="System Access."
        statement="The public reference for the Source Standard verification framework — auditing clinical vendors against FDA-registered 503A and 503B upstream sources."
      />

      {/* ============================================================ */}
      {/* BLOCK I — REGISTRIES                                          */}
      {/* ============================================================ */}
      <section
        aria-labelledby="block-registries"
        className="border-b border-border bg-background"
      >
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            {/* Block label rail */}
            <div className="col-span-12 md:col-span-3">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Block I
              </p>
              <h2
                id="block-registries"
                className="mt-2 text-[14.5px] font-semibold uppercase tracking-[0.04em] text-foreground"
              >
                Registries.
              </h2>
              <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65]">
                The two record sets maintained under the framework. The vendor registry cannot be assessed until its declared upstream sources clear the upstream registry.
              </p>
            </div>

            {/* Two-up registry cards */}
            <div className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-12 gap-px bg-border border border-border">
                {registries.map((r) => (
                  <Link
                    key={r.code}
                    to={r.to}
                    className="col-span-12 md:col-span-6 bg-background p-6 md:p-8 flex flex-col group hover:bg-surface-muted/40 transition-colors"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                        §{r.code} · {r.label}
                      </span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                        Active
                      </span>
                    </div>
                    <h3 className="text-[14.5px] font-semibold uppercase tracking-[0.02em] text-foreground">
                      {r.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65] flex-1">
                      {r.body}
                    </p>
                    <span className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground group-hover:text-primary">
                      {r.cta} →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Upstream categories strip */}
              <div className="mt-px grid grid-cols-12 gap-px bg-border border-x border-b border-border">
                {greenlist.slice(0, 6).map((g, i) => (
                  <Link
                    key={g.category}
                    to="/greenlist"
                    className="col-span-6 md:col-span-2 bg-background p-4 hover:bg-surface-muted/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {(i + 1).toString().padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-[14.5px] text-foreground leading-snug">
                      {g.category}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK II — AUTHORITY & ANCHORS                                */}
      {/* ============================================================ */}
      <section
        aria-labelledby="block-authority"
        className="border-b border-border bg-surface-muted/30"
      >
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <div className="col-span-12 md:col-span-3">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Block II
              </p>
              <h2
                id="block-authority"
                className="mt-2 text-[14.5px] font-semibold uppercase tracking-[0.04em] text-foreground"
              >
                Authority &amp; anchors.
              </h2>
              <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65]">
                Standards are set and reviewed under the Medical Advisory Board and anchored to public regulatory and compendial records.
              </p>
              <Link
                to="/medical-advisory"
                className="mt-5 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground hover:text-primary"
              >
                Advisory Board →
              </Link>
            </div>

            <div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-px bg-border border border-border">
              {/* MAB record */}
              <div className="col-span-12 lg:col-span-7 bg-background">
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-border">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    Reference · SS-MAB-2026.01
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    Active
                  </span>
                </div>
                <dl className="divide-y divide-border">
                  {mabRows.map((r) => (
                    <div
                      key={r.l}
                      className="grid grid-cols-12 gap-3 px-5 py-3 items-baseline"
                    >
                      <dt className="col-span-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                        {r.l}
                      </dt>
                      <dd className="col-span-7 text-[14.5px] text-foreground">
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Anchors */}
              <div className="col-span-12 lg:col-span-5 bg-background">
                <div className="px-5 py-2.5 border-b border-border">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    Standards anchored
                  </span>
                </div>
                <ul className="divide-y divide-border">
                  {anchors.map((a) => (
                    <li
                      key={a.k}
                      className="grid grid-cols-12 gap-3 px-5 py-3 items-baseline"
                    >
                      <span className="col-span-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                        {a.k}
                      </span>
                      <span className="col-span-9 text-[14.5px] text-muted-foreground leading-[1.6]">
                        {a.d}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="px-5 py-3 border-t border-border">
                  <Link
                    to="/governance"
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground hover:text-primary"
                  >
                    Governance &amp; oversight →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK III — REFERENCE & PROCEDURE                             */}
      {/* ============================================================ */}
      <section
        aria-labelledby="block-reference"
        className="border-b border-border bg-background"
      >
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <div className="col-span-12 md:col-span-3">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Block III
              </p>
              <h2
                id="block-reference"
                className="mt-2 text-[14.5px] font-semibold uppercase tracking-[0.04em] text-foreground"
              >
                Reference &amp; procedure.
              </h2>
              <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65]">
                Technical documentation and the procedural depth of the framework — evidence categories, status definitions, and the conditions under which a listing is suspended or removed.
              </p>
              <Link
                to="/education"
                className="mt-5 inline-block font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground hover:text-primary"
              >
                Resource Library →
              </Link>
            </div>

            <div className="col-span-12 md:col-span-9">
              {/* Reference Library — 4-up */}
              <div className="grid grid-cols-12 gap-px bg-border border border-border">
                {eduPreview.map((e, i) => (
                  <Link
                    key={e.ref}
                    to="/education"
                    className="col-span-12 sm:col-span-6 lg:col-span-3 bg-background p-5 flex flex-col group hover:bg-surface-muted/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      §III.A.{(i + 1).toString().padStart(2, "0")} · {e.c}
                    </p>
                    <p className="mt-3 text-[14.5px] text-foreground leading-[1.55] flex-1 group-hover:text-primary transition-colors">
                      {e.t}
                    </p>
                    <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {e.ref}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Procedural — 4-up */}
              <div className="mt-px grid grid-cols-12 gap-px bg-border border-x border-b border-border">
                {procedural.map((p, i) => (
                  <Link
                    key={p.t}
                    to={p.to}
                    className="col-span-12 sm:col-span-6 lg:col-span-3 bg-background p-5 flex flex-col group hover:bg-surface-muted/40 transition-colors"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      §III.B.{(i + 1).toString().padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-[14.5px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {p.t}
                    </p>
                    <p className="mt-2 text-[14.5px] text-muted-foreground leading-[1.6] flex-1">
                      {p.d}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Vendor participation — single dense row */}
              <div className="mt-px grid grid-cols-12 gap-px bg-border border-x border-b border-border">
                <div className="col-span-12 md:col-span-9 bg-background p-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    §III.C · Vendor participation
                  </p>
                  <p className="mt-3 text-[14.5px] text-foreground leading-[1.65]">
                    Submission requirements, evidence categories, and review timelines are published openly. A listing is issued only after compliance assessment is complete and a Unique Audit Identifier has been assigned.
                  </p>
                </div>
                <Link
                  to="/for-vendors"
                  className="col-span-6 md:col-span-1 bg-background p-6 flex items-center justify-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground hover:bg-surface-muted/40 hover:text-primary transition-colors"
                >
                  Reference →
                </Link>
                <Link
                  to="/apply"
                  className="col-span-6 md:col-span-2 bg-foreground text-background p-6 flex items-center justify-center font-mono text-[10.5px] uppercase tracking-[0.18em] hover:bg-foreground/90 transition-colors"
                >
                  Apply →
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
