import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { MetadataBar } from "@/components/MetadataBar";

const lookups = [
  {
    n: "A",
    label: "Look up a vendor",
    title: "Verified Vendors registry",
    body: "Confirm whether a vendor has been verified under SS-FRAMEWORK-2026.01. Each listing carries a citable review identifier, the documentation categories reviewed, and the date of assessment.",
    to: "/verified-vendors",
    cta: "Open the registry",
  },
  {
    n: "B",
    label: "Look up a source",
    title: "Greenlist of recognized sources",
    body: "Reference the upstream sources Source Standard recognizes — 503B outsourcing facilities, 503A pharmacies, and credentialed standards. Inclusion is based on public licensing and registration.",
    to: "/greenlist",
    cta: "Open the greenlist",
  },
];

const anchors = [
  { k: "FDA", d: "Drug Establishment Registration · 503B outsourcing facility records" },
  { k: "PCAB", d: "Pharmacy Compounding Accreditation Board credentials" },
  { k: "NSF", d: "Public health and supply chain standards" },
  { k: "USP", d: "Compendial monographs and quality standards" },
];

const eduPreview = [
  { ref: "REF-101", c: "503B facilities", t: "What 503B registration actually verifies — and what it does not." },
  { ref: "REF-201", c: "Certificates of analysis", t: "A structured guide to reading a peptide CoA without a chemistry background." },
  { ref: "REF-601", c: "Due diligence", t: "Five questions every consumer should ask a vendor before purchase." },
  { ref: "REF-801", c: "Risk", t: "Unverified sources: documented risks and consumer-side warning signs." },
];

const procedural = [
  { t: "How verification works", d: "Procedural reference for the framework, evidence categories, and review timeline.", to: "/how-it-works" },
  { t: "Status definitions", d: "Public meaning of Verified, Pending, Suspended, Removed, Greenlisted, Under Review.", to: "/status-definitions" },
  { t: "Accountability & enforcement", d: "Vendor obligations, supplier change reporting, suspension and removal.", to: "/accountability" },
  { t: "Governance & oversight", d: "Charter, conflict-of-interest policy, and standard maintenance.", to: "/governance" },
];

