import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Registry",
    links: [
      { to: "/verified-vendors", label: "Verified vendors" },
      { to: "/greenlist", label: "Greenlist" },
      { to: "/status-definitions", label: "Status definitions" },
      { to: "/report-a-concern", label: "Report a concern" },
    ],
  },
  {
    title: "Medical & Governance",
    links: [
      { to: "/medical-advisory", label: "Medical Advisory Board" },
      { to: "/governance", label: "Governance & oversight" },
      { to: "/accountability", label: "Accountability & enforcement" },
      { to: "/about", label: "About" },
    ],
  },
  {
    title: "Standards & Process",
    links: [
      { to: "/how-it-works", label: "How verification works" },
      { to: "/for-vendors", label: "For vendors" },
      { to: "/apply", label: "Apply for verification" },
      { to: "/education", label: "Education" },
    ],
  },
  {
    title: "Reference & Templates",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/templates/vendor-profile", label: "Vendor profile template" },
      { to: "/templates/greenlist-entry", label: "Greenlist entry template" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy policy" },
      { to: "/terms", label: "Terms of use" },
      { to: "/verification-disclaimer", label: "Verification disclaimer" },
    ],
  },
];

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="border-b border-border/60 bg-surface-muted/60">
        <div className="container-wide flex flex-wrap items-center justify-between gap-y-2 py-3">
          <span className="text-[12.5px] text-muted-foreground">Standard SS-FRAMEWORK-2026.01 · Active</span>
          <span className="text-[12.5px] text-muted-foreground">Reviewed under Medical Advisory Board · Updated April 20, 2026</span>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-5 text-[14px] text-muted-foreground leading-relaxed max-w-xs">
              Source Standard is the public verification and standards organization for the
              peptide, TRT, and hormone optimization vendor space.
            </p>
            <p className="mt-5 text-[12.5px] text-muted-foreground">Tampa, FL · Founded 2026</p>
          </div>

          <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-5 gap-10">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-[13px] font-semibold text-foreground mb-4">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
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
