/**
 * Internal linking engine.
 *
 * Rule-based rather than hand-maintained: every entity derives its
 * outbound links from its own data, so authority flows automatically as
 * records and articles are added.
 */

import { ARTICLES, getArticle, type Article } from "@/data/articles";
import { CLUSTERS, CLUSTER_PAGES, clusterSpokes, type ClusterId } from "@/seo/clusters";
import type { Vendor } from "@/data/vendors";
import type { GreenlistEntry } from "@/data/greenlist";

export type SiteLink = { to: string; label: string; description?: string };

const articleLink = (a: Article): SiteLink => ({
  to: `/articles/${a.slug}`,
  label: a.question,
  description: a.standfirst,
});

export const articleLinks = (slugs: string[]): SiteLink[] =>
  slugs.map(getArticle).filter((a): a is Article => Boolean(a)).map(articleLink);

/** Cluster hub + every spoke, for hub pages and footers. */
export const clusterNavLinks = (id: ClusterId): SiteLink[] =>
  clusterSpokes(id).map((p) => ({ to: p.path, label: p.navLabel, description: p.metaDescription }));

export const allClusterLinks = (): SiteLink[] =>
  CLUSTER_PAGES.map((p) => ({ to: p.path, label: p.navLabel, description: p.metaDescription }));

/**
 * Topical article picks for a clinic record, chosen from its category
 * and clinical focus. Deterministic, so the same record always renders
 * the same links.
 */
export const articlesForVendor = (v: Vendor, limit = 4): SiteLink[] => {
  const haystack = [
    v.category,
    ...(v.clinicalFocus ?? []),
    ...(v.treatmentCategories ?? []),
    ...(v.servicesOffered ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const peptideish = /peptide|glp|semaglutide|tirzepatide|bpc|weight/.test(haystack);
  const pharmacyish = /pharmacy|compound|503/.test(haystack);

  const priority: string[] = [];
  if (pharmacyish) {
    priority.push("503b-registration-does-not-mean-verified-quality", "503a-vs-503b-whats-the-difference", "what-is-a-503b-outsourcing-facility", "does-the-pharmacy-compound-the-peptide-itself");
  }
  if (peptideish) {
    priority.push("peptide-vendor-sentenced-false-testing-sourcing-claims", "where-do-peptide-clinics-source-their-products", "what-should-patients-ask-a-peptide-clinic", "what-does-a-peptide-coa-actually-prove");
  }
  priority.push(
    "how-to-evaluate-a-peptide-clinic",
    "how-can-you-verify-where-a-compounded-peptide-came-from",
    "how-peptide-sourcing-works",
  );

  const seen = new Set<string>();
  const picked: string[] = [];
  for (const slug of priority) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    if (getArticle(slug)) picked.push(slug);
    if (picked.length >= limit) break;
  }
  return articleLinks(picked);
};

/** Cluster destinations relevant to a clinic record. */
export const clustersForVendor = (v: Vendor): SiteLink[] => {
  const links: SiteLink[] = [
    { to: CLUSTERS.peptides.path, label: "Peptides", description: CLUSTERS.peptides.blurb },
    { to: CLUSTERS.compounding.path, label: "Compounding", description: CLUSTERS.compounding.blurb },
  ];
  if (v.state) {
    links.push({
      to: `/clinics?state=${encodeURIComponent(v.state)}`,
      label: `Clinics in ${v.state}`,
      description: "Other directory records in the same state.",
    });
  }
  return links;
};

export const articlesForFacility = (g: GreenlistEntry, limit = 4): SiteLink[] => {
  const is503b = g.category === "503B" || /503B/i.test(g.type);
  const slugs = is503b
    ? [
        "503b-registration-does-not-mean-verified-quality",
        "what-is-a-503b-outsourcing-facility",
        "503a-vs-503b-whats-the-difference",
        "who-manufactures-compounded-peptides",
        "purity-testing-vs-sterility-testing",
      ]
    : [
        "what-is-a-503a-compounding-pharmacy",
        "503a-vs-503b-whats-the-difference",
        "does-the-pharmacy-compound-the-peptide-itself",
        "what-does-a-peptide-coa-actually-prove",
        "503b-registration-does-not-mean-verified-quality",
      ];
  return articleLinks(slugs.slice(0, limit));
};

export const clustersForFacility = (g: GreenlistEntry): SiteLink[] => {
  const is503b = g.category === "503B" || /503B/i.test(g.type);
  return [
    {
      to: is503b ? "/compounding/503b" : "/compounding/503a",
      label: is503b ? "503B outsourcing facilities" : "503A compounding pharmacies",
    },
    { to: "/compounding/503a-vs-503b", label: "503A vs 503B compared" },
    { to: "/peptides/sterility-testing", label: "Sterility testing" },
  ];
};

/** Sibling articles for an article, excluding itself. */
export const siblingArticles = (slug: string, limit = 3): SiteLink[] => {
  const self = getArticle(slug);
  const explicit = articleLinks(self?.relatedArticles ?? []);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const rest = ARTICLES.filter(
    (a) => a.slug !== slug && !explicit.some((e) => e.to.endsWith(a.slug)),
  )
    .filter((a) => !self?.cluster || a.cluster === self.cluster)
    .slice(0, limit - explicit.length)
    .map(articleLink);

  return [...explicit, ...rest];
};
