import { Link, useParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { vendors, VENDOR_STATUS_LABEL } from "@/data/vendors";
import { absoluteUrl } from "@/lib/siteUrl";

/**
 * Crawlable A–Z index of every provider record in the directory.
 *
 * The main registry surface (/clinics) is filter-driven and paginates in
 * component state, so its rows are not reliably discoverable by crawlers.
 * This surface exists purely so every /clinics/:slug page is reachable
 * through static <a href> links from a small, stable set of URLs.
 * New records inherit it automatically — nothing to configure per page.
 */

export const BROWSE_PAGE_SIZE = 250;

const sorted = () =>
  [...vendors].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export const browseTotalPages = () => Math.max(1, Math.ceil(vendors.length / BROWSE_PAGE_SIZE));

const DirectoryBrowse = () => {
  const { page: pageParam } = useParams<{ page?: string }>();
  const totalPages = browseTotalPages();
  const parsed = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), totalPages) : 1;

  const all = sorted();
  const start = (page - 1) * BROWSE_PAGE_SIZE;
  const slice = all.slice(start, start + BROWSE_PAGE_SIZE);
  const path = page === 1 ? "/clinics/browse" : `/clinics/browse/${page}`;

  return (
    <>
      <PageMeta
        title={`Provider Index${page > 1 ? ` — Page ${page}` : ""} | Source Standard`}
        rawTitle
        description={`Alphabetical index of every provider record in the Source Standard directory. Page ${page} of ${totalPages}.`}
        path={path}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Source Standard Provider Index",
          url: absoluteUrl(path),
        }}
      />

      <Breadcrumb items={[{ label: "Directory", to: "/clinics" }, { label: "Provider index" }]} />

      <section className="bg-background">
        <div className="mx-auto px-4" style={{ maxWidth: "980px", paddingTop: "12px", paddingBottom: "48px" }}>
          <h1
            className="font-sans text-foreground"
            style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            Provider index
          </h1>
          <p
            className="mt-2 text-muted-foreground"
            style={{ fontSize: "15px", lineHeight: 1.6 }}
          >
            Every provider record in the Source Standard directory, listed alphabetically.
            Inclusion in this index is not an endorsement and does not indicate verification
            status. Page {page} of {totalPages} · {vendors.length.toLocaleString()} records.
          </p>

          <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {slice.map((v) => (
              <li
                key={v.slug}
                style={{ borderTop: "0.5px solid hsl(var(--border) / 0.6)", padding: "8px 0" }}
              >
                <Link
                  to={`/clinics/${v.slug}`}
                  className="text-foreground hover:text-primary transition-colors"
                  style={{ fontSize: "15px", lineHeight: 1.45 }}
                >
                  {v.name}
                </Link>
                <span
                  className="ml-2 text-muted-foreground"
                  style={{ fontSize: "12px" }}
                >
                  {VENDOR_STATUS_LABEL[v.status]}
                </span>
              </li>
            ))}
          </ul>

          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Provider index pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                to={p === 1 ? "/clinics/browse" : `/clinics/browse/${p}`}
                aria-current={p === page ? "page" : undefined}
                className="inline-flex items-center justify-center font-sans font-semibold transition-colors"
                style={{
                  fontSize: "12px",
                  minWidth: "36px",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  border: "1px solid hsl(var(--border))",
                  background: p === page ? "hsl(var(--foreground))" : "transparent",
                  color: p === page ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                }}
              >
                {p}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
};

export default DirectoryBrowse;
