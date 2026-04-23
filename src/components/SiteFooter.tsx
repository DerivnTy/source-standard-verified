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
    title: "REGISTRY",
    links: [
      { to: "/verified-vendors", label: "Verified Vendors" },
      { to: "/greenlist", label: "Greenlist" },
      { to: "/report-a-concern", label: "Report a Concern" },
    ],
  },
  {
    title: "STANDARDS",
    links: [
      { to: "/how-it-works", label: "Audit Methodology" },
      { to: "/status-definitions", label: "Status Definitions" },
      { to: "/accountability", label: "Compliance" },
    ],
  },
  {
    title: "RESOURCE_LIBRARY",
    links: [
      { to: "/education", label: "Resource Library" },
      { to: "/education#regulation", label: "Regulation" },
      { to: "/education#clinical", label: "Clinical" },
      { to: "/education#consumer", label: "Consumer Due Diligence" },
      { to: "/education#common-inquiries", label: "Common Inquiries" },
    ],
  },
  {
    title: "GOVERNANCE",
    links: [
      { to: "/medical-advisory", label: "Advisory Board" },
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
      { to: "/verification-disclaimer", label: "Disclaimer" },
    ],
  },
];

// Slightly lighter navy/slate than the CTA navy hero, to clearly distinguish
// the footer as a separate ledger band.
const FOOTER_BG = "#112240";
const MUTED = "#94A3B8";
const HAIRLINE = "rgba(148, 163, 184, 0.18)";

const FooterLink = ({ row }: { row: LinkRow }) => (
  <li>
    <Link
      to={row.to}
      className="block font-mono text-[12px] hover:text-white transition-colors"
      style={{ color: MUTED, letterSpacing: "0.04em" }}
    >
      {row.label}
    </Link>
  </li>
);

export const SiteFooter = () => {
  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").slice(0, 16) + " UTC";

  return (
    <footer
      className="mt-0"
      style={{
        backgroundColor: FOOTER_BG,
        // Hard-stop document boundary: 80px padding-bottom on the very last
        // element of the page.
        paddingBottom: "80px",
      }}
    >
      <div className="page-shell pt-12 md:pt-14">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 items-start text-left">
            <div className="lg:col-span-1">
              <Logo />
              <p
                className="mt-5 font-mono text-[11px] uppercase"
                style={{ color: MUTED, letterSpacing: "1px" }}
              >
                SOURCE_STANDARD · UNITED_STATES
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title} className="text-left">
                <p
                  className="mb-4 font-mono text-[10px] uppercase text-white/80"
                  style={{ letterSpacing: "1.5px" }}
                >
                  {col.title}
                </p>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} row={l} />
                  ))}
                  {col.title === "REGISTRY" && (
                    <li>
                      <Link
                        to="/apply"
                        className="inline-flex items-center gap-1 font-mono text-[12px] font-medium text-white hover:text-white/80 transition-colors"
                        style={{ letterSpacing: "0.04em" }}
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

        {/* System status + legal band */}
        <div
          className="mt-12 pt-6"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#22C55E" }}
              />
              <span
                className="font-mono text-[11px] uppercase"
                style={{ color: MUTED, letterSpacing: "1px" }}
              >
                SYSTEM_STATUS // OPERATIONAL
              </span>
              <span
                className="font-mono text-[11px] hidden sm:inline"
                style={{ color: MUTED, letterSpacing: "0.06em" }}
              >
                · {timestamp}
              </span>
            </div>
            <p
              className="font-mono text-[10px] uppercase"
              style={{ color: MUTED, letterSpacing: "1.5px" }}
            >
              © {now.getFullYear()} SOURCE_STANDARD · ALL_RIGHTS_RESERVED
            </p>
          </div>

          <p
            className="mt-5 max-w-[900px] font-mono text-[10px] leading-[1.6]"
            style={{ color: MUTED, letterSpacing: "0.04em" }}
          >
            Source Standard is an independent public-reference and verification
            framework. Listings reflect documentation reviewed within a defined
            scope and at a defined point in time. Verification does not
            constitute medical advice, regulatory approval, or a guarantee of
            safety, efficacy, or outcome.
          </p>
        </div>
      </div>
    </footer>
  );
};
