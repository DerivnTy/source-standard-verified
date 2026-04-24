/**
 * Sitemap generator — head-only SEO infra.
 * Writes public/sitemap.xml with absolute URLs for all public routes,
 * vendor profiles, greenlist profiles, advisor profiles, and library entries.
 *
 * Usage: bun scripts/generate-sitemap.ts
 * Wired into npm `prebuild` so production builds always ship a fresh sitemap.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://sourcestandard.org";

type Url = { loc: string; changefreq?: string; priority?: string; lastmod?: string };

const today = new Date().toISOString().slice(0, 10);

// Static public routes (mirrors App.tsx)
const staticRoutes: string[] = [
  "/",
  "/about",
  "/how-it-works",
  "/greenlist",
  "/verified-vendors",
  "/directory",
  "/for-vendors",
  "/education",
  "/education/basics",
  "/education/guides",
  "/education/questions",
  "/library/what-is-compounding",
  "/library/what-are-peptides",
  "/library/interpreting-coas",
  "/library/dual-layer-difference",
  "/library/sterile-preparation-integrity",
  "/library/aseptic-technique",
  "/library/endocrinological-context",
  "/library/reference-dosing-ranges",
  "/library/analysis/2026-reclassification",
  "/library/analysis/questions-for-your-clinic",
  "/library/analysis/meaning-of-verification",
  "/library/analysis/undocumented-sourcing-signs",
  "/library/sourcing",
  "/library/clinical",
  "/library/consumer",
  "/library/faq/legal-regulatory",
  "/library/faq/clinical-safety",
  "/library/faq/verification-process",
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
  // Dynamic data — imported from source modules.
  const { vendors } = await import("../src/data/vendors");
  const { greenlistEntries } = await import("../src/data/greenlist");
  const { advisoryBoard } = await import("../src/data/advisoryBoard");
  const { librarySeries, libraryGuides } = await import("../src/data/library");

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

  for (const e of [...librarySeries, ...libraryGuides]) {
    if (!e.slug) continue;
    urls.push({
      loc: `${SITE_URL}/education/${e.slug}`,
      changefreq: "monthly",
      priority: "0.5",
      lastmod: today,
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
