/**
 * Sitemap generator — head-only SEO infra.
 * Writes public/sitemap.xml with absolute URLs for all public routes,
 * vendor profiles, greenlist profiles, advisor profiles, and Learn
 * (education + news) articles.
 *
 * Usage: bun scripts/generate-sitemap.ts
 * Wired into npm `prebuild` so production builds always ship a fresh sitemap.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://www.sourcestandard.org";

type Url = { loc: string; changefreq?: string; priority?: string; lastmod?: string };

// NOTE: <lastmod> is emitted only where a real, page-specific timestamp
// exists (Learn articles). Static routes and directory records have no
// authoritative change timestamp, so they omit it rather than advertise
// the build date.
const BROWSE_PAGE_SIZE = 250;


// Static public routes (mirrors App.tsx). Retired /education/* and
// /library/* routes are intentionally omitted — they 301 to /learn/*.
const staticRoutes: string[] = [
  "/",
  "/about",
  "/how-it-works",
  
  "/greenlist",
  "/verified-vendors",
  "/directory",
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

async function main() {
  const { vendors } = await import("../src/data/vendors");
  const { greenlistEntries } = await import("../src/data/greenlist");
  const { advisoryBoard } = await import("../src/data/advisoryBoard");
  const { EDUCATION_ARTICLES, NEWS_ARTICLES } = await import("../src/data/learn");

  const urls: Url[] = [];

  for (const path of staticRoutes) {
    urls.push({
      loc: `${SITE_URL}${path}`,
      changefreq: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? "1.0" : "0.7",
      lastmod: today,
    });
  }

  for (const v of vendors) {
    if (!v.slug) continue;
    urls.push({
      loc: `${SITE_URL}/directory/${v.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: today,
    });
  }

  for (const g of greenlistEntries) {
    if (!g.slug) continue;
    urls.push({
      loc: `${SITE_URL}/greenlist/${g.slug}`,
      changefreq: "monthly",
      priority: "0.5",
      lastmod: today,
    });
  }

  for (const a of advisoryBoard) {
    if (!a.slug) continue;
    urls.push({
      loc: `${SITE_URL}/medical-advisory/${a.slug}`,
      changefreq: "yearly",
      priority: "0.4",
      lastmod: today,
    });
  }

  for (const e of EDUCATION_ARTICLES) {
    urls.push({
      loc: `${SITE_URL}/learn/education/${e.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: e.updated,
    });
  }

  for (const n of NEWS_ARTICLES) {
    urls.push({
      loc: `${SITE_URL}/learn/news/${n.slug}`,
      changefreq: "monthly",
      priority: "0.6",
      lastmod: n.dateline,
    });
  }

  const xml =
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

  const out = resolve(process.cwd(), "public/sitemap.xml");
  writeFileSync(out, xml, "utf8");
  // eslint-disable-next-line no-console
  console.log(`sitemap: wrote ${urls.length} urls -> ${out}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
