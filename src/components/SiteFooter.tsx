import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useSiteAccess } from "@/hooks/useSiteAccess";

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
      { to: "/how-it-works", label: "Verification Framework" },
      { to: "/status-definitions", label: "Status Definitions" },
      { to: "/accountability", label: "Compliance" },
      { to: "/medical-advisory", label: "Advisory Board" },
    ],
  },
  {
    title: "Resource Library",
    links: [
      { to: "/education", label: "Resource Library" },
      { to: "/library/publications", label: "Publications" },
      { to: "/education#common-inquiries", label: "Common Inquiries" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Source Standard" },
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/verification-disclaimer", label: "Disclaimer" },
    ],
  },
];

const HAIRLINE = "rgba(148, 163, 184, 0.18)";

const FooterLink = ({ row }: { row: LinkRow }) => {
  const { pathname } = useLocation();
  const basePath = row.to.split("#")[0];
  const isCurrentPage = basePath === pathname;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCurrentPage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <li>
      <Link
        to={row.to}
        onClick={handleClick}
        className="block t-body-sm hover:text-white transition-colors"
        style={{ color: "rgba(255,255,255,0.62)" }}
      >
        {row.label}
      </Link>
    </li>
  );
};

export const SiteFooter = () => {
  const now = new Date();
  const { lock } = useSiteAccess();
  const { pathname } = useLocation();

  return (
    <>
      {/* Paints navy behind any overscroll bounce so the page never reveals cream below the footer. */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 h-[50vh] -z-10 pointer-events-none bg-[hsl(var(--navy-surface))]"
      />
      <footer
        className="relative mt-0 mb-0 bg-[hsl(var(--navy-surface))]"
      >
        <div className="page-shell pt-6 md:pt-10 lg:pt-12 pb-6 md:pb-12 lg:pb-10">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 lg:gap-x-12 gap-y-9 md:gap-y-12 items-start text-left">
            <div className="lg:col-span-1">
              <Logo variant="light" className="h-6" />
            </div>

            {columns.map((col) => (
              <div key={col.title} className="text-left">
                <p
                  className="mb-3 md:mb-4 t-utility-xs"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2 md:space-y-2.5">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} row={l} />
                  ))}
                  {col.title === "Registry" && (
                    <li>
                      {pathname === "/apply" ? (
                        <button
                          type="button"
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          className="inline-flex items-center gap-1 t-body-sm text-white hover:text-white/80 transition-colors"
                        >
                          Begin Verification <span aria-hidden="true">→</span>
                        </button>
                      ) : (
                        <Link
                          to="/apply"
                          className="inline-flex items-center gap-1 t-body-sm text-white hover:text-white/80 transition-colors"
                        >
                          Begin Verification <span aria-hidden="true">→</span>
                        </Link>
                      )}
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
              className="t-utility-xs"
              style={{ color: "rgba(255,255,255,0.48)" }}
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
                className="t-numeric uppercase"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                System Status: Operational
              </span>
              <span aria-hidden style={{ color: "rgba(255,255,255,0.40)" }}>·</span>
              <button
                type="button"
                onClick={lock}
                className="t-numeric uppercase hover:opacity-100 transition-opacity opacity-70"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Lock
              </button>
            </div>
          </div>

          <p
            className="mt-4 md:mt-5 max-w-[900px] font-sans"
            style={{ color: "rgba(255,255,255,0.40)", fontSize: "11px", lineHeight: 1.6 }}
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
    </>
  );
};
