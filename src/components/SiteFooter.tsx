import { Link } from "react-router-dom";
import { Logo } from "./Logo";

type LinkRow = {
  to: string;
  label: string;
};

type Column = {
  title: string;
  links: LinkRow[];
};

const columns: Column[] = [
  {
    title: "Registry",
    links: [
      { to: "/verified-vendors", label: "Verified Vendors" },
      { to: "/greenlist", label: "Greenlist" },
      { to: "/report-a-concern", label: "Report a Concern" },
    ],
  },
  {
    title: "Standards",
    links: [
      { to: "/how-it-works", label: "Audit Methodology" },
      { to: "/status-definitions", label: "Status Definitions" },
      { to: "/accountability", label: "Compliance" },
    ],
  },
  {
    title: "Resource Library",
    links: [
      { to: "/education#basics", label: "Foundational Sourcing" },
      { to: "/education/how-to-read-a-certificate-of-analysis", label: "Interpreting CoAs" },
      { to: "/education#guides", label: "Protocols" },
      { to: "/education#questions", label: "FAQ" },
    ],
  },
  {
    title: "Governance",
    links: [
      { to: "/medical-advisory", label: "Advisory Board" },
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
      { to: "/verification-disclaimer", label: "Disclaimer" },
    ],
  },
];

const FooterLink = ({ row }: { row: LinkRow }) => (
  <li>
    <Link
      to={row.to}
      className="block text-[14px] leading-[1.8] text-muted-foreground hover:text-foreground transition-colors"
    >
      {row.label}
    </Link>
  </li>
);

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-surface-muted/30 mt-20">
      <div className="page-shell py-16">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 items-start">
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-5 text-[14px] leading-[1.8] text-muted-foreground">
                Source Standard · United States
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground mb-4">
                  {col.title}
                </p>
                <ul className="space-y-0">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} row={l} />
                  ))}
                  {col.title === "Registry" && (
                    <li>
                      <Link
                        to="/apply"
                        className="inline-flex items-center gap-1 text-[14px] leading-[1.8] font-medium text-foreground hover:text-foreground/70 transition-colors"
                      >
                        Begin Verification <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/70">
          <p className="max-w-[900px] mx-auto text-center text-[12px] text-muted-foreground leading-relaxed">
            Source Standard is an independent public-reference and verification framework. Listings reflect documentation reviewed within a defined scope and at a defined point in time. Verification does not constitute medical advice, regulatory approval, or a guarantee of safety, efficacy, or outcome.
          </p>
          <div className="mt-5 max-w-[900px] mx-auto flex flex-wrap items-center justify-between gap-y-2 text-center">
            <p className="text-[12px] text-muted-foreground">
              © {new Date().getFullYear()} Source Standard · SourceStandard.org
            </p>
            <p className="text-[12px] text-muted-foreground">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
