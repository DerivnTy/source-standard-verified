import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

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
      { to: "/verified-vendors", label: "Vendor Registry" },
      { to: "/greenlist", label: "Upstream Registry" },
      { to: "/report-a-concern", label: "Report a Concern" },
    ],
  },
  {
    title: "Standards",
    links: [
      { to: "/how-it-works", label: "Verification Protocol" },
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

const MUTED = "#94A3B8";
const HAIRLINE = "rgba(148, 163, 184, 0.18)";

const FooterLink = ({ row }: { row: LinkRow }) => (
  <li>
    <Link
      to={row.to}
      className="block font-sans text-[13px] hover:text-white transition-colors"
      style={{ color: MUTED }}
    >
      {row.label}
    </Link>
  </li>
);

export const SiteFooter = () => {
  const now = new Date();

  return (
    <footer
      className="mt-0 mb-0 bg-[hsl(var(--navy-surface))]"
    >
      <div className="page-shell pt-10 md:pt-16 pb-6 md:pb-20">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-9 md:gap-y-12 items-start text-left">
            <div className="lg:col-span-1">
              <Logo variant="light" className="h-6" />
            </div>

            {columns.map((col) => (
              <div key={col.title} className="text-left">
                <p
                  className="mb-3 md:mb-4 font-sans text-[12px] font-semibold uppercase text-white"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2 md:space-y-2.5">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} row={l} />
                  ))}
                  {col.title === "Registry" && (
                    <li>
                      <Link
                        to="/apply"
                        className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-white hover:text-white/80 transition-colors"
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

        {/* Legal band — hard-cut hairline, no gradients */}
        <div
          className="mt-9 md:mt-14 pt-5 md:pt-6"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-y-3">
            <p
              className="font-sans text-[11px]"
              style={{ color: MUTED }}
            >
              © {now.getFullYear()} Source Standard. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#22C55E" }}
              />
              <span
                className="font-mono text-[10.5px] uppercase"
                style={{ color: MUTED, letterSpacing: "0.12em" }}
              >
                System Status: Operational
              </span>
            </div>
          </div>

          <p
            className="mt-4 md:mt-5 max-w-[900px] font-sans text-[11px] leading-[1.5] md:leading-[1.65]"
            style={{ color: MUTED }}
          >
            Source Standard is an independent public-reference and verification
            framework for compounded therapy vendor sourcing claims. Listings
            reflect documentation reviewed within a defined scope and at a
            defined point in time. Verification does not constitute medical
            advice, regulatory approval, product approval, treatment
            recommendation, or a guarantee of safety, efficacy, or outcome.
          </p>
        </div>
      </div>
    </footer>
  );
};