const Index = () => {
  return (
    <>
      <MetadataBar
        items={[
          { label: "Doc", value: <span className="font-mono text-[12px]">SS-FRAMEWORK-2026.01</span> },
          { label: "Status", value: "Active" },
          { label: "Version", value: "2026.01" },
          { label: "Updated", value: "April 20, 2026" },
          { label: "Jurisdiction", value: "FL · US" },
          { label: "Reviewed under", value: "Medical Advisory Board" },
        ]}
      />

      {/* §1 Public statement */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-8">
              <p className="eyebrow mb-5">Public reference · Verification authority</p>
              <h1 className="text-[2rem] md:text-[2.5rem] font-semibold tracking-[-0.015em] leading-[1.1] text-foreground">
                The public reference for verifying vendors in peptide, TRT, and hormone optimization.
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] text-muted-foreground leading-[1.6]">
                Source Standard maintains the public registry of verified vendors and the greenlist of recognized upstream sources. Standards are set under medical advisory review and anchored to public FDA, PCAB, NSF, and USP records.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="border border-border/70 rounded-[2px] bg-surface-muted/50 h-full">
                <div className="px-5 py-3 border-b border-border/70 bg-background">
                  <p className="text-[13px] font-semibold text-foreground">Standard at a glance</p>
                </div>
                <dl className="divide-y divide-border/70">
                  {[
                    { l: "Document", v: "SS-FRAMEWORK-2026.01" },
                    { l: "Status", v: "Active" },
                    { l: "Jurisdiction", v: "FL · US" },
                    { l: "Oversight", v: "Medical Advisory Board" },
                    { l: "First registry entries", v: "Q1 2026" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-5 py-3">
                      <dt className="text-[13px] text-muted-foreground">{r.l}</dt>
                      <dd className="text-[13px] font-medium text-foreground tabular-nums text-right ml-3">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Public lookups — primary entry points */}
      <section className="border-b border-border bg-surface-muted/40">
        <div className="container-wide py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">§2 — Public lookups</p>
            <p className="text-[12.5px] text-muted-foreground">Primary entry points</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lookups.map((l) => (
              <div key={l.n} className="border border-border/70 rounded-[2px] bg-background p-7 flex flex-col">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-primary">Layer {l.n}</span>
                  <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">{l.label}</p>
                </div>
                <h3 className="text-[20px] font-semibold text-foreground mb-3">{l.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 flex-1">{l.body}</p>
                <Button asChild size="lg" className="h-11 self-start">
                  <Link to={l.to}>{l.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 Medical authority — foundational layer */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§3 — Medical authority</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Standards are set and reviewed under the Medical Advisory Board.
              </h2>
              <p className="mt-5 text-[15.5px] text-muted-foreground leading-relaxed max-w-md">
                Clinical scope, evidence standards, and renewal intervals for the framework are maintained under physician review. Medical oversight is structural — it sits beneath every verification and every greenlist entry.
              </p>
              <Link
                to="/medical-advisory"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
              >
                Medical Advisory Board <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-surface-muted/50">
                <div className="px-5 py-3 border-b border-border/70 bg-background flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-foreground">Medical Advisory Board · SS-MAB-2026.01</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground">Active</p>
                </div>
                <dl className="divide-y divide-border/70">
                  {[
                    { l: "Function", v: "Clinical review of framework criteria" },
                    { l: "Scope", v: "Peptide therapy · TRT · Hormone optimization" },
                    { l: "Roster", v: "Published openly · physician-credentialed" },
                    { l: "Conflict policy", v: "Disclosed · governance-published" },
                    { l: "Review cycle", v: "Annual standard review · interim flags" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-5 py-3.5">
                      <dt className="text-[13.5px] text-muted-foreground">{r.l}</dt>
                      <dd className="text-[13px] font-medium text-foreground text-right ml-3">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §4 The two registries — structural explanation */}
      <section className="border-b border-border bg-surface-muted/40">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§4 — The two registries</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Sources first. Vendors verified against them.
              </h2>
              <p className="mt-5 text-[15.5px] text-muted-foreground leading-relaxed max-w-md">
                The greenlist documents the upstream sources recognized under the framework. Verified vendors are then assessed against the greenlist. Both registries are public.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-background">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-surface-muted/60">
                  <p className="text-[13px] font-semibold text-foreground">Greenlist categories</p>
                  <p className="text-[12.5px] text-muted-foreground">Active · v.2026.01</p>
                </div>
                <ul className="divide-y divide-border/70">
                  {greenlist.map((g, i) => (
                    <li key={g.category} className="grid grid-cols-12 px-5 py-4 items-center gap-3">
                      <div className="col-span-1 font-mono text-[11px] text-muted-foreground">§{i + 1}</div>
                      <div className="col-span-5">
                        <p className="text-[14.5px] font-semibold text-foreground">{g.category}</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-[13.5px] text-muted-foreground leading-snug">{g.title}</p>
                      </div>
                      <div className="col-span-2 text-right text-[12.5px] text-primary font-medium">● Active</div>
                    </li>
                  ))}
                </ul>
                <div className="px-5 py-3 border-t border-border/70 flex items-center justify-between">
                  <Link to="/greenlist" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary">View greenlist →</Link>
                  <Link to="/verified-vendors" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover">View vendor registry →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Standards anchoring */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">§5 — Standards anchoring</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Anchored to public regulatory and compendial records.
              </h2>
              <Link to="/governance" className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover">
                Governance & oversight <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border/70 rounded-[2px] bg-background divide-y divide-border/70">
                {anchors.map((a) => (
                  <div key={a.k} className="grid grid-cols-12 px-5 py-4 items-baseline gap-4">
                    <div className="col-span-2 font-mono text-[12px] font-semibold text-foreground tracking-[0.04em]">{a.k}</div>
                    <div className="col-span-10 text-[14px] text-muted-foreground leading-relaxed">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Education preview */}
      <section className="border-b border-border bg-surface-muted/40">
        <div className="container-wide py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-4">§6 — Education</p>
              <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.2]">
                Neutral, physician-reviewed reference material.
              </h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground leading-relaxed">
                Reference notes on peptide therapy, TRT, sourcing, storage, and the documented risks of unverified supply. Material is informational and is not medical advice.
              </p>
              <Link to="/education" className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover">
                Open the library <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/70 rounded-[2px] bg-background">
                <ul className="divide-y divide-border/70">
                  {eduPreview.map((e) => (
                    <li key={e.ref} className="grid grid-cols-12 px-5 py-4 items-baseline gap-3">
                      <div className="col-span-3 font-mono text-[11px] text-muted-foreground">{e.ref}</div>
                      <div className="col-span-3 text-[13px] text-muted-foreground">{e.c}</div>
                      <div className="col-span-6">
                        <p className="text-[14.5px] font-medium text-foreground leading-snug">{e.t}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Process & accountability — depth layer */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">§7 — Process & accountability</p>
            <p className="text-[12.5px] text-muted-foreground">Procedural depth</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {procedural.map((p, i) => (
              <Link key={p.t} to={p.to} className="bg-background p-6 hover:bg-surface-muted/40 transition-colors group">
                <p className="font-mono text-[11px] text-muted-foreground mb-3">§7.{i + 1}</p>
                <p className="text-[15px] font-semibold text-foreground mb-2 group-hover:text-primary">{p.t}</p>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{p.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §8 Vendor participation — last */}
      <section className="border-b border-border bg-surface-muted/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="eyebrow mb-3">§8 — Vendor participation</p>
              <h2 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.01em] leading-[1.25] text-foreground">
                For vendors seeking listing under the standard.
              </h2>
              <p className="mt-3 text-[15.5px] text-muted-foreground leading-relaxed max-w-2xl">
                Submission requirements, evidence categories, and review timeline are published openly. Listings are issued only after documentation has been reviewed and a public review identifier assigned.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right flex md:justify-end gap-3">
              <Button asChild size="lg" variant="outline" className="h-11">
                <Link to="/for-vendors">Vendor reference</Link>
              </Button>
              <Button asChild size="lg" className="h-11">
                <Link to="/apply">Apply</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
