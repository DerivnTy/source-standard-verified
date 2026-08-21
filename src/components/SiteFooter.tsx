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
          color: "rgba(255,255,255,0.78)",
          fontSize: "14px",
          lineHeight: 1.45,
          padding: "5px 0",
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
      <div className="page-shell" style={{ paddingTop: "56px", paddingBottom: "36px" }}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo variant="light" />
            <p
              className="font-sans"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "15px",
                lineHeight: 1.5,
                margin: "14px 0 0",
                maxWidth: "28ch",
              }}
            >
              {HOME_TAGLINE}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p
                className="font-sans"
                style={{
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
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
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: `1px solid ${HAIRLINE}`,
          }}
        >
          <p
            className="font-sans"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "13.5px",
              lineHeight: 1.65,
              maxWidth: "62ch",
              margin: 0,
            }}
          >
            {HOME_DISCLAIMER}
          </p>
          <div
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            style={{ marginTop: "20px" }}
          >
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
