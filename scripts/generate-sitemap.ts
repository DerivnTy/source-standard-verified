/**
 * Sitemap generator.
 *
 * Emits a sitemap index plus four child sitemaps:
 *   sitemap-static.xml     public marketing / policy / cluster / article routes
 *   sitemap-clinics.xml    clinic records that clear the indexation gate
 *   sitemap-facilities.xml facility records that clear the gate
 *   sitemap-articles.xml   the article library and Learn content
 *
 * The clinic and facility files are filtered through the SAME
 * indexability module the page components use, so the sitemap and the
 * robots meta tag can never disagree.
 *
 * <lastmod> is emitted only where a real, page-specific timestamp
 * exists. Static routes and directory records have no authoritative
 * change timestamp, so they omit it rather than advertise the build date.
 *
 * Usage: bun scripts/generate-sitemap.ts  (wired to predev + prebuild)
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://www.sourcestandard.org";

type Url = { loc: string; changefreq?: string; priority?: string; lastmod?: string };

const BROWSE_PAGE_SIZE = 250;

// Static public routes (mirrors App.tsx). Retired /education/*, /library/*,
// /directory/* and /greenlist/* routes are intentionally omitted — they
// redirect to their successors.
const staticRoutes: string[] = [
  "/",
  "/about",
  "/how-it-works",

  "/facilities",
  "/clinics",
  "/for-vendors",

  // Learn universe
  "/learn",
  "/learn/education",
  "/learn/news",
  "/learn/faq",

  // Tier D FAQ pages (still live at their /library/faq paths)
  "/library/faq/legal-regulatory",
  "/library/faq/clinical-safety",
  "/library/faq/verification-process",
  "/library/faq/consumer-diligence",

  "/governance",
  "/contact",
  "/accountability",
  "/medical-advisory",
  "/faq",
  "/report-a-concern",
  "/status-definitions",
  "/privacy",
  "/terms",
  "/verification-disclaimer",
  "/how-to-read-the-directory",
];

const renderUrlset = (urls: Url[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
        (u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>\n` : "") +
        (u.priority ? `    <priority>${u.priority}</priority>\n` : "") +
        `  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const renderIndex = (files: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  files.map((f) => `  <sitemap>\n    <loc>${SITE_URL}/${f}</loc>\n  </sitemap>`).join("\n") +
  `\n</sitemapindex>\n`;

const write = (file: string, xml: string) => {
  writeFileSync(resolve(process.cwd(), "public", file), xml, "utf8");
};

async function main() {
  const { vendors } = await import("../src/data/vendors");
  const { greenlistEntries } = await import("../src/data/greenlist");
  const { advisoryBoard } = await import("../src/data/advisoryBoard");
  const { EDUCATION_ARTICLES, NEWS_ARTICLES } = await import("../src/data/learn");
  const { ARTICLES } = await import("../src/data/articles");
  const { CLUSTER_PAGES } = await import("../src/seo/clusters");
  const { isVendorIndexable, isFacilityIndexable, vendorIndexationReport } = await import(
    "../src/seo/indexability"
  );

  // ── Static + cluster ──────────────────────────────────────────────
  const staticUrls: Url[] = staticRoutes.map((path) => ({
    loc: `${SITE_URL}${path}`,
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? "1.0" : "0.7",
  }));

  for (const p of CLUSTER_PAGES) {
    staticUrls.push({
      loc: `${SITE_URL}${p.path}`,
      changefreq: "monthly",
      priority: p.isHub ? "0.9" : "0.8",
      lastmod: p.updated,
    });
  }

  for (const a of advisoryBoard) {
    if (!a.slug) continue;
    staticUrls.push({
      loc: `${SITE_URL}/medical-advisory/${a.slug}`,
      changefreq: "yearly",
      priority: "0.4",
    });
  }

  // ── Clinics ───────────────────────────────────────────────────────
  const indexableVendors = vendors.filter((v) => v.slug && isVendorIndexable(v));
  const clinicUrls: Url[] = [];

  const browsePages = Math.max(1, Math.ceil(indexableVendors.length / BROWSE_PAGE_SIZE));
  for (let p = 1; p <= browsePages; p++) {
    clinicUrls.push({
      loc: `${SITE_URL}/clinics/browse${p === 1 ? "" : `/${p}`}`,
      changefreq: "weekly",
      priority: "0.5",
    });
  }

  for (const v of indexableVendors) {
    clinicUrls.push({
      loc: `${SITE_URL}/clinics/${v.slug}`,
      changefreq: "monthly",
      priority: v.status === "unverified" ? "0.5" : "0.7",
      lastmod: v.lastUpdatedDate,
    });
  }

  // ── Facilities ────────────────────────────────────────────────────
  const facilityUrls: Url[] = greenlistEntries
    .filter((g) => g.slug && isFacilityIndexable(g))
    .map((g) => ({
      loc: `${SITE_URL}/facilities/${g.slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));

  // ── Articles ──────────────────────────────────────────────────────
  const articleUrls: Url[] = [
    { loc: `${SITE_URL}/articles`, changefreq: "weekly", priority: "0.8" },
  ];

  for (const a of ARTICLES) {
    articleUrls.push({
      loc: `${SITE_URL}/articles/${a.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: a.updated,
    });
  }

  for (const e of EDUCATION_ARTICLES) {
    articleUrls.push({
      loc: `${SITE_URL}/learn/education/${e.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: e.updated,
    });
  }

  for (const n of NEWS_ARTICLES) {
    articleUrls.push({
      loc: `${SITE_URL}/learn/news/${n.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: n.dateline,
    });
  }

  write("sitemap-static.xml", renderUrlset(staticUrls));
  write("sitemap-clinics.xml", renderUrlset(clinicUrls));
  write("sitemap-facilities.xml", renderUrlset(facilityUrls));
  write("sitemap-articles.xml", renderUrlset(articleUrls));
  write(
    "sitemap.xml",
    renderIndex([
      "sitemap-static.xml",
      "sitemap-clinics.xml",
      "sitemap-facilities.xml",
      "sitemap-articles.xml",
    ]),
  );

  const report = vendorIndexationReport(vendors);
  const total =
    staticUrls.length + clinicUrls.length + facilityUrls.length + articleUrls.length;

  // eslint-disable-next-line no-console
  console.log(
    `sitemap: ${total} urls across 4 files ` +
      `(static ${staticUrls.length}, clinics ${clinicUrls.length}, ` +
      `facilities ${facilityUrls.length}, articles ${articleUrls.length})\n` +
      `indexation gate: ${report.indexable}/${report.total} clinic records qualify ` +
      `(threshold ${report.threshold}); ${report.excluded} held back as thin`,
  );
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
