/**
 * Entity SEO.
 *
 * One function per entity type returns everything <head> needs: title,
 * description, canonical path, indexability, and a JSON-LD graph
 * including breadcrumbs. Adding an entity is a data change; SEO is
 * inherited.
 */

import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";
import { vendorIndexDecision, facilityIndexDecision, type SeoOverride } from "@/seo/indexability";
import type { Vendor } from "@/data/vendors";
import { VENDOR_STATUS_LABEL } from "@/data/vendors";
import type { GreenlistEntry } from "@/data/greenlist";
import type { Article } from "@/data/articles";
import type { ClusterPage } from "@/seo/clusters";
import { CLUSTERS } from "@/seo/clusters";

export const ORG_NAME = "Source Standard";

export type Crumb = { name: string; path?: string };

export type EntitySeo = {
  title: string;
  rawTitle: boolean;
  description: string;
  path: string;
  noindex: boolean;
  type: string;
  jsonLd: Record<string, unknown>[];
  crumbs: Crumb[];
};

export const publisherLd = {
  "@type": "Organization",
  name: ORG_NAME,
  url: SITE_URL,
};

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    ...(c.path ? { item: absoluteUrl(c.path) } : {}),
  })),
});

/** Sitewide WebSite entity with a search action. Rendered once, on the homepage. */
export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: ORG_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/clinics?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

const applyOverride = (
  base: { title: string; description: string; noindex: boolean },
  override?: SeoOverride,
) => ({
  title: override?.title ?? base.title,
  description: override?.description ?? base.description,
  noindex: typeof override?.index === "boolean" ? !override.index : base.noindex,
});

// ── Clinic ──────────────────────────────────────────────────────────

export const vendorSeo = (v: Vendor): EntitySeo => {
  const decision = vendorIndexDecision(v);
  const override = (v as Vendor & { seo?: SeoOverride }).seo;
  const path = `/clinics/${v.slug}`;
  const where = v.city && v.state ? ` in ${v.city}, ${v.state}` : v.state ? ` in ${v.state}` : "";

  const resolved = applyOverride(
    {
      title: `${v.name} | Source Standard`,
      description: `Independent sourcing transparency information for ${v.name}${where}. View its current Source Standard verification status.`,
      noindex: !decision.indexable,
    },
    override,
  );

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Clinics", path: "/clinics" },
    { name: v.name, path },
  ];

  return {
    ...resolved,
    rawTitle: true,
    path,
    type: "profile",
    crumbs,
    jsonLd: [breadcrumbLd(crumbs)],
  };
};

// ── Facility ────────────────────────────────────────────────────────

export const facilitySeo = (g: GreenlistEntry): EntitySeo => {
  const decision = facilityIndexDecision(g);
  const override = (g as GreenlistEntry & { seo?: SeoOverride }).seo;
  const path = `/facilities/${g.slug}`;

  const resolved = applyOverride(
    {
      title: `${g.name} | Source Standard`,
      description: `Facility record for ${g.name}${g.location ? ` (${g.location})` : ""} — ${g.type}. Regulatory identity and Source Standard evaluation status.`,
      noindex: !decision.indexable,
    },
    override,
  );

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Facilities", path: "/facilities" },
    { name: g.name, path },
  ];

  const orgLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: g.name,
    url: g.website || absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    description: g.focus,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        propertyID: "facility-type",
        name: "Facility type",
        value: g.type,
      },
    ],
  };

  return {
    ...resolved,
    rawTitle: true,
    path,
    type: "profile",
    crumbs,
    jsonLd: [orgLd, breadcrumbLd(crumbs)],
  };
};

// ── Article ─────────────────────────────────────────────────────────

export const articleSeo = (a: Article): EntitySeo => {
  const path = `/articles/${a.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    ...(a.cluster ? [{ name: CLUSTERS[a.cluster].label, path: CLUSTERS[a.cluster].path }] : []),
    { name: a.question, path },
  ];

  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.metaTitle,
    alternativeHeadline: a.question,
    description: a.metaDescription,
    datePublished: a.published,
    dateModified: a.updated,
    author: publisherLd,
    publisher: publisherLd,
    inLanguage: "en-US",
    mainEntityOfPage: absoluteUrl(path),
  };

  const jsonLd: Record<string, unknown>[] = [articleLd, breadcrumbLd(crumbs)];

  if (a.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    title: a.metaTitle,
    rawTitle: false,
    description: a.metaDescription,
    path,
    noindex: false,
    type: "article",
    crumbs,
    jsonLd,
  };
};

// ── Cluster page ────────────────────────────────────────────────────

export const clusterSeo = (p: ClusterPage): EntitySeo => {
  const hub = CLUSTERS[p.cluster];
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    ...(p.isHub ? [] : [{ name: hub.label, path: hub.path }]),
    { name: p.isHub ? hub.label : p.navLabel, path: p.path },
  ];

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.metaTitle,
      description: p.metaDescription,
      dateModified: p.updated,
      author: publisherLd,
      publisher: publisherLd,
      inLanguage: "en-US",
      mainEntityOfPage: absoluteUrl(p.path),
    },
    breadcrumbLd(crumbs),
  ];

  if (p.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    title: p.metaTitle,
    rawTitle: false,
    description: p.metaDescription,
    path: p.path,
    noindex: false,
    type: "article",
    crumbs,
    jsonLd,
  };
};

export const statusLabel = (v: Vendor) => VENDOR_STATUS_LABEL[v.status];
