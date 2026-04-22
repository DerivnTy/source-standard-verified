import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greenlist } from "@/data/greenlist";
import { AnchorHeader } from "@/components/AnchorHeader";
import { HeroPattern } from "@/components/HeroPattern";

const lookups = [
  {
    n: "A",
    label: "Vendor audit lookup",
    title: "Compliance Assessment registry",
    body: "Each listing carries a Unique Audit Identifier, the categories assessed, and the date of the most recent compliance review.",
    to: "/verified-vendors",
    cta: "Open the registry",
  },
  {
    n: "B",
    label: "Upstream source lookup",
    title: "Registry of recognized upstream sources",
    body: "Inclusion is based on FDA registration, state licensure, and recognized accreditation records held by the upstream facility.",
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
  { ref: "REF-101", c: "503B facilities", t: "Authenticating an FDA 503B outsourcing facility registration." },
  { ref: "REF-201", c: "Certificates of analysis", t: "Reading a Certificate of Analysis: structural fields and common document discrepancies." },
  { ref: "REF-601", c: "Due diligence", t: "Source authentication: the questions an auditor asks before a listing is issued." },
  { ref: "REF-801", c: "Document discrepancies", t: "Document discrepancies and unverifiable supply: indicators flagged during assessment." },
];

const procedural = [
  { t: "How verification works", d: "Procedural reference for the framework, evidence categories, and review timeline.", to: "/how-it-works" },
  { t: "Status definitions", d: "Public meaning of Verified, Pending, Suspended, Removed, Greenlisted, Under Review.", to: "/status-definitions" },
  { t: "Enforcement & Oversight", d: "Vendor obligations, randomized batch testing, supply-chain disclosures, and the procedures for suspension or removal.", to: "/accountability" },
  { t: "Governance & oversight", d: "Charter, conflict-of-interest policy, and standard maintenance.", to: "/governance" },
];

const metadata = [
  { k: "Standard", v: "SS-FRAMEWORK-2026.01" },
  { k: "Status", v: "Active / Operational" },
  { k: "Jurisdiction", v: "United States" },
  { k: "Review cycle", v: "Annual · MAB-reviewed" },
];

const Index = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/verified-vendors?q=${encodeURIComponent(q)}` : "/verified-vendors");
  };

  return (
    <>
      {/* Master Control Strip — homepage owns this band */}
      <div className="border-b border-border bg-background">
        <div className="container-wide flex h-9 items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/85">
            United States · Public Registry · SS-FRAMEWORK-2026.01
          </span>
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/85">
            SS-FRAMEWORK-2026.01 · Active / Operational · Updated 04/21/26
          </span>
        </div>
      </div>

      {/* Institutional hero — centered */}
      <section className="relative border-b border-border overflow-hidden">
        <HeroPattern />
        <div className="relative container-wide pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Public registry · v2026.01</p>
            <h1 className="display-1 mt-2 tracking-[-0.025em]">
              Source Standard: The Public Registry for Compounded Supply-Chain Integrity.
            </h1>
            <p className="mt-5 mx-auto max-w-[62ch] text-[16px] text-muted-foreground leading-[1.65]">
              An independent auditing framework for the verification of 503A/503B pharmacy sourcing and clinical administrative protocols.
            </p>

            {/* Registry Lookup terminal */}
            <div className="mt-8 mx-auto w-full max-w-[640px]">
              <form
                onSubmit={handleLookup}
                className="flex items-stretch h-12 w-full bg-surface border border-border rounded-xl overflow-hidden focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by clinic name, state, or pharmacy…"
                  className="flex-1 px-4 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/70 outline-none text-left"
                  aria-label="Registry lookup"
                />
                <button
                  type="submit"
                  className="m-1 text-[12px] font-semibold uppercase tracking-[0.08em] px-5 h-10 bg-foreground text-background rounded-lg hover:bg-foreground/85 transition-colors"
                >
                  Lookup
                </button>
              </form>
              <p className="text-[12.5px] text-muted-foreground/80 mt-2">
                Cross-references vendor records against FDA-registered 503A/503B sources.
              </p>
            </div>

            {/* CTA row — centered */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/verified-vendors">View Verified Registry</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/apply">Vendor Intake</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Public lookups — primary entry points */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-16 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">§2 — Public lookups</p>
            <p className="text-[12px] text-muted-foreground">Primary entry points</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lookups.map((l) => (
              <div key={l.n} className="border border-border/60 rounded-lg bg-background p-6 flex flex-col">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground mb-3">{l.label}</p>
                <h3 className="h-sub mb-2">{l.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6 flex-1">{l.body}</p>
                <Button asChild size="lg" className="h-11 self-start">
                  <Link to={l.to}>{l.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 Medical authority — foundational layer */}
      <section className="border-b border-border/50">
        <div className="container-wide py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-3">§3 — Medical authority</p>
              <h2 className="h-section">
                Standards are set and reviewed under the Medical Advisory Board.
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                Clinical scope, evidence standards, and renewal intervals for the framework are maintained under physician review. Medical oversight is structural and extends across every verification and every Greenlist entry.
              </p>
              <Link
                to="/medical-advisory"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
              >
                Medical Advisory Board <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/60 rounded-lg bg-surface-muted/40 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/60 bg-background flex items-center justify-between">
                  <p className="h-card">Medical Advisory Board · SS-MAB-2026.01</p>
                  <span className="inline-flex items-center border border-verified/40 text-verified rounded-[2px] px-2 py-[3px] font-mono uppercase tracking-[0.14em] text-[10px]">
                    Active
                  </span>
                </div>
                <dl className="divide-y divide-border/60">
                  {[
                    { l: "Function", v: "Clinical review of framework criteria" },
                    { l: "Scope", v: "Peptide therapy · TRT · Hormone optimization" },
                    { l: "Roster", v: "Published openly · physician-credentialed" },
                    { l: "Conflict policy", v: "Disclosed · governance-published" },
                    { l: "Review cycle", v: "Annual standard review · interim flags" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between px-5 py-3">
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
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-3">§4 — The two registries</p>
              <h2 className="h-section">
                Source-First Verification. A mandatory prerequisite for every listing.
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                The upstream source registry documents the compounding facilities recognized under the framework. A vendor cannot be assessed until its declared sources clear that registry. Both registries are anchored to public regulatory benchmarks.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/60 rounded-lg bg-background overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-surface-muted/60">
                  <p className="h-card">Greenlist categories</p>
                  <p className="text-[12px] text-muted-foreground">Active · v.2026.01</p>
                </div>
                <ul className="divide-y divide-border/60">
                  {greenlist.map((g, i) => (
                    <li key={g.category} className="grid grid-cols-12 px-5 py-3 items-center gap-3">
                      <div className="col-span-1 font-mono text-[11px] text-muted-foreground">§{i + 1}</div>
                      <div className="col-span-5">
                        <p className="text-[14px] font-semibold text-foreground">{g.category}</p>
                      </div>
                      <div className="col-span-4">
                        <p className="text-[13px] text-muted-foreground leading-snug">{g.title}</p>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="inline-flex items-center border border-verified/40 text-verified rounded-[2px] px-2 py-[3px] font-mono uppercase tracking-[0.14em] text-[10px]">
                          Active
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-5 py-3 border-t border-border/60 flex items-center justify-between">
                  <Link to="/greenlist" className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary">View greenlist →</Link>
                  <Link to="/verified-vendors" className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover">View vendor registry →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Standards anchoring */}
      <section className="border-b border-border/50">
        <div className="container-wide py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§5 — Standards anchoring</p>
              <h2 className="h-section">
                Anchored to public regulatory and compendial records.
              </h2>
              <Link to="/governance" className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover">
                Governance & oversight <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border/60 rounded-lg bg-background divide-y divide-border/60 overflow-hidden">
                {anchors.map((a) => (
                  <div key={a.k} className="grid grid-cols-12 px-5 py-3 items-baseline gap-4">
                    <div className="col-span-2 font-mono text-[12px] font-semibold text-foreground tracking-[0.04em]">{a.k}</div>
                    <div className="col-span-10 text-[13.5px] text-muted-foreground leading-relaxed">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Education preview */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-3">§6 — Reference library</p>
              <h2 className="h-section">
                Administrative Reference & Compliance Library.
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                Procedural notes on source authentication, document discrepancies, regulatory benchmarks, and the audit categories used in compliance assessment. Informational only; not medical advice.
              </p>
              <Link to="/education" className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover">
                Open the reference library <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="border border-border/60 rounded-lg bg-background overflow-hidden">
                <ul className="divide-y divide-border/60">
                  {eduPreview.map((e) => (
                    <li key={e.ref} className="grid grid-cols-12 px-5 py-3 items-baseline gap-3">
                      <div className="col-span-3 font-mono text-[11px] text-muted-foreground">{e.ref}</div>
                      <div className="col-span-3 text-[12.5px] text-muted-foreground">{e.c}</div>
                      <div className="col-span-6">
                        <p className="text-[14px] font-medium text-foreground leading-snug">{e.t}</p>
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
      <section className="border-b border-border/50">
        <div className="container-wide py-16 md:py-20">
          <div className="flex items-baseline justify-between mb-8">
            <p className="eyebrow">§7 — Process & accountability</p>
            <p className="text-[12px] text-muted-foreground">Procedural depth</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {procedural.map((p, i) => (
              <Link key={p.t} to={p.to} className="rounded-lg border border-border/60 bg-background p-5 hover:bg-surface-muted/40 transition-colors group">
                <p className="font-mono text-[11px] text-muted-foreground mb-3">§7.{i + 1}</p>
                <p className="h-card mb-2 group-hover:text-primary">{p.t}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{p.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §8 Vendor participation — last */}
      <section className="border-b border-border/50 bg-surface-muted/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="eyebrow mb-3">§8 — Vendor participation</p>
              <h2 className="h-section">
                For vendors seeking listing under the framework.
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                Submission requirements, evidence categories, and review timelines are published openly. A listing is issued only after compliance assessment is complete and a Unique Audit Identifier has been assigned.
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
