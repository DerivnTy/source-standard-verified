import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, type NavRoute } from "@/config/navigation";

type LinkRow = {
  to: string;
  label: string;
};

type Column = {
  title: string;
  links: LinkRow[];
};

const columns: Column[] = FOOTER_COLUMNS.map((c) => ({
  title: c.title,
  links: c.links.map((l: NavRoute) => ({ to: l.path, label: l.label })),
}));


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
        <div className="page-shell pt-10 md:pt-12 lg:pt-12 pb-6 md:pb-8 lg:pb-8">
        <div className="mx-auto w-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-10 md:gap-y-10 items-start text-left">
            <div className="lg:col-span-1">
              <Logo variant="light" className="h-6" />
            </div>

            {columns.map((col) => (
              <div key={col.title} className="text-left">
                <p
                  className="mb-4 md:mb-5 t-utility-xs"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  {col.title}
                </p>
                <ul className="space-y-1.5 md:space-y-2">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} row={l} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal band, hard-cut hairline, no gradients */}
        <div
          className="mt-8 md:mt-10 pt-5"
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
                className="t-numeric"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                System Status: Operational
              </span>
            </div>
          </div>

          <p
            className="mt-5 md:mt-6 font-sans"
            style={{ color: "rgba(255,255,255,0.32)", fontSize: "10px", lineHeight: 1.7, maxWidth: "60ch" }}
          >
            Source Standard is an independent public-reference and verification
            framework for compounded therapy vendor sourcing claims. Records
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
