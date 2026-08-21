import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, type NavRoute } from "@/config/navigation";
import { HOME_DISCLAIMER, HOME_TAGLINE } from "@/data/publicLanguage";

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

const HAIRLINE = "rgba(255,255,255,0.12)";

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
        className="block hover:text-white"
        style={{
          color: "rgba(255,255,255,0.64)",
          fontSize: "13px",
          lineHeight: 1.45,
          padding: "3px 0",
        }}
      >
        {row.label}
      </Link>
    </li>
  );
};

export const SiteFooter = () => {
  const now = new Date();

  return (
    <footer className="relative bg-[hsl(var(--navy-surface))] text-white">
      <div className="page-shell" style={{ paddingTop: "28px", paddingBottom: "20px" }}>
        <div className="flex flex-col gap-1" style={{ marginBottom: "20px" }}>
          <Logo variant="light" />
          <p
            className="font-sans"
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: "12.5px",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "36ch",
            }}
          >
            {HOME_TAGLINE}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-0">
          {columns.map((col) => (
            <div key={col.title}>
              <p
                className="font-sans"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {col.title}
              </p>
              <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                {col.links.map((l) => (
                  <FooterLink key={l.label} row={l} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col gap-3"
          style={{
            marginTop: "22px",
            paddingTop: "16px",
            borderTop: `1px solid ${HAIRLINE}`,
          }}
        >
          <p
            className="font-sans"
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: "12.5px",
              lineHeight: 1.55,
              maxWidth: "62ch",
              margin: 0,
            }}
          >
            {HOME_DISCLAIMER}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p
              className="font-sans"
              style={{
                color: "rgba(255,255,255,0.46)",
                fontSize: "12px",
                margin: 0,
              }}
            >
              © {now.getFullYear()} Source Standard
            </p>
            <Link
              to="/verification-disclaimer"
              className="hover:text-white"
              style={{
                color: "rgba(255,255,255,0.56)",
                fontSize: "12px",
              }}
            >
              Verification limits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
