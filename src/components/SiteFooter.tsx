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
      { to: "/education", label: "Resource Library" },
      { to: "/education#regulation", label: "Regulation" },
      { to: "/education#clinical", label: "Clinical" },
      { to: "/education#consumer", label: "Consumer Due Diligence" },
      { to: "/education#common-inquiries", label: "Common Inquiries" },
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
      className="block t-body-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {row.label}
    </Link>
  </li>
);

export const SiteFooter = () => {
  return (
    // Hard-stop: no top margin; 1px hsl(214 32% 91%) ≈ #E2E8F0 end-of-document line.
    <footer className="mt-0 border-t border-border bg-surface-muted/30">
      <div className="page-shell py-12 md:py-14">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 items-start text-left">
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-5 t-body-sm text-muted-foreground text-left">
                Source Standard · United States
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title} className="text-left">
                <p className="t-utility-xs text-foreground mb-4 text-left">
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
                        className="inline-flex items-center gap-1 t-body-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
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
          <p className="max-w-[900px] mx-auto text-left md:text-center t-micro text-muted-foreground">
            Source Standard is an independent public-reference and verification framework. Listings reflect documentation reviewed within a defined scope and at a defined point in time. Verification does not constitute medical advice, regulatory approval, or a guarantee of safety, efficacy, or outcome.
          </p>
          <div className="mt-5 max-w-[900px] mx-auto flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-y-2 text-left md:text-center">
            <p className="t-micro text-muted-foreground text-left">
              © {new Date().getFullYear()} Source Standard · SourceStandard.org
            </p>
            <p className="t-micro text-muted-foreground text-left">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
