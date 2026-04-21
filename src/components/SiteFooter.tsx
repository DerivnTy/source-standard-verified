import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

type LinkRow = {
  to: string;
  label: string;
  docId: string;
  forthcoming?: boolean;
};

type Column = {
  title: string;
  links: LinkRow[];
};

const columns: Column[] = [
  {
    title: "Registry & Intake",
    links: [
      { to: "/verified-vendors", label: "Verified Vendor Directory", docId: "SS-REG-V" },
      { to: "/greenlist", label: "Upstream Greenlist", docId: "SS-REG-G" },
      { to: "/report-a-concern", label: "Report a Concern", docId: "SS-INTAKE-02" },
    ],
  },
  {
    title: "Standards & Protocols",
    links: [
      { to: "/how-it-works", label: "SOP: Audit Methodology", docId: "SS-FRAMEWORK" },
      { to: "/status-definitions", label: "Status Definitions", docId: "SS-STATUS" },
      { to: "/accountability", label: "Compliance & Enforcement", docId: "SS-ENFORCE-2026.01" },
      { to: "/for-vendors", label: "Vendor Submission Standard", docId: "SS-INTAKE-01" },
    ],
  },
  {
    title: "Educational Library",
    links: [
      { to: "/education#basics", label: "Foundational Sourcing", docId: "SS-SERIES" },
      { to: "/education/how-to-read-a-certificate-of-analysis", label: "Interpreting CoAs", docId: "SS-SERIES-002" },
      { to: "/education#guides", label: "Clinical Protocols", docId: "SS-GUIDE" },
      { to: "/education#questions", label: "Regulatory FAQ", docId: "SS-FAQ" },
      { to: "/contact", label: "Video Library", docId: "SS-SUP-001", forthcoming: true },
    ],
  },
  {
    title: "Governance & Legal",
    links: [
      { to: "/medical-advisory", label: "Medical Advisory Board (MAB)", docId: "SS-MAB-2026.01" },
      { to: "/governance", label: "Organizational Neutrality", docId: "SS-GOV-2026.01" },
      { to: "/terms", label: "Terms of Use", docId: "SS-TERMS-2026.01" },
      { to: "/privacy", label: "Privacy Policy", docId: "SS-PRIVACY-2026.01" },
      { to: "/verification-disclaimer", label: "Verification Disclaimer", docId: "SS-DISCLAIMER-2026.01" },
    ],
  },
];

const LinkEntry = ({ row }: { row: LinkRow }) => (
  <li>
    <Link
      to={row.to}
      className="flex items-baseline justify-between gap-3 py-1.5 group"
    >
      <span className="text-[13.5px] text-muted-foreground group-hover:text-foreground transition-colors flex items-baseline gap-2 min-w-0">
        <span className="truncate">{row.label}</span>
        {row.forthcoming && (
          <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground/70 border border-border/60 px-1 py-px rounded-[2px]">
            Forthcoming
          </span>
        )}
      </span>
      <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground/60 tabular-nums">
        {row.docId}
      </span>
    </Link>
  </li>
);

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-surface-muted/30 mt-20">
      <div className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide flex flex-wrap items-center justify-between gap-y-2 py-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
            Standard SS-FRAMEWORK-2026.01 · Active
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
            Reviewed under Medical Advisory Board · Updated 04/21/26
          </span>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-5 text-[13.5px] text-muted-foreground leading-relaxed max-w-xs">
              Source Standard is the public verification and standards body for
              the peptide, TRT, and hormone optimization vendor space.
            </p>
            <p className="mt-5 text-[12.5px] text-muted-foreground">
              Tampa, FL · Founded 2026
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
              Document anchor · SS-FRAMEWORK-2026.01
            </p>
          </div>

          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-border/60">
            {columns.map((col, idx) => (
              <div key={col.title} className={idx === 0 ? "lg:pr-6" : "lg:px-6 last:lg:pr-0"}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground mb-4">
                  {col.title}
                </p>
                <ul className="space-y-0">
                  {col.links.map((l) => (
                    <LinkEntry key={l.label} row={l} />
                  ))}
                </ul>
                {col.title === "Registry & Intake" && (
                  <Button asChild variant="default" className="mt-5 w-full">
                    <Link to="/apply">Begin Verification (Step 1)</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/70">
          <p className="text-[13px] text-muted-foreground leading-relaxed max-w-4xl">
            Source Standard is an independent auditing and information framework. It does
            not manufacture, distribute, prescribe, or dispense products, and it does not
            provide medical advice. A listing reflects documentation reviewed at the time
            of compliance assessment and does not guarantee medical outcomes, product
            safety, or treatment efficacy.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2">
            <p className="text-[12.5px] text-muted-foreground">
              © {new Date().getFullYear()} Source Standard · SourceStandard.org
            </p>
            <p className="text-[12.5px] text-muted-foreground">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
