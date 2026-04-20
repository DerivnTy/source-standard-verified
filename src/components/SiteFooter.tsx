import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Registry",
    links: [
      { to: "/greenlist", label: "Greenlist" },
      { to: "/verified-vendors", label: "Verified Vendors" },
      { to: "/apply", label: "Apply for Verification" },
    ],
  },
  {
    title: "Standards",
    links: [
      { to: "/how-it-works", label: "Verification Lifecycle" },
      { to: "/for-vendors", label: "Documentation Requirements" },
      { to: "/education", label: "Reference Library" },
    ],
  },
  {
    title: "Organization",
    links: [
      { to: "/about", label: "About Source Standard" },
      { to: "/about", label: "Operating Philosophy" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/about", label: "Privacy" },
      { to: "/about", label: "Terms of Use" },
      { to: "/about", label: "Disclaimers" },
    ],
  },
];

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="border-b border-border bg-surface-muted">
        <div className="container-wide flex flex-wrap items-center justify-between gap-y-2 py-2.5">
          <span className="meta-label">Document Version 2026.01 · Active</span>
          <span className="meta-label">Last updated April 20, 2026</span>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Source Standard is a public verification and standards organization for the
              peptide, TRT, and hormone optimization vendor space.
            </p>
            <p className="mt-5 meta-label">Tampa, FL · Founded 2026</p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="meta-label text-foreground mb-4">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
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

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            Source Standard is a verification and standards organization. We are not a
            manufacturer, pharmacy, clinic, laboratory, regulator, or enforcement agency.
            Verification reflects documentation reviewed at the time of assessment and does
            not guarantee medical outcomes, product safety, or treatment efficacy.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2">
            <p className="meta-label">
              © {new Date().getFullYear()} Source Standard · SourceStandard.org
            </p>
            <p className="meta-label">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
